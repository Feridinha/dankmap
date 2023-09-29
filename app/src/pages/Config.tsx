import { View, Text, StyleSheet } from "react-native"
import { ScrollView as MotiView } from "moti"
import Checkbox from "expo-checkbox"
import { useState } from "react"

export interface Config {
    auto_place_points: boolean
}

interface Props {
    handleConfig: (confi: Config) => void
}

const ConfigPage = (props: Props) => {
    // const [config, setConfig] = useState<Config>({ auto_place_points: false })
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const handleChange = (newValue: boolean) => {
        setIsChecked(newValue)
        props.handleConfig({ auto_place_points: newValue })
    }

    // const isChecked = config["auto_place_points"]

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
                    value={isChecked}
                    onValueChange={handleChange}
                    color={isChecked ? "#4630EB" : undefined}
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
