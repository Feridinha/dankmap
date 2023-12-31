import { ApiRoute } from "@api-types"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import relativeTime from "dayjs/plugin/relativeTime"
import { ScrollView } from "moti"
import { memo, useEffect } from "react"
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import api from "../services/api"
import { updateMainKey } from "../slices/main"
import { IRootState } from "../store"

dayjs.locale("pt-br")
dayjs.extend(relativeTime)

const RouteItem = ({
    route,
    isHighlighted,
    onPress,
}: {
    route: ApiRoute
    isHighlighted: boolean
    onPress: (data: ApiRoute) => void
}) => {
    const customStyle = isHighlighted ? { backgroundColor: "#1D68FF" } : {}

    return (
        <TouchableNativeFeedback onPress={() => onPress(route)}>
            <View style={[styles.routeItemContainer, customStyle]}>
                <Text style={[styles.text, styles.textTitle]}>
                    Rota #{route.id}; {route.points.length}/{route.path.length}
                </Text>

                <Text style={[styles.text, { opacity: 0.5 }]}>
                    Criada {dayjs(route.createdAt).from(Date.now())} atrás
                </Text>
                {isHighlighted && <View style={styles.highlightedIcon} />}
            </View>
        </TouchableNativeFeedback>
    )
}

const RoutesPage_ = () => {
    // const [routes, setRoutes] = useState<ApiRoute[] | null>(null)
    const routes = useSelector((state: IRootState) => state.main.routes)
    const currentRoute = useSelector((state: IRootState) => state.main.currentRoute)
    const dispatch = useDispatch()

    const handleRoutes = async () => {
        const response = await api.fechRoutes()
        if (!response.success) {
            alert(response.message || "asd")
            return
        }
        const orderedRoutes = response.data.sort((a, b) => a.id - b.id)

        dispatch(updateMainKey(["routes", orderedRoutes]))
    }

    const handleRouteClick = (newCurrentRoute: ApiRoute) => {
        dispatch(updateMainKey(["currentRoute", newCurrentRoute]))
        handleRoutes()
    }

    useEffect(() => {
        handleRoutes()
        console.log("puxando rotas")
    }, [])

    console.log("re-render")

    return (
        <ScrollView
            from={{ translateY: 200 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 200 }}
            transition={{ type: "timing" }}
            style={styles.scrollContainer}
            scrollEnabled={true}
        >
            {!routes && <Text style={styles.text}>Carregando rotas</Text>}
            {routes && (
                <View style={styles.pageContainer}>
                    {routes.map((route, index) => (
                        <RouteItem
                            key={route.id}
                            route={route}
                            isHighlighted={currentRoute?.id === route.id}
                            onPress={handleRouteClick}
                        />
                    ))}
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        maxHeight: 150,
    },
    pageContainer: {
        flex: 1,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#222831",
        width: "100%",
        padding: 8,
        gap: 2,
        paddingHorizontal: 4,
    },
    text: {
        color: "#eeeeee",
        fontSize: 15,
    },
    textTitle: {
        fontWeight: "600",
    },
    routeItemContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#393E46",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    highlightedIcon: {
        position: "absolute",
        right: 15,
        height: 30,
        width: 10,
        backgroundColor: "#eeeeee",
        borderRadius: 4,
    },
})
const RoutesPage = memo(RoutesPage_)
export default RoutesPage
