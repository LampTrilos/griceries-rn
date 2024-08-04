import {ImageBackground, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Animated} from "react-native";
import {groceries} from "@/constants/Groceries";
import {useSelector, useDispatch} from 'react-redux';
import {addItem, removeItem, setItems} from '../store/groceryList';
import axios from 'axios';
import {useEffect, useState} from "react";
import {Swipeable} from "react-native-gesture-handler";

export default function Index() {
    //Store section
    //console.log(groceriesFromDb);
    const groceriesListFromStore = useSelector(state => state.groceryList.value);
    const dispatch = useDispatch();
    // const handleAddData = () => {
    //     dispatch(addItem({ id: data.length, value: `Item ${data.length}` }));
    // };
    // const handleSetData = () => {
    //     dispatch(setItems(groceriesToShow));
    // };
    //
    const handleDeleteItem = (item) => {
         //console.log('delete ' + direction)
        // console.log(item)
        dispatch(removeItem(item));
        setGroceriesToShow(groceriesToShow + 1);
        console.log(groceriesToShow)
        //console.log('Groceries are ' + groceriesListFromStore)
    };
    const [groceriesToShow, setGroceriesToShow] = useState(1);

    // Fetch initial data from Firebase the first time the component loads. The list is actually the store list, which is actually then synced with firebase
    const groceriesFromDb = []
    useEffect(() => {
        console.log('reloading')
        groceriesFromDb.value = []
        //Insert a row for test purposes
        //axios.post('https://test-f94ee-default-rtdb.europe-west1.firebasedatabase.app/groceryList.json', {title: 'Tiraki44'})
        axios.get('https://test-f94ee-default-rtdb.europe-west1.firebasedatabase.app/groceryList.json')
            .then(response => {
                // Check if response.data is not null
                if (response.data) {
                    for (const firebaseItemId in response.data) {
                        if (response.data.hasOwnProperty(firebaseItemId)) {
                            const finalGroceryItem = {
                                id: firebaseItemId,
                                title: response.data[firebaseItemId].title
                            };
                            //console.log(finalGroceryItem)
                            groceriesFromDb.value.push(finalGroceryItem);
                            //console.log(groceriesFromDb.value)
                        }
                    }
                    //setGroceriesToShow(groceriesFromDb.value)
                    //To set the values for out store
                    dispatch(setItems(groceriesFromDb.value));
                    //console.log(groceriesToShow)
                    console.log(groceriesListFromStore)
                }
                //console.log(groceriesFromDb);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error fetching grocery list:', error);
            });
    }, [groceriesToShow]);

    //For swipe buttons
    const renderRightActions = (
        progress: Animated.AnimatedInterpolation,
        dragAnimatedValue: Animated.AnimatedInterpolation,
    ) => {
        const opacity = dragAnimatedValue.interpolate({
            inputRange: [-150, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
         return (<View style={styles.swipedRow}>
                        <Animated.View >
                            <TouchableOpacity>
                                {/*<Text style={styles.deleteButtonText}>Deleting...</Text>*/}
                            </TouchableOpacity>
                        </Animated.View>
                        </View>);
        // return (
        //     <View style={styles.swipedRow}>
        //         <View style={styles.swipedConfirmationContainer}>
        //             <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        //         </View>
        //         <Animated.View style={[styles.deleteButton, {opacity}]}>
        //             <TouchableOpacity>
        //                 <Text style={styles.deleteButtonText}>Delete</Text>
        //             </TouchableOpacity>
        //         </Animated.View>
        //     </View>
        // );
    };

    const renderNoActions = () => {
        return (<></>);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/grocery-bag-girl.jpg')} style={styles.image}
                             imageStyle={{opacity: 0.6}}>
                <FlatList style={styles.list}
                          contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
                          data={groceriesListFromStore}
                          renderItem={({item}) =>
                               <Swipeable  renderLeftActions={renderRightActions} renderRightActions={renderRightActions} onSwipeableOpen={() => handleDeleteItem(item)}>
                              {/*<Swipeable onSwipeableOpen={handleDeleteItem} renderRightActions={renderNoActions} renderLeftActions={renderNoActions}>*/}
                                  <View >
                                      <Text style={styles.item}>{item.title}</Text>
                                  </View>
                              </Swipeable>
                          }
                />
            </ImageBackground>

        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    image: {
        height: '100%',
        width: '100%'
    },
    list: {
        paddingTop: 15,
        width: '100%',
        //backgroundColor: 'red'
    },
    item: {
        fontWeight: '500',
        fontStyle: 'italic',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: deviceWidth * 6 / 7,
        height: deviceHeight * 1 / 15,
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 15,
        fontSize: 24
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#efefef',
        margin: 20,
        minHeight: 50,
    },
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#818181',
        margin: 20,
        //minHeight: 50,
        opacity: 1,
        //height: 0
        //display: "none" This causes the swipe to not function at all
    },
    swipedConfirmationContainer: {
        flex: 1,
    },
    deleteConfirmationText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#b60000',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    deleteButtonText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        padding: 3,
    },
});
