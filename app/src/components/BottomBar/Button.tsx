import CommunityIcon from "@expo/vector-icons/MaterialCommunityIcons"
import Icon from "@expo/vector-icons/MaterialIcons"
import { ComponentProps } from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

interface Props {
    icon?: ComponentProps<typeof Icon>["name"]
    communityIcon?: ComponentProps<typeof CommunityIcon>["name"]
    onPress: () => void
    text: string
}

const Button = ({ communityIcon, onPress, text, icon }: Props) => {
    return (
        <TouchableHighlight onPress={onPress} style={styles.button}>
            <View style={styles.container}>
                {icon && (
                    <Icon
                        style={styles.icon}
                        name={icon}
                        size={24}
                        color={"#EEEEEE"}
                    ></Icon>
                )}
                {communityIcon && (
                    <CommunityIcon
                        style={styles.icon}
                        name={communityIcon}
                        size={24}
                        color={"#EEEEEE"}
                    ></CommunityIcon>
                )}
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        padding: 5,
        flexGrow: 1,
        backgroundColor: "#393E46",
        borderRadius: 5
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexGrow: 1,
    },
    text: {
        fontSize: 12,
        color: "#fff",
    },
    icon: {
        // backgroundColor: "blue",
    },
})

export default Button
