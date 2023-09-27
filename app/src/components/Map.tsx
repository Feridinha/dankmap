import { ApiRoute } from "@api-types"
import * as Location from "expo-location"
import { RefObject } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import MapView, { LatLng, Marker, Polyline } from "react-native-maps"

interface Props {
    location: Location.LocationObject | null
    mapRef: RefObject<MapView>
    onRegionChange: (d: LatLng) => void
    lookingLocation: LatLng | null
    currentRoute: ApiRoute | null
    maxHeight: number
}

const initialLocation = {
    latitude: 2.81547,
    longitude: -60.686887,
    latitudeDelta: 0.0005,
    longitudeDelta: 0.0005,
}

const Map = ({
    location,
    mapRef,
    onRegionChange,
    lookingLocation,
    currentRoute,
    maxHeight
}: Props) => {
    currentRoute?.path
    return (
        <MapView
            ref={mapRef}
            style={{maxHeight, height: maxHeight}}
            zoomEnabled
            initialRegion={initialLocation}
            onRegionChange={onRegionChange}
            showsUserLocation={true}
            loadingEnabled={true}
        >
            {currentRoute &&
                currentRoute.points.map((points, index) => (
                    <Marker
                        key={index}
                        coordinate={points}
                        title="Position"
                        description="Description"
                        onPress={() => alert("bolsonara")}
                        pinColor="green"
                        style={{ width: 26, height: 28 }}
                    />
                ))}

            {lookingLocation && (
                <Marker
                    coordinate={lookingLocation}
                    title="Posição atual"
                    onPress={() => alert("bolsonara")}
                    icon={{ uri: "https://f.feridinha.com/Ck9W8.png" }}
                />
            )}

            {currentRoute && (
                <Polyline
                    coordinates={currentRoute.path.map((path) => path.location)}
                    strokeColor={"#000"}
                    strokeWidth={5}
                    // lineDashPattern={[-1]}
                />
            )}
        </MapView>
    )
}


export default Map
