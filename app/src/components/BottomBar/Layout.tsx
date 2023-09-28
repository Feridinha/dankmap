import { LayoutChangeEvent, StyleSheet, View } from "react-native"
import Button from "./Button"
import { memo } from "react"

interface Props {
    handleRoutesPage: () => void
    handleAddPoint: () => void
    handleGenerateRote: () => void
    handleResetPoints: () => void
    // closeSubpage: () => void
    onLayout: (e: LayoutChangeEvent) => void
}

const BottomBarLayout = memo(
    ({
        handleRoutesPage,
        handleAddPoint,
        handleResetPoints,
        handleGenerateRote,
        onLayout,
    }: Props) => {
        console.log("re render")

        return (
            <View style={styles.columnContainer} onLayout={onLayout}>
                <View style={styles.rowContainer}>
                    <Button
                        onPress={handleRoutesPage}
                        text="Rotas"
                        communityIcon="routes"
                    />
                    <Button
                        onPress={handleGenerateRote}
                        text="Processar"
                        icon={"account-tree"}
                    />
                    <Button
                        onPress={handleAddPoint}
                        text="Adicionar ponto"
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
)

const styles = StyleSheet.create({
    columnContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#222831",
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 2.5,
        zIndex: 3,
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 1,
    },
})

export default BottomBarLayout
