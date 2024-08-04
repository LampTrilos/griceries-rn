import {Stack} from "expo-router";
import store from '../store/store'
import {Provider} from 'react-redux'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';


export default function RootLayout() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView>
                <Stack>
                    <Stack.Screen name="index"
                                  options={{
                                      title: 'Grocery bag (girl)',
                                      headerStyle: {backgroundColor: '#dffc35'},
                                      headerTintColor: '#085959',
                                      headerTitleStyle: {
                                          fontWeight: 'bold',
                                      }
                                  }}/>
                </Stack>
                <Toast />
            </GestureHandlerRootView>
        </Provider>
    );
}
