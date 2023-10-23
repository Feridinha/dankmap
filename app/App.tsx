import "react-native-gesture-handler"
import MainPage from "./src/pages/Main"
import { Provider } from "react-redux"
import store from "./src/store"
import { Text } from "react-native"

export default function App() {
    return (
        <Provider store={store}>
            <MainPage />
            {/* <Text>Xdd</Text> */}
        </Provider>
    )
}
