import * as Location from "expo-location"
import { Nullable } from "./src/slices"
import store from "./src/store"
import * as TaskManager from "expo-task-manager"

const LOCATION_TASK_NAME = "background-location-task"
let intervalId: Nullable<ReturnType<typeof setInterval>> = null
let taskHasBeenRegistered = false

const handleTask = () => {}

store.subscribe(() => {
    const state = store.getState()
    const { autoPlaceIntervalMs, autoPlacePoints } = state.config
    if (!autoPlacePoints) clearInterval(intervalId!)
    else setInterval(handleTask, autoPlaceIntervalMs)
})

export const requestPermissions = async (): Promise<boolean> => {
    const resultForeground = await Location.requestForegroundPermissionsAsync()
    if (resultForeground.status !== "granted") {
        alert("Permissão negada!")
        return false
    }

    const resultBackground = await Location.requestBackgroundPermissionsAsync()
    if (resultBackground.status !== "granted") {
        alert("Permissão negada background!")
        return false
    }

    if (!taskHasBeenRegistered) {
        registerTask()
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            foregroundService: {
                notificationTitle: "Location...",
                notificationBody: "currently using location...",
                
            },
            showsBackgroundLocationIndicator: true,
            pausesUpdatesAutomatically: false,
            // distanceInterval: 1,
            timeInterval: 1000
        })
        taskHasBeenRegistered = true
    }

    return true
}

export const registerTask = async () => {
    TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: TaskManager.TaskManagerTaskBody) => {
        if (error) {
            // Error occurred - check `error.message` for more details.
            console.error(error)
            return
        }
        if (data) {
            const { locations } = data as { locations: Location[] }
            console.log("realtime", locations)
            // do something with the locations captured in the background
        }
    })
}
