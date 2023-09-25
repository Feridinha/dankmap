import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Button, Dimensions, StyleSheet, Text, View } from "react-native"
import MapView from "react-native-maps"
import * as Location from "expo-location"

export default function App() {
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    )

    const handleLocation = async () => {
        const result = await Location.requestForegroundPermissionsAsync()
        if (result.status !== "granted") return alert("Permissão negada!")

        let location = await Location.getCurrentPositionAsync({ accuracy: 6 })
        setLocation(location)
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                zoomEnabled
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <Text>
                {location?.coords && Object.values(location.coords).join(", ")}
            </Text>
            <Button onPress={handleLocation} title="tipo" />
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
    map: {
        height: Dimensions.get("window").height,
        flex: 1,
        backgroundColor: "red",
        width: Dimensions.get("window").width,
    },
})
