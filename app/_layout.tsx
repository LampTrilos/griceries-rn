import {Stack} from "expo-router";
import store from '../store/store'
import {Provider} from 'react-redux'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import {Button, StyleSheet} from "react-native";
//import {Drawer} from 'expo-router/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Index from "@/app/index";
import history from "@/app/history";
import recipeStack from "@/app/recipeStack";
import {useNavigation} from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";

export default function RootLayout() {

    //The recipee stack to show when the recipe drawer is selected
    // const recipeStack =
    //     <Stack initialRouteName="recipes/recipe">
    //         <Stack.Screen name="recipes/recipeCategoriesSearch"/>
    //         <Stack.Screen name="recipes/recipe" />
    //     </Stack>


    const Drawer = createDrawerNavigator();
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
                {/*<Stack>*/}
                {/*<NavigationContainer>*/}
                    <Drawer.Navigator initialRouteName="index" screenOptions={{
                        drawerStyle: {
                            backgroundColor: '#17a686', // Set the drawer background color here
                            width: 240,
                        },
                        drawerLabelStyle: {
                            fontSize: 18, // Set font size here
                            fontWeight: 'bold', // Optional: Set font weight
                            color: 'white', // Optional: Set font color
                        },
                        activeTintColor: 'white', // Text color for the active item
                    }}>
                        <Drawer.Screen name="index" component={Index}
                                       options={({navigation}) => ({
                                           title: 'Grocery Bag girl',
                                           headerStyle: {backgroundColor: '#dffc35'},
                                           headerTintColor: '#085959',
                                           headerTitleStyle: {
                                               fontWeight: 'bold',
                                           },
                                          headerRight: () => <Icon onPress={() => navigation.navigate('history')}
                                                                   name={'history'} style={styles.iconActive}/>,
                                       })}/>
                            <Drawer.Screen name="history"
                                           component={history}
                                           options={({navigation}) => ({
                                               drawerItemStyle: {display: "none"},
                                               title: 'History',
                                               headerStyle: {backgroundColor: '#dffc35'},
                                               headerTintColor: '#085959',
                                               headerTitleStyle: {
                                                   fontWeight: 'bold',
                                               },
                                               headerRight: () => <Icon onPress={() => navigation.navigate('index')}
                                                                        name={'arrow-circle-left'} style={styles.iconActive}/>
                                           })}/>
                        <Drawer.Screen name="recipeStack"
                                       component={recipeStack}
                                       options={({navigation}) => ({
                                           title: 'Οι συνταγές μας',
                                           headerStyle: {backgroundColor: '#dffc35'},
                                           headerTintColor: '#085959',
                                           headerTitleStyle: {
                                               fontWeight: 'bold',
                                           },
                                       })}/>
                    </Drawer.Navigator>
                {/*</NavigationContainer>*/}
                {/*<Drawer screenOptions={{*/}
                {/*    drawerStyle: {*/}
                {/*        backgroundColor: '#17a686', // Set the drawer background color here*/}
                {/*        width: 240,*/}
                {/*    },*/}
                {/*    drawerLabelStyle: {*/}
                {/*        fontSize: 18, // Set font size here*/}
                {/*        fontWeight: 'bold', // Optional: Set font weight*/}
                {/*        color: 'white', // Optional: Set font color*/}
                {/*    },*/}
                {/*    activeTintColor: 'white', // Text color for the active item*/}
                {/*}}>*/}
                {/*    <Drawer.Screen name="index"*/}
                {/*                   options={({navigation}) => ({*/}
                {/*                       title: 'Grocery bag (girl)',*/}
                {/*                       headerStyle: {backgroundColor: '#dffc35'},*/}
                {/*                       headerTintColor: '#085959',*/}
                {/*                       headerTitleStyle: {*/}
                {/*                           fontWeight: 'bold',*/}
                {/*                       },*/}
                {/*                       headerRight: () => <Icon onPress={() => navigation.navigate('history')}*/}
                {/*                                                name={'history'} style={styles.iconActive}/>,*/}
                {/*                   })}/>*/}
                {/*    <Drawer.Screen name="history"*/}
                {/*                   options={({navigation}) => ({*/}
                {/*                       drawerItemStyle: {display: "none"},*/}
                {/*                       title: 'History',*/}
                {/*                       headerStyle: {backgroundColor: '#dffc35'},*/}
                {/*                       headerTintColor: '#085959',*/}
                {/*                       headerTitleStyle: {*/}
                {/*                           fontWeight: 'bold',*/}
                {/*                       },*/}
                {/*                       headerRight: () => <Icon onPress={() => navigation.navigate('index')}*/}
                {/*                                                name={'arrow-circle-left'} style={styles.iconActive}/>*/}
                {/*                   })}/>*/}
                {/*    <Drawer.Screen name="recipeStack"*/}
                {/*                   options={({navigation}) => ({*/}
                {/*                       title: 'Οι συνταγές μας',*/}
                {/*                       headerStyle: {backgroundColor: '#dffc35'},*/}
                {/*                       headerTintColor: '#085959',*/}
                {/*                       headerTitleStyle: {*/}
                {/*                           fontWeight: 'bold',*/}
                {/*                       },*/}
                {/*                   })}/>*/}
                {/*    <Drawer.Screen name="commonEvents"*/}
                {/*                   options={{*/}
                {/*                       title: 'Our events',*/}
                {/*                       headerStyle: {backgroundColor: '#26f1a9'},*/}
                {/*                       headerTintColor: '#ffffff',*/}
                {/*                       headerTitleStyle: {*/}
                {/*                           fontWeight: 'bold',*/}
                {/*                       },*/}
                {/*                       // headerRight: () => <Button onPress={() => console.log(1)} title="Update count" />,*/}
                {/*                   }}/>*/}
                {/*    /!*</Stack>*!/*/}
                {/*    <Toast/>*/}
                {/*</Drawer>*/}
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
