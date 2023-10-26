import { ApiRoute } from "@api-types"
import CommunityIcon from "@expo/vector-icons/MaterialCommunityIcons"
import { memo, useEffect, useRef } from "react"
import MapView, { LatLng, Marker, Polyline } from "react-native-maps"
import { useDispatch } from "react-redux"
import { updateMainKey } from "../slices/main"

interface Props {
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

const Map = ({ onRegionChange, currentRoute, maxHeight }: Props) => {
    const ref = useRef<MapView>(null)
    const dispatch = useDispatch()

    const handleChange = (e: LatLng) => {
        clearTimeout(updateTimeout)
        updateTimeout = setTimeout(() => onRegionChange(e), 300)
    }

    useEffect(() => {
        dispatch(updateMainKey(["mapRef", ref]))
    }, [ref.current])

    return (
        <MapView
            ref={ref}
            style={{ maxHeight, height: maxHeight }}
            zoomEnabled
            initialRegion={initialLocation}
            onRegionChange={handleChange}
            showsUserLocation={true}
            loadingEnabled={true}
        >
            {currentRoute && currentRoute?.points.length > 0 && (
                <Marker
                    key={"start"}
                    coordinate={currentRoute.points[0]}
                    title="Position"
                    description="Description"
                    onPress={() => alert("bolsonara")}
                >
                    <CommunityIcon
                        name="checkbox-blank-circle"
                        color={"#1853c9"}
                    >
                        {" "}
                    </CommunityIcon>
                </Marker>
            )}

            {currentRoute && currentRoute?.points.length > 1 && (
                <Marker
                    key={"end"}
                    coordinate={currentRoute.points.at(-1)!}
                    title="Position"
                    description="Description"
                    onPress={() => alert("bolsonara")}
                >
                    <CommunityIcon
                        name="checkbox-blank-circle"
                        color={"#1853c9"}
                    >
                        {" "}
                    </CommunityIcon>
                </Marker>
            )}

            {currentRoute && (
                <Polyline
                    coordinates={currentRoute.path.map((path) => path.location)}
                    strokeColor={"#1D68FF"}
                    strokeWidth={5}
                    // lineDashPattern={[-1]}
                />
            )}
        </MapView>
    )
}

export default Map
