import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"
import { LatLng } from "react-native-maps"

const fetchRoutes = createAsyncThunk("main/fetchRoutes", async () => {
    const response = await api.fechRoutes()
    if (!response.success) throw new Error(response.message)
    return response.data
})

const fetchRoute = createAsyncThunk(
    "main/fetchRoute",
    async (routeId: string) => {
        const response = await api.fechRoute(routeId)
        if (!response.success) throw new Error(response.message)
        return response.data
    }
)

const generateRoute = createAsyncThunk(
    "main/generateRoute",
    async (routeId: string) => {
        const response = await api.getRoutePath(routeId)
        if (!response.success) throw new Error(response.message)
        return response.data
    }
)

const putPointInRoute = createAsyncThunk(
    "main/putPointInRoute",
    async ([routeId, point]: [string, LatLng]) => {
        const response = await api.putPointInRoute(routeId, point)
        if (!response.success) throw new Error(response.message)
        return response.data
    }
)

const deleteRoutePoints = createAsyncThunk(
    "main/deleteRoutePoints",
    async (routeId: string) => {
        const response = await api.deleteRoutePoints(routeId)
        if (!response.success) throw new Error(response.message)
        return response.data
    }
)

const mainThunks = {
    putPointInRoute,
    generateRoute,
    fetchRoute,
    fetchRoutes,
    deleteRoutePoints,
}

export default mainThunks
