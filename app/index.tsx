import {ImageBackground, StyleSheet, Text, View, FlatList, Dimensions} from "react-native";
import {groceries} from "@/constants/Groceries";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../store/groceryList';

export default function Index() {

    //const groceriesList = groceries;
    // @ts-ignore
    console.log(useSelector(state => state))
    // @ts-ignore
    const groceriesList = useSelector(state => state.groceryList.value);
    const dispatch = useDispatch();

    // const handleAddData = () => {
    //     dispatch(addItem({ id: data.length, value: `Item ${data.length}` }));
    // };

    // const handleRemoveData = (id) => {
    //     dispatch(removeItem(id));
    // };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/grocery-bag-girl.jpg')} style={styles.image} imageStyle={{ opacity: 0.6}}>
                    <FlatList style={styles.list}
                              contentContainerStyle={{alignItems: "center", justifyContent: "center"}} data = {groceriesList}
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
