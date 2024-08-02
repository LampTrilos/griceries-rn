import {Stack} from "expo-router";
import store from '../store/store'
import {Provider} from 'react-redux'


export default function RootLayout() {
    return (
        <Provider store={store}>
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
        </Provider>
    );
}
