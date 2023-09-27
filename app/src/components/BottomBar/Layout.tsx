import { ApiRoute } from "@api-types"
import { LocationObject } from "expo-location"
import { LayoutChangeEvent, StyleSheet, View, Text } from "react-native"
import Button from "./Button"

interface Props {
    handleLocation: () => void
    // handleGoTo: () => void
    handleAddPoint: () => void
    handleGenerateRote: () => void
    handleResetPoints: () => void
    onLayout: (e: LayoutChangeEvent) => void
    // currentRoute: ApiRoute | null
    // location: LocationObject | null
}

const BottomBarLayout = ({
    handleLocation,
    handleAddPoint,
    handleResetPoints,
    handleGenerateRote,
    onLayout,
}: Props) => {
    return (
        <View style={styles.columnContainer} onLayout={onLayout}>
            {/* <Text>
                {(location?.coords &&
                    Object.values(location.coords).join(", ")) ||
                    "Nenhuma localização"}{" "}
                {(currentRoute && `Rota #${currentRoute.id}`) || "Nenhuma Rota"}
            </Text> */}
            <View style={styles.rowContainer}>
                <Button
                    onPress={handleLocation}
                    text="Atualizar"
                    icon="update"
                />
                <Button
                    onPress={handleGenerateRote}
                    text="Gerar rota"
                    communityIcon={"routes"}
                />
                <Button
                    onPress={handleAddPoint}
                    text="Adicionar"
                    icon="add"
                />
                <Button
                    onPress={handleResetPoints}
                    text="Apagar"
                    icon="delete"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    columnContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#222831",
        width: "100%",
        paddingVertical: 5,
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 1
    },
})

export default BottomBarLayout
