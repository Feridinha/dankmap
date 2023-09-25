import { Button, StyleSheet, View } from "react-native"

interface Props {
    handleLocation: () => void
    handleGoTo: () => void
    handleAddMarker: () => void
    handleResetMarkers: () => void
}

const BottomBar = ({
    handleLocation,
    handleGoTo,
    handleAddMarker,
    handleResetMarkers,
}: Props) => {
    return (
        <View style={styles.container}>
            <Button onPress={handleLocation} title="tipo" />
            <Button onPress={handleGoTo} title="Mais recente" color={"grey"} />
            <Button
                onPress={handleAddMarker}
                title="Adicionar"
                color={"green"}
            />
            <Button onPress={handleResetMarkers} title="Limpar" color={"red"} />
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
