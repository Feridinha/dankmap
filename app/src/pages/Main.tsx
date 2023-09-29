import { ApiRoute } from "@api-types"
import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { AnimatePresence } from "moti"
import {
    useEffect,
    useRef,
    useState,
    useCallback,
    ReactNode,
    cloneElement,
} from "react"
import {
    LayoutChangeEvent,
    ScrollView,
    StyleSheet,
    View,
    Image,
} from "react-native"
import MapView, { LatLng } from "react-native-maps"
import BottomBar from "../components/BottomBar"
import Map from "../components/Map"
import api from "../services/api"
import RoutesPage from "./Routes"
import ConfigPage, { Config } from "./Config"

type Nullable<T> = T | null

let placePointsInverval: any = null

function MainPage() {
    const [location, setLocation] =
        useState<Nullable<Location.LocationObject>>(null)
    const [lookingLocation, setLookingLocation] =
        useState<Nullable<LatLng>>(null)

    const mapRef = useRef<MapView>(null)
    const [currentRoute, setCurrentRoute] = useState<ApiRoute | null>(null)
    const [maxHeight, setMaxHeight] = useState<number>(20)
    const [pageHeight, setPageHeight] = useState<number>(0)
    const [currentSubPage, setSubpage] = useState<JSX.Element | null>(null)
    const [config, setConfig] = useState<Config>({ auto_place_points: false })
    const [bottomBarHeight, setBottomHeight] = useState(0)

    const handleLocation = async () => {
        const result = await Location.requestForegroundPermissionsAsync()
        if (result.status !== "granted") return alert("Permissão negada!")

        let location = await Location.getCurrentPositionAsync({ accuracy: 6 })
        setLocation(location)
        return location
    }

    const handleStart = () => {
        handleLocation()
    }

    useEffect(handleStart, [])

    const handleAddPoint = async (targetLocation: Nullable<LatLng>) => {
        if (!targetLocation) return alert("Localização não disponível")
        if (!currentRoute) return alert("Nenhuma rota selecionada")
        const response = await api.putPointInRoute(
            currentRoute.id,
            targetLocation
        )
        if (!response.success) return alert(response.message)
        setCurrentRoute(response.data)
    }

    const handleRegionChange = useCallback(
        (region: LatLng) => setLookingLocation(region),
        [setLookingLocation]
    )

    const handleResetPoints = useCallback(async () => {
        if (!currentRoute) return alert("Nenhuma rota selecionada")
        const response = await api.deleteRoutePoints(currentRoute.id)
        if (!response.success) return alert(response.message)
        setCurrentRoute(response.data)
    }, [setCurrentRoute, currentRoute])

    const getHeight = (e: LayoutChangeEvent) => e.nativeEvent.layout.height

    const handleMapHeight = useCallback(
        (e: LayoutChangeEvent) => {
            const height = getHeight(e)
            setBottomHeight(height)
            setMaxHeight(pageHeight - height)
        },
        [setMaxHeight, pageHeight]
    )

    const handleGenerateRote = useCallback(async () => {
        if (!currentRoute) return alert("Escola uma rota")
        const response = await api.getRoutePath(currentRoute.id)
        if (!response.success) return alert(response.message)
        setCurrentRoute(response.data)
    }, [setCurrentRoute, currentRoute])

    const handleConfig = (newConfig: Config) => {
        setConfig(newConfig)
    }

    const handleRoutesPage = (target?: string) => {
        let newValue: ReactNode = null
        const props = { currentRoute, setCurrentRoute }

        switch (target) {
            case "routes":
                newValue = <RoutesPage key={"routes"} {...props} />
                break
            case "config":
                newValue = (
                    <ConfigPage
                        handleConfig={handleConfig}
                        key={"config"}
                        {...props}
                    />
                )
                break
        }
        if (newValue?.key === currentSubPage?.key) return setSubpage(null)
        setSubpage(newValue)
    }

    const handleAutoPlace = useCallback(async () => {
        const newLocation = await handleLocation()
        if (!newLocation) return console.log("Sem location")
        if (!currentRoute) return console.log("Sem route")

        handleAddPoint(newLocation.coords)
    }, [location, currentRoute])

    useEffect(() => {
        clearInterval(placePointsInverval)
        if (!config.auto_place_points) return
        placePointsInverval = setInterval(handleAutoPlace, 1000)
    }, [config.auto_place_points, handleAutoPlace])

    return (
        <View
            style={styles.container}
            onLayout={(e) => setPageHeight(getHeight(e))}
        >
            <View style={{ ...styles.mapWrapper, maxHeight }}>
                <Map
                    mapRef={mapRef}
                    onRegionChange={handleRegionChange}
                    currentRoute={currentRoute}
                    maxHeight={maxHeight}
                    config={config}
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
            <BottomBar
                handleRoutesPage={handleRoutesPage}
                handleAddPoint={() => handleAddPoint(lookingLocation)}
                handleResetPoints={handleResetPoints}
                handleGenerateRote={handleGenerateRote}
                onLayout={handleMapHeight}
                currentRoute={currentRoute}
            />
            <StatusBar style="auto" />
            <AnimatePresence exitBeforeEnter>
                {currentSubPage && (
                    <View
                        style={{
                            ...styles.subpageContainer,
                            bottom: bottomBarHeight,
                        }}
                        key={currentSubPage.key}
                    >
                        {cloneElement(currentSubPage, {
                            currentRoute,
                            setCurrentRoute,

                            handleConfig,
                        })}
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
