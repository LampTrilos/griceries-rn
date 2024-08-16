import {Stack, useFocusEffect} from 'expo-router';
import ScreenBackground from "@/components/ScreenBackground";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {axiosGet} from "@/hooks/axiosCall";
import {removeItem, setItems} from "@/store/groceryHist";
import {Animated, Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Swipeable} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function history() {
    //Store section
    const groceriesHistFromStore = useSelector(state => state.groceryHist.value);
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
        fetchHistFromFirebase()
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
                    //console.log(groceriesHistFromStore)
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



    return (
        <ScreenBackground>
                <FlatList style={styles.list}
                          contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
                          data={groceriesHistFromStore}
                          renderItem={({item}) =>
                                  <View>
                                          <View style={styles.displayDisabledRow}>
                                              <Text style={styles.textDisplay} >{item.title}</Text>
                                              <Text style={styles.dateDisplay} >-{item.dateBought}</Text>
                                              <Icon onPress={() => handleDeleteItem(item)} name={'undo'}  style={styles.iconActive} />
                                          </View>
                                  </View>
                          }
                />
        </ScreenBackground>
    );
}
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    list: {
        flexGrow: 1,
        paddingTop: 15,
        width: '100%',
        //backgroundColor: 'red'
    },
    displayDisabledRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(225,234,234,0.9)',
        width: deviceWidth * 6 / 7,
        height: deviceHeight * 1 / 18,
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        borderRadius: 15,
    },
    iconActive: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
    },
    textDisplay: {
        fontWeight: '500',
        flex: 6,
        fontSize: 20
    },
    dateDisplay: {
        fontWeight: '400',
        justifyContent: 'flex-end',
        flex: 3,
        fontSize: 16
    },
})