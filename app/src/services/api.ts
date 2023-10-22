import { ApiRoute } from "@api-types"
import axios, { AxiosError } from "axios"
import { LatLng } from "react-native-maps"

const http = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL })

type ApiResponse<T = undefined> =
    | {
          success: false
          message: string
      }
    | {
          success: true
          message: string
          data: T
      }

const handleError = (error: AxiosError) => {
    alert(JSON.stringify(error.response))
    return error.response?.data
}

const fechRoute = async (routeId: string): Promise<ApiResponse<ApiRoute>> => {
    const response = await http.get(`/route/${routeId}`)
    return response.data as ApiResponse<ApiRoute>
}

const fechRoutes = async (): Promise<ApiResponse<ApiRoute[]>> => {
    const response = await http.get(`/route`)
    return response.data as ApiResponse<ApiRoute[]>
}

const deleteRoutePoints = async (
    routeId: string
): Promise<ApiResponse<ApiRoute>> => {
    const response = await http.delete(`/route/${routeId}/point`)
    return response.data as ApiResponse<ApiRoute>
}

const putPointInRoute = async (
    routeId: string,
    { latitude, longitude }: LatLng
): Promise<ApiResponse<ApiRoute>> => {
    const response: any = await http
        .put(`/route/${routeId}/point`, {
            latitude,
            longitude,
        })
        .catch(handleError)

    const data = response.data as ApiResponse<ApiRoute>
    return data
}

const getRoutePath = async (
    routeId: string
): Promise<ApiResponse<ApiRoute>> => {
    const response: any = await http
        .get(`/route/${routeId}/path`)
        .catch(handleError)

    const data = response.data as ApiResponse<ApiRoute>
    return data
}

const api = {
    deleteRoutePoints,
    putPointInRoute,
    fechRoute,
    getRoutePath,
    fechRoutes,
}

export default api
