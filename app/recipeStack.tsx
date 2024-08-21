import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Stack } from "expo-router";
import recipeCategoriesSearch from "@/app/recipes/recipeCategoriesSearch";
import recipe from "@/app/recipes/recipe";
import {Text} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function recipeStack() {
    return (
        <>
        {/*// <NavigationContainer>*/}
        {/*      <Stack initialRouteName="recipe">*/}
        {/*        <Stack.Screen name="recipes/recipeCategoriesSearch" />*/}
        {/*        <Stack.Screen name="recipes/recipe" />*/}
        {/*      </Stack>*/}
        {/*// </NavigationContainer>*/}
            <Stack.Navigator initialRouteName='recipeCategoriesSearch' >
                <Stack.Screen name="recipeCategoriesSearch" component={recipeCategoriesSearch} options={{ headerShown: false }}/>
                <Stack.Screen name="recipe" component={recipe}/>
            </Stack.Navigator>
        </>
    );

}
