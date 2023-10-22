import "react-native-reanimated"
import "react-native-gesture-handler"
import MainPage from "./src/pages/Main"
import { Provider } from "react-redux"
import store from "./src/store"

export default function App() {
    return (
        <Provider store={store}>
            <MainPage />
        </Provider>
    )
}
