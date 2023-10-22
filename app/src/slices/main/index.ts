import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit"
import * as Location from "expo-location"
import { RefObject, createRef } from "react"
import type { LatLng } from "react-native-maps"
import MapView from "react-native-maps"
import { Nullable, UpdatePayloadType } from ".."
import { ApiRoute } from "@api-types"
import mainThunks from "./thunks"

export interface IMainState {
    subpage: JSX.Element | null
    location: Nullable<Location.LocationObject>
    lookingLocation: Nullable<LatLng>
    mapRef: RefObject<MapView> | null
    currentRoute: Nullable<ApiRoute>
    routes: ApiRoute[]
}

const initialState: IMainState = {
    subpage: null,
    currentRoute: null,
    mapRef: null,
    location: null,
    lookingLocation: null,
    routes: [],
}

const mainSlice = createSlice({
    name: "main",
    reducers: {
        updateMainKey: (
            state,
            action: PayloadAction<
                UpdatePayloadType<IMainState, keyof IMainState>
            >
        ) => {
            const [key, newValue] = action.payload
            return { ...state, [key]: newValue } as IMainState
        },
        setMainState: (_, action: PayloadAction<IMainState>) => {
            return action.payload
        },
        setSubpage: (state, action: PayloadAction<IMainState["subpage"]>) => {
            state.subpage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(mainThunks.fetchRoutes.fulfilled, (state, action) => {
            state.routes = action.payload
        })
        builder.addCase(mainThunks.fetchRoute.fulfilled, (state, action) => {
            state.currentRoute = action.payload
            state.routes.map((route) => {
                if (route.id === action.payload.id) return action.payload
                return route
            })
        })

        builder.addMatcher(
            isAnyOf(
                mainThunks.putPointInRoute.fulfilled,
                mainThunks.generateRoute.fulfilled,
                mainThunks.deleteRoutePoints.fulfilled
            ),
            (state, action) => {
                if (state.currentRoute?.id === action.payload.id) {
                    state.currentRoute = action.payload
                }
                state.routes.map((route) => {
                    if (route.id === action.payload.id) return action.payload
                    return route
                })
            }
        )
    },
    initialState,
})

export const { updateMainKey, setMainState, setSubpage } = mainSlice.actions

const mainReducer = mainSlice.reducer

export default mainReducer
