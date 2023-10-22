import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UpdatePayloadType } from "."

export interface IConfigState {
    autoPlacePoints: boolean
    autoPlaceIntervalMs: number
}

const initialState: IConfigState = {
    autoPlacePoints: false,
    autoPlaceIntervalMs: 15_000,
}

const configSlice = createSlice({
    initialState,
    name: "config",
    reducers: {
        updateKey: (
            state,
            action: PayloadAction<
                UpdatePayloadType<IConfigState, keyof IConfigState>
            >
        ) => {
            const [key, newValue] = action.payload
            return { ...state, [key]: newValue } as IConfigState
        },
        setConfig: (_, action: PayloadAction<IConfigState>) => {
            return action.payload
        },
    },
})

export const { updateKey, setConfig } = configSlice.actions

const configReducer = configSlice.reducer

export default configReducer
