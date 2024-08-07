import {Stack} from "expo-router";
import store from '../store/store'
import {Provider} from 'react-redux'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import {Button} from "react-native";
import {Drawer} from 'expo-router/drawer';


export default function RootLayout() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
                {/*<Stack>*/}
                <Drawer >
                    <Drawer.Screen name="index"
                                   options={{
                                       title: 'Grocery bag (girl)',
                                       headerStyle: {backgroundColor: '#dffc35'},
                                       headerTintColor: '#085959',
                                       headerTitleStyle: {
                                           fontWeight: 'bold',
                                       },
                                       // headerRight: () => <Button onPress={() => console.log(1)} title="Update count" />,
                                   }}/>
                    <Drawer.Screen name="commonEvents"
                                   options={{
                                       title: 'Our events',
                                       headerStyle: {backgroundColor: '#26f1a9'},
                                       headerTintColor: '#ffffff',
                                       headerTitleStyle: {
                                           fontWeight: 'bold',
                                       },
                                       // headerRight: () => <Button onPress={() => console.log(1)} title="Update count" />,
                                   }}/>
                    {/*</Stack>*/}
                    <Toast/>
                    </Drawer>
            </GestureHandlerRootView>
        </Provider>
);
}
