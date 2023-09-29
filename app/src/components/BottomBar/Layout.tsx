import { LayoutChangeEvent, StyleSheet, View, Text } from "react-native"
import Button from "./Button"
import { memo } from "react"
import { ApiRoute } from "@api-types"

interface Props {
    handleRoutesPage: (target: string) => void
    handleAddPoint: () => void
    handleGenerateRote: () => void
    handleResetPoints: () => void
    onLayout: (e: LayoutChangeEvent) => void
    currentRoute: ApiRoute | null
}

const BottomBarLayout = memo(
    ({
        handleRoutesPage,
        handleAddPoint,
        handleResetPoints,
        handleGenerateRote,
        onLayout,
        currentRoute,
    }: Props) => {
        console.log("bottombar re render")
        return (
            <View style={styles.columnContainer} onLayout={onLayout}>
                {!currentRoute && (
                    <Text style={styles.text}>
                        {!currentRoute && "Nenhuma rota selecionada"}
                    </Text>
                )}

                {currentRoute && (
                    <Text style={styles.text}>
                        {`Rota #${currentRoute.id}. ${currentRoute.points.length} pontos. ${currentRoute.path.length} paths`}
                    </Text>
                )}
                <View style={styles.rowContainer}>
                    <Button
                        onPress={() => handleRoutesPage("routes")}
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
                    <Button
                        onPress={() => handleRoutesPage("config")}
                        text="Configurações"
                        icon="settings"
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
        gap: 2.5,
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 1,
    },
    text: {
        color: "#eee",
        alignSelf: "flex-start",
    },
})

export default BottomBarLayout
