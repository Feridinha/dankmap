import { configureStore } from "@reduxjs/toolkit"
import configReducer, { IConfigState } from "./slices/config"
import mainReducer, { IMainState } from "./slices/main"

export interface IRootState {
    config: IConfigState
    main: IMainState
}

const store = configureStore({
    reducer: {
        config: configReducer,
        main: mainReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    devTools: false,
})

export default store
