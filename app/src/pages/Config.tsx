import Checkbox from "expo-checkbox"
import { ScrollView as MotiView } from "moti"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { updateKey } from "../slices/config"
import { IRootState } from "../store"

const ConfigPage = () => {
    const { autoPlacePoints } = useSelector((state: IRootState) => state.config)

    const dispatch = useDispatch()

    const handleChange = (newValue: boolean) => {
        dispatch(updateKey(["autoPlacePoints", newValue]))
    }

    return (
        <MotiView
            from={{ translateY: 200 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 200 }}
            transition={{ type: "timing" }}
            contentContainerStyle={styles.columnContainer}
            scrollEnabled={true}
        >
            <View style={styles.rowContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={autoPlacePoints}
                    onValueChange={handleChange}
                    color={autoPlacePoints ? "#4630EB" : undefined}
                />
                <Text style={styles.text}>
                    Adicionar pontos automaticamente
                </Text>
            </View>
            <Text style={[styles.text, { marginTop: "auto" }]}>
                {process.env.EXPO_PUBLIC_API_URL}
            </Text>
        </MotiView>
    )
}

const styles = StyleSheet.create({
    columnContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#222831",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        minHeight: 150,
        gap: 1,
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignSelf: "flex-start",
        width: "100%",
    },
    text: {
        color: "#eee",
        alignSelf: "flex-start",
        fontSize: 15,
    },
    checkbox: {},
})

export default ConfigPage
