import { ApiRoute } from "@api-types"
import BottomBar from "../components/BottomBar"
import Map from "../components/Map"
import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import MapView, { LatLng } from "react-native-maps"
import api from "../services/api"

type Nullable<T> = T | null

function MainPage() {
    const [location, setLocation] =
        useState<Nullable<Location.LocationObject>>(null)
    const [lookingLocation, setLookingLocation] =
        useState<Nullable<LatLng>>(null)

    const mapRef = useRef<MapView>(null)

    const [markers, setMarkers] = useState<LatLng[]>([])
    const [index, setIndex] = useState<number>(0)
    const [currentRoute, setCurrentRoute] = useState<ApiRoute | null>(null)

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

    const handleGoTo = () => {
        if(!currentRoute) return
        if (currentRoute.points.length === 0 || !mapRef.current) return
        if (currentRoute.points.length > index + 1) {
            setIndex((i) => i + 1)
        } else {
            setIndex(0)
        }

        mapRef.current.animateToRegion({
            ...currentRoute.points[index],
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        })
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

    return (
        <View style={styles.container}>
            <Map
                mapRef={mapRef}
                location={location}
                lookingLocation={lookingLocation}
                onRegionChange={handleRegionChange}
                currentRoute={currentRoute}
            />
            <Text>
                {(location?.coords &&
                    Object.values(location.coords).join(", ")) ||
                    "Nenhuma localização"}{" "}
                {(currentRoute && `Rota #${currentRoute.id}`) || "Nenhuma Rota"}
            </Text>
            <BottomBar
                handleGoTo={handleGoTo}
                handleLocation={handleStart}
                handleAddPoint={handleAddPoint}
                handleResetPoints={handleResetPoints}
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingBottom: 5,
    },
})

export default MainPage
