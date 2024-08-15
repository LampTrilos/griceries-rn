import {Stack} from "expo-router";
import store from '../store/store'
import {Provider} from 'react-redux'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import {Button, StyleSheet} from "react-native";
import {Drawer} from 'expo-router/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
                {/*<Stack>*/}
                <Drawer >
                    <Drawer.Screen name="index"
                                   options={({ navigation }) => ({
                                       title: 'Grocery bag (girl)',
                                       headerStyle: {backgroundColor: '#dffc35'},
                                       headerTintColor: '#085959',
                                       headerTitleStyle: {
                                           fontWeight: 'bold',
                                       },
                                        headerRight: () => <Icon onPress={() => navigation.navigate('history')} name={'history'} style={styles.iconActive} />,
                                   })}/>
                    <Drawer.Screen name="history"
                                   options={({ navigation }) => ({
                                       drawerItemStyle: { display: "none" },
                                       title: 'History',
                                       headerStyle: {backgroundColor: '#dffc35'},
                                       headerTintColor: '#085959',
                                       headerTitleStyle: {
                                           fontWeight: 'bold',
                                       },
                                       headerRight: () => <Icon onPress={() => navigation.navigate('index')} name={'arrow-circle-left'} style={styles.iconActive} />
                                   })}/>
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

const styles = StyleSheet.create({
    iconActive: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#085959',
        paddingTop: 15,
        paddingEnd: 50,
    },
})
