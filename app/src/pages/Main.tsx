import { ThunkDispatch } from "@reduxjs/toolkit"
import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { AnimatePresence } from "moti"
import { cloneElement, useCallback, useEffect, useState } from "react"
import { Image, LayoutChangeEvent, StyleSheet, View } from "react-native"
import { LatLng } from "react-native-maps"
import { useDispatch, useSelector } from "react-redux"
import BottomBar from "../components/BottomBar"
import Map from "../components/Map"
import { updateMainKey } from "../slices/main"
import mainThunks from "../slices/main/thunks"
import { IRootState } from "../store"

let placePointsInverval: any = null

function MainPage() {
    const [maxHeight, setMaxHeight] = useState<number>(20)
    const [pageHeight, setPageHeight] = useState<number>(0)
    const [bottomBarHeight, setBottomHeight] = useState(0)
    const config = useSelector((state: IRootState) => state.config)
    const { subpage, currentRoute, location, lookingLocation, mapRef } =
        useSelector((state: IRootState) => state.main)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const handleLocation = async () => {
        const result = await Location.requestForegroundPermissionsAsync()
        if (result.status !== "granted") return alert("Permissão negada!")

        let location = await Location.getCurrentPositionAsync({ accuracy: 6 })
        dispatch(updateMainKey(["location", location]))
        return location
    }

    const handleStart = () => {
        handleLocation()
    }

    useEffect(handleStart, [])

    const handleRegionChange = useCallback(
        (region: LatLng) =>
            dispatch(updateMainKey(["lookingLocation", region])),
        [dispatch]
    )

    const getHeight = (e: LayoutChangeEvent) => e.nativeEvent.layout.height

    const handleMapHeight = useCallback(
        (e: LayoutChangeEvent) => {
            const height = getHeight(e)
            setBottomHeight(height)
            setMaxHeight(pageHeight - height)
        },
        [setMaxHeight, pageHeight]
    )

    const handleAutoPlace = useCallback(async () => {
        const newLocation = await handleLocation()
        if (!newLocation) return console.log("Sem location")
        if (!currentRoute) return console.log("Sem route")

        dispatch(
            mainThunks.putPointInRoute([
                currentRoute.id.toString(),
                newLocation.coords,
            ])
        )
    }, [location, currentRoute])

    useEffect(() => {
        clearInterval(placePointsInverval)
        if (!config.autoPlacePoints) return
        placePointsInverval = setInterval(handleAutoPlace, 1000)
    }, [config.autoPlacePoints, handleAutoPlace])

    return (
        <View
            style={styles.container}
            onLayout={(e) => setPageHeight(getHeight(e))}
        >
            <View style={{ ...styles.mapWrapper, maxHeight }}>
                <Map
                    onRegionChange={handleRegionChange}
                    currentRoute={currentRoute}
                    maxHeight={maxHeight}
                />
                <View style={styles.mapPointWrapper}>
                    <Image
                        style={styles.mapPointer}
                        source={{ uri: "https://f.feridinha.com/Ck9W8.png" }}
                        width={12}
                        height={12}
                    />
                </View>
            </View>
            <BottomBar onLayout={handleMapHeight} currentRoute={currentRoute} />
            <StatusBar style="auto" />
            <AnimatePresence exitBeforeEnter>
                {subpage && (
                    <View
                        style={{
                            ...styles.subpageContainer,
                            bottom: bottomBarHeight,
                        }}
                        key={subpage.key}
                    >
                        {cloneElement(subpage)}
                    </View>
                )}
            </AnimatePresence>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    mapWrapper: {
        flex: 1,
        position: "relative",
        display: "flex",
        overflow: "hidden",
        backgroundColor: "green",
    },
    subpageContainer: {
        position: "absolute",
        width: "100%",
        zIndex: 2,
    },
    mapPointWrapper: {
        zIndex: 4,
        flex: 1,
        position: "absolute",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        pointerEvents: "none",
    },
    mapPointer: {
        position: "absolute",
        margin: "auto",
    },
})

export default MainPage
