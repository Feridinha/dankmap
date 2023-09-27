import axios, { AxiosError } from "axios"
import { LatLng } from "react-native-maps"
import { ApiRouteZodSchema, ApiRoute } from "@api-types"

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

const fechRoute = async (routeId: number): Promise<ApiResponse<ApiRoute>> => {
    const response = await http.get(`/route/${routeId}`)
    return response.data as ApiResponse<ApiRoute>
}

const deleteRoutePoints = async (
    routeId: number
): Promise<ApiResponse<ApiRoute>> => {
    const response = await http.delete(`/route/${routeId}/point`)
    return response.data as ApiResponse<ApiRoute>
}

const putPointInRoute = async (
    routeId: number,
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
    routeId: number
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
    getRoutePath
}

export default api
