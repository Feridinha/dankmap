import * as Location from "expo-location"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import Map from "./src/components/Map"
import { useRef, useEffect } from "react"
import MapView, { LatLng } from "react-native-maps"
import BottomBar from "./src/components/BottomBar"

type Nullable<T> = T | null

export default function App() {
    const [location, setLocation] =
        useState<Nullable<Location.LocationObject>>(null)

    const [lookingLocation, setLookingLocation] =
        useState<Nullable<LatLng>>(null)

    const mapRef = useRef<MapView>(null)

    const [markers, setMarkers] = useState<LatLng[]>([])
    const [index, setIndex] = useState<number>(0)

    const handleLocation = async () => {
        const result = await Location.requestForegroundPermissionsAsync()
        if (result.status !== "granted") return alert("Permissão negada!")

        let location = await Location.getCurrentPositionAsync({ accuracy: 6 })
        setLocation(location)
        if (markers.length === 0) setMarkers([location.coords])
    }

    const handleGoTo = () => {
        if (markers.length === 0 || !mapRef.current) return
        if (markers.length > index + 1) {
            setIndex((i) => i + 1)
        } else {
            setIndex(0)
        }

        mapRef.current.animateToRegion({
            ...markers[index],
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        })
    }

    useEffect(() => {
        handleLocation()
    }, [])

    const handleAddMarker = async () => {
        if (!lookingLocation) return alert("Localização não disponível")
        setMarkers([...markers, lookingLocation])
    }

    const handleResetMarkers = () => {
        setMarkers([])
    }

    const handleRegionChange = (region: LatLng) => {
        setLookingLocation(region)
    }

    return (
        <View style={styles.container}>
            <Map
                mapRef={mapRef}
                location={location}
                onRegionChange={handleRegionChange}
                markers={markers}
            />
            <Text>
                {(location?.coords &&
                    Object.values(location.coords).join(", ")) ||
                    "Nenhuma localização"}
            </Text>
            <BottomBar
                handleGoTo={handleGoTo}
                handleLocation={handleLocation}
                handleAddMarker={handleAddMarker}
                handleResetMarkers={handleResetMarkers}
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
