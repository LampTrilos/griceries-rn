import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Animated,
    TextInput
} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {addItem, editItem, removeItem, setItems} from '../store/groceryList';
import {useEffect, useState} from "react";
import {Swipeable} from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import {axiosGet} from "@/hooks/axiosCall";

export default function Index() {
    //Store section
    const groceriesListFromStore = useSelector(state => state.groceryList.value);
    const dispatch = useDispatch();
    const handleAddItem = (newItem) => {
        dispatch(addItem(newItem));
    };
    const handleEditItem = (editedItem) => {
        dispatch(editItem(editedItem));
    };
    // const handleSetData = () => {
    //     dispatch(setItems(groceriesToShow));
    // };
    //
    const handleDeleteItem = (item) => {
        dispatch(removeItem(item));

    };

    // Fetch initial data from Firebase the first time the component loads. The list is actually the store list, which is actually then synced with firebase
    const tempList = []
    useEffect(() => {
        //console.log('reloading')
        tempList.value = []
        //Fetches the list from firebase
        beginTimer()
    }, []);

    //For swipe buttons, it's empty
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
            <Animated.View>
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


    //Fetches the list from firebase immediately, and repeats the call every 10 secs
    function beginTimer() {
        fetchListFromFirebase()
        setInterval(fetchListFromFirebase, 10000)
        }

    function fetchListFromFirebase() {
        axiosGet('', 1500)
            .then(response => {
                //console.log(response.data)
                // Check if response.data is not null
                if (response.data) {
                    for (const firebaseItemId in response.data) {
                        if (response.data.hasOwnProperty(firebaseItemId)) {
                            const finalGroceryItem = {
                                id: firebaseItemId,
                                title: response.data[firebaseItemId].title,
                                discount: response.data[firebaseItemId].discount
                            };
                            //console.log(finalGroceryItem)
                            tempList.value.push(finalGroceryItem);
                            //console.log(tempList.value)
                        }
                    }
                    //setGroceriesToShow(tempList.value)
                    //To set the values for out store
                    dispatch(setItems(tempList.value));
                    tempList.value = []
                    //console.log(groceriesToShow)
                    //console.log(groceriesListFromStore)
                }
                //console.log(tempList);
            })
            .catch(error => {
                // Handle any errors here
                showToast()
                console.error('Error fetching grocery list:', error);
            });
}


    //------------------------For user input of new elements-------------------------------//
    const [newItemText, setNewItemText] = useState('');

    function handleInsertNewItem(event) {
        //console.log('Inserting')
        // const { text } = event.nativeEvent;
        // setNewItemText(text)
        //Now to add to store if the input is not empty
        if (newItemText && newItemText.length > 0) {
            handleAddItem(
                {
                    id: new Date().toString(),
                    title: newItemText,
                    discount: false,
                })
        }
        //Now to reset the field
        //console.log('Reseting...')
        // Reset TextInput value after handling input
        setNewItemText('');
    }

    function handleChangeNewText(text: string) {
        setNewItemText(text)
    }

//------------------------End of user input of new elements-------------------------------//
//------------------------For user edit of elements----------------------------------//
    const [editMode, setEditMode] = useState(false);
    const [textEdited, setTextEdited] = useState('');
    //Edit mode controls whether the View or the Input is shown, because the swipeable doesn't work with input
    const [editedId, setEditedId] = useState('');

    function invertEditMode(id: string) {
        setEditedId(id)
        setEditMode(!editMode)
    }

    function handleChangeEditedText(editedText) {
        //console.log(editedText)
        // console.log(event.nativeEvent)
        // const { text } = event.nativeEvent;
        setTextEdited(editedText)
        // Reset TextInput value after handling input
        //setTextEdited('');
    }

    function handleUpdateItem(editedItem, flipDiscountFlag: boolean) {
        //console.log('Updating')
        //setNewItemText(text)
        //Now to add to store if the input is not empty
        //console.log(textEdited)
        if ((textEdited && textEdited.length > 0) || flipDiscountFlag) {
            //We will flip the discount if the flag is true
            handleEditItem(
                {
                    id: editedItem.id,
                    title: textEdited ? textEdited : editedItem.title,
                    discount: flipDiscountFlag ? !editedItem.discount : editedItem.discount
                })
        }
        //Now to reset the field
        //console.log('Reseting...')
        // Reset TextInput and editMode value after handling input
        invertEditMode.bind('')
        setTextEdited('');
    }

    //We are delaying because else the input disappeared before firing the persist
    function delayDisableEditMode() {
        setTimeout(() => {
            setEditMode(false), 50
        })
    }



//------------------------End of user edit of elements-------------------------------//


    return (
        <View>
            <ImageBackground source={require('../assets/images/grocery-bag-girl.jpg')} style={styles.image}
                             imageStyle={{opacity: 0.6}}>
                <View style={styles.listContainer}>
                    <FlatList style={styles.list}
                              contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
                              data={groceriesListFromStore}
                              renderItem={({item}) =>
                                  <Swipeable renderLeftActions={renderRightActions}
                                             renderRightActions={renderRightActions}
                                             onSwipeableOpen={() => handleDeleteItem(item)}>
                                      {/*<Swipeable onSwipeableOpen={handleDeleteItem} renderRightActions={renderNoActions} renderLeftActions={renderNoActions}>*/}
                                      <View>
                                          {/* If we are not editing */}
                                          {(!editMode || editedId !== item.id) &&
                                              <View style={styles.displayRow}>
                                                  {/*<TouchableOpacity onPress={() => invertEditMode(item.id)}>*/}
                                                  <Text onLongPress={invertEditMode.bind('this', item.id)}
                                                        style={styles.textDisplay}>{item.title}</Text>
                                                  {/*</TouchableOpacity>*/}
                                                  {/*<TouchableOpacity onPress={() => console.log('Icon pressed')}>*/}
                                                  <Icon onPress={() => handleUpdateItem(item, true)} name={item.discount ? 'history' : 'cart-plus'}  style={item.discount ? styles.iconGrey : styles.iconActive} />
                                                  {/*</TouchableOpacity>*/}
                                              </View>
                                          }
                                          {/* If we are editing */}
                                          {editMode && editedId === item.id &&
                                              <TextInput
                                                  style={styles.textNew}
                                                  onEndEditing={() => handleUpdateItem(item, false)}
                                                  onChangeText={handleChangeEditedText}
                                                  defaultValue={item.title}
                                                  autoFocus={true}
                                                  onBlur={delayDisableEditMode}
                                              />}
                                      </View>
                                  </Swipeable>
                              }
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textNew}
                        placeholder="Τι άλλο χρειαζόμαστε...?"
                        onEndEditing={handleInsertNewItem}
                        onChangeText={handleChangeNewText}
                        value={newItemText}
                    />
                </View>
            </ImageBackground>

        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    listContainer: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
    textNew: {
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
    textDisplay: {
        fontWeight: '500',
        fontStyle: 'italic',
        flex: 6,
        //backgroundColor: 'rgba(255, 255, 255, 0.9)',
        // width: deviceWidth * 6 / 7,
        // height: deviceHeight * 1 / 15,
        // marginTop: 4,
        // marginBottom: 4,
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 10,
        // borderRadius: 15,
        fontSize: 24
    },
    iconGrey: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray',
    },
    iconActive: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
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
        height: 0
        //display: "none" This causes the swipe to not function at all
    },
    inputContainer: {
        //flex: 1,
        marginTop: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },
    displayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: deviceWidth * 6 / 7,
        height: deviceHeight * 1 / 15,
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 15,
    },
});
