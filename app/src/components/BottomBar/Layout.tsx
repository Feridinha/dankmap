import { ApiRoute } from "@api-types"
import { memo } from "react"
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import ConfigPage from "../../pages/Config"
import RoutesPage from "../../pages/Routes"
import { setSubpage } from "../../slices/main"
import Button from "./Button"
import { ThunkDispatch } from "@reduxjs/toolkit"
import mainThunks from "../../slices/main/thunks"
import { IRootState } from "../../store"

interface Props {
    onLayout: (e: LayoutChangeEvent) => void
    currentRoute: ApiRoute | null
}

const BottomBarLayout = ({ onLayout, currentRoute }: Props) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const lookingLocation = useSelector(
        (state: IRootState) => state.main.lookingLocation
    )
    const subpage = useSelector((state: IRootState) => state.main.subpage)

    const handlePageChange = (target: JSX.Element | null) => {
        if (subpage?.key === target?.key) return dispatch(setSubpage(null))
        dispatch(setSubpage(target))
    }

    const handleResetPoints = () => {
        if (!currentRoute) return alert("Sem rota")
        dispatch(mainThunks.deleteRoutePoints(currentRoute.id.toString()))
    }

    const handleGenerateRote = () => {
        if (!currentRoute) return alert("Sem rota")
        dispatch(mainThunks.generateRoute(currentRoute.id.toString()))
    }

    const handleAddPoint = () => {
        if (!currentRoute) return alert("Sem rota")
        if (!lookingLocation) return alert("Looking location null")
        dispatch(
            mainThunks.putPointInRoute([
                currentRoute.id.toString(),
                lookingLocation,
            ])
        )
    }

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
                    onPress={() =>
                        handlePageChange(<RoutesPage key={"routes'"} />)
                    }
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
                    onPress={() =>
                        handlePageChange(<ConfigPage key={"config"} />)
                    }
                    text="Configurações"
                    icon="settings"
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

export default memo(BottomBarLayout)
