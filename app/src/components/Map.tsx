import { ApiRoute } from "@api-types"
import CommunityIcon from "@expo/vector-icons/MaterialCommunityIcons"
import { RefObject, memo, useEffect, useRef } from "react"
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
            {currentRoute &&
                currentRoute.points
                    .slice(
                        currentRoute.points.length - 3,
                        currentRoute.points.length
                    )
                    .map((points, index) => (
                        <Marker
                            key={index}
                            coordinate={points}
                            title="Position"
                            description="Description"
                            onPress={() => alert("bolsonara")}
                            // pinColor="#1D68FF"
                            style={{ width: 20, height: 20 }}
                        >
                            <CommunityIcon
                                name="checkbox-blank-circle"
                                color={"#1853c9"}
                            >
                                {" "}
                            </CommunityIcon>
                        </Marker>
                    ))}

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

export default memo(Map)
