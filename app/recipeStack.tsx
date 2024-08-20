import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack } from "expo-router";
import recipeCategoriesSearch from "@/app/recipes/recipeCategoriesSearch";
import recipe from "@/app/recipes/recipe";
import {Text} from "react-native";

export default function recipeStack() {
    return (
        <>
        {/*// <NavigationContainer>*/}
              <Stack initialRouteName="recipes/recipe">
                <Stack.Screen name="recipes/recipeCategoriesSearch"/>
                <Stack.Screen name="recipes/recipe" />
              </Stack>
        {/*// </NavigationContainer>*/}
        </>
    );

}
