import { ApiRoute } from "@api-types"
import * as Location from "expo-location"
import { RefObject, useState, memo, useEffect, useCallback } from "react"
import MapView, { LatLng, Marker, Polyline } from "react-native-maps"

interface Props {
    // location: Location.LocationObject | null
    mapRef: RefObject<MapView>
    onRegionChange: (d: LatLng) => void
    currentRoute: ApiRoute | null
    maxHeight: number
}

const initialLocation = {
    latitude: 2.820186,
    longitude: -60.67198,
    latitudeDelta: 0.0005,
    longitudeDelta: 0.0005,
}

let updateTimeout: any = null

const Map = ({ mapRef, onRegionChange, currentRoute, maxHeight }: Props) => {
    console.log("map")

    const handleChange = (e: LatLng) => {
        clearTimeout(updateTimeout)
        updateTimeout = setTimeout(() => onRegionChange(e), 300)
    }

    return (
        <MapView
            ref={mapRef}
            style={{ maxHeight, height: maxHeight }}
            zoomEnabled
            initialRegion={initialLocation}
            onRegionChange={handleChange}
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
                        style={{ width: 13, height: 14 }}
                    />
                ))}

            {currentRoute && (
                <Polyline
                    coordinates={currentRoute.path.map((path) => path.location)}
                    strokeColor={"green"}
                    strokeWidth={5}
                    // lineDashPattern={[-1]}
                />
            )}
        </MapView>
    )
}

export default memo(Map)
