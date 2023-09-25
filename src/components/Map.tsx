import * as Location from "expo-location"
import { RefObject } from "react"
import { Dimensions, StyleSheet } from "react-native"
import MapView, { Marker, Polyline, LatLng } from "react-native-maps"

interface Props {
    location: Location.LocationObject | null
    mapRef: RefObject<MapView>
    markers: LatLng[]
    onRegionChange: (d: LatLng) => void
}

const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const Map = ({ location, mapRef, markers, onRegionChange }: Props) => {
    return (
        <MapView
            ref={mapRef}
            style={styles.map}
            zoomEnabled
            initialRegion={initialLocation}
            onRegionChange={onRegionChange}
            // showsUserLocation={true}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker}
                    title="Position"
                    description="Description"
                    onPress={() => alert("bolsonara")}
                    pinColor="green"
                />
            ))}

            <Polyline
                coordinates={markers} //specify our coordinates
                strokeColor={"#000"}
                strokeWidth={3}
                lineDashPattern={[1]}
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: Dimensions.get("window").height,
        flex: 1,
        backgroundColor: "red",
        width: Dimensions.get("window").width,
    },
})

export default Map
