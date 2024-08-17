import {Stack, useFocusEffect} from 'expo-router';
import ScreenBackground from "@/components/ScreenBackground";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {axiosGet} from "@/hooks/axiosCall";
import {removeItem, setItems} from "@/store/groceryHist";
import {
    Animated,
    Dimensions,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Swipeable} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import {useNavigation} from '@react-navigation/native';

export default function history() {
    //Store section
    const groceriesListFromStore = useSelector(state => state.recipeList.value);
    const dispatch = useDispatch();
    // const handleSetData = () => {
    //     dispatch(setItems(groceriesToShow));
    // };
    //
    const handleDeleteItem = (item) => {
        if (!item.constant) {
            dispatch(removeItem(item));
        }
    };

    // Fetch initial data from Firebase the first time the component loads. The list is actually the store list, which is actually then synced with firebase
    // Code to run when the component is focused or appears on the screen
    let tempList = []
    useFocusEffect(
    React.useCallback(() => {
        // Code to run when the component is focused or appears on the screen
        //console.log('Component is now focused');
        //fetchHistFromFirebase()
        // Cleanup (optional) if you want to do something when the component loses focus
        return () => {
            //console.log('Component is now unfocused');
        };
    }, [])
    );

    //We set all the items during the initial fetch, only add the nonconstants in the next ones
    function fetchHistFromFirebase() {
        axiosGet('groceriesHist', 1500)
            .then(response => {
                //console.log(response.data)
                // Check if response.data is not null
                let count = 0;
                if (response.data) {
                    for (const firebaseItemId in response.data) {
                        //Don't fetch more than 200 items
                        if (count >= 200) {
                            break;
                        }
                        if (response.data.hasOwnProperty(firebaseItemId)) {
                            const finalGroceryItem = {
                                id: firebaseItemId,
                                title: response.data[firebaseItemId].title,
                                discount: response.data[firebaseItemId].discount,
                                dateBought: formatDateToDDMMYYYY(response.data[firebaseItemId].dateBought)
                            };
                            //console.log(finalGroceryItem)
                            //console.log(tempList);
                            tempList.push(finalGroceryItem);
                            //console.log(tempList.value)
                        }
                        count++;
                    }
                    //setGroceriesToShow(tempList.value)
                    //To set the values for out store
                    //We set all the items during the initial fetch, only add the nonconstants in the next ones
                        dispatch(setItems(tempList));
                    //console.log(groceriesListFromStore)
                    tempList = []
                    //console.log(groceriesToShow)
                    //console.log(groceriesListFromStore)
                    //console.log(tempList);
                } })
            .catch(error => {
                // Handle any errors here
                showToast()
                //console.error('Error fetching grocery list:', error);
            });
    }

    function formatDateToDDMMYYYY(isoDateString) {
        const date = new Date(isoDateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }


    //Toast
    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Σφάλμα δικτύου',
            text2: 'Παρακαλώ ελέγξτε την σύνδεσή σας',
            autoHide: false,
            visibilityTime: 5000,
            topOffset: 50,
            swipeable: true
        });
    }


const navigation = useNavigation();
    const onPressRecipe = (item) => {
        navigation.navigate("Recipe", { item });
    };

    const renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
            <View style={styles.container}>
                <Image style={styles.photo} source={{uri: 'https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?b=1&s=612x612&w=0&k=20&c=Mn_EPBAGwtzh5K6VyfDmd7Q5eJFXSHhGWVr3T4WDQRo='}} />
                <Text style={styles.title}>{item.title}</Text>
                {/*<Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>*/}
                <Text style={styles.category}>qwerqwre</Text>
            </View>
        </TouchableHighlight>
    );

    return (
        <View>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={groceriesListFromStore} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
        </View>
    );
}
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: RECIPE_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
        height: RECIPE_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15
    },
    photo: {
        width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
        height: RECIPE_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
    },
    category: {
        marginTop: 5,
        marginBottom: 5
    }
})
