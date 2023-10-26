import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { IRootState } from "../store"
import { ScrollView } from "moti"
import { getDistanceBetweenPoints } from "../utils"

const PointsPage = () => {
    const currentRoute = useSelector(
        (state: IRootState) => state.main.currentRoute
    )

    if (!currentRoute) {
        alert("Sem rota")
        return null
    }

    return (
        <ScrollView
            from={{ translateY: 200 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 200 }}
            transition={{ type: "timing" }}
            style={styles.scrollContainer}
            scrollEnabled={true}
        >
            <View style={styles.pageContainer}>
                {currentRoute.points.map((point, index) => {
                    const lastPoint = currentRoute.points.at(index - 1)
                    let distance = 0
                    if (lastPoint)
                        distance = getDistanceBetweenPoints(point, lastPoint)
                    return (
                        <View style={styles.pointItemContainer} key={index}>
                            <Text style={styles.text}>
                                #{index} {distance} metros
                            </Text>
                        </View>
                    )
                })}
            </View>
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
    pointItemContainer: {
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

export default PointsPage
