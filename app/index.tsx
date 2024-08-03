import {ImageBackground, StyleSheet, Text, View, FlatList, Dimensions} from "react-native";
import {groceries} from "@/constants/Groceries";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, setItems } from '../store/groceryList';
import axios from 'axios';
import {useEffect, useState} from "react";

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
    // const handleRemoveData = (id) => {
    //     dispatch(removeItem(id));
    // };


    //const [groceriesToShow, setGroceriesToShow] = useState([]);

    // Fetch initial data from Firebase the first time the component loads. The list is actually the store list, which is actually then synced with firebase
    const groceriesFromDb = []
    useEffect(() => {
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
                //console.log(groceriesListFromStore)
            }
            //console.log(groceriesFromDb);
        })
        .catch(error => {
            // Handle any errors here
            console.error('Error fetching grocery list:', error);
        });
    }, []);



    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/grocery-bag-girl.jpg')} style={styles.image} imageStyle={{ opacity: 0.6}}>
                    <FlatList style={styles.list}
                              contentContainerStyle={{alignItems: "center", justifyContent: "center"}} data = {groceriesListFromStore}
                              renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
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
        width: deviceWidth * 6/7,
        height: deviceHeight * 1/15,
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 15,
        fontSize: 24
    },
})
