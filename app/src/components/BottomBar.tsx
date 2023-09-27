import { Button, StyleSheet, View } from "react-native"

interface Props {
    handleLocation: () => void
    handleGoTo: () => void
    handleAddPoint: () => void
    handleResetPoints: () => void
}

const BottomBar = ({
    handleLocation,
    handleGoTo,
    handleAddPoint,
    handleResetPoints,
}: Props) => {
    return (
        <View style={styles.container}>
            <Button onPress={handleLocation} title="tipo" />
            <Button onPress={handleGoTo} title="Mais recente" color={"grey"} />
            <Button
                onPress={handleAddPoint}
                title="Adicionar"
                color={"green"}
            />
            <Button onPress={handleResetPoints} title="Limpar" color={"red"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
})

export default BottomBar
