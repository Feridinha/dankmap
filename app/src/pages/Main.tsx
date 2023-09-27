import { ApiRoute } from "@api-types"
import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import { LayoutChangeEvent, StyleSheet, View, ScrollView } from "react-native"
import MapView, { LatLng } from "react-native-maps"
import BottomBar from "../components/BottomBar"
import Map from "../components/Map"
import api from "../services/api"

type Nullable<T> = T | null

function MainPage() {
    const [location, setLocation] =
        useState<Nullable<Location.LocationObject>>(null)
    const [lookingLocation, setLookingLocation] =
        useState<Nullable<LatLng>>(null)

    const mapRef = useRef<MapView>(null)
    const [currentRoute, setCurrentRoute] = useState<ApiRoute | null>(null)
    const [maxHeight, setMaxHeight] = useState<number>(20)
    const [pageHeight, setPageHeight] = useState<number>(0)

    const handleCurrentRoute = async () => {
        const response = await api.fechRoute(8)
        if (!response.success) return alert("Erro ao puxar rota 8")
        setCurrentRoute(response.data)
    }

    const handleLocation = async () => {
        const result = await Location.requestForegroundPermissionsAsync()
        if (result.status !== "granted") return alert("Permissão negada!")

        let location = await Location.getCurrentPositionAsync({ accuracy: 6 })
        setLocation(location)
    }

    const handleStart = () => {
        handleLocation()
        handleCurrentRoute()
    }

    useEffect(handleStart, [])

    const handleAddPoint = async () => {
        if (!lookingLocation) return alert("Localização não disponível")
        if (!currentRoute) return alert("Nenhuma rota selecionada")
        const response = await api.putPointInRoute(
            currentRoute.id,
            lookingLocation
        )
        if (!response.success) return alert(response.message)
        setCurrentRoute(response.data)
    }

    const handleRegionChange = (region: LatLng) => setLookingLocation(region)
    const handleResetPoints = async () => {
        const response = await api.deleteRoutePoints(8)
        if (!response.success) return alert(response.message)
        setCurrentRoute(response.data)
    }

    const getHeight = (e: LayoutChangeEvent) => e.nativeEvent.layout.height
    const handleMapHeight = (e: LayoutChangeEvent) => {
        const height = getHeight(e)
        setMaxHeight(pageHeight - height)
    }

    const handleGenerateRote = async () => {
        const response = await api.getRoutePath(8)
        if (!response.success) return alert(response.message)
        setCurrentRoute(response.data)
    }

    return (
        <View
            style={styles.container}
            onLayout={(e) => setPageHeight(getHeight(e))}
        >
            <ScrollView
                contentContainerStyle={{ ...styles.mapWrapper, maxHeight }}
            >
                <Map
                    mapRef={mapRef}
                    location={location}
                    lookingLocation={lookingLocation}
                    onRegionChange={handleRegionChange}
                    currentRoute={currentRoute}
                    maxHeight={maxHeight}
                />
            </ScrollView>
            
            <BottomBar
                handleLocation={handleStart}
                handleAddPoint={handleAddPoint}
                handleResetPoints={handleResetPoints}
                handleGenerateRote={handleGenerateRote}
                onLayout={handleMapHeight}
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "blue",
        height: "100%",
    },
    mapWrapper: {
        display: "flex",
        overflow: "hidden",
        backgroundColor: "green",
    },
})

export default MainPage
