import {ImageBackground, StyleSheet, Text, View, FlatList, Dimensions} from "react-native";

export default function Index() {


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/grocery-bag-girl.jpg')} style={styles.image} imageStyle={{ opacity: 0.6}}>
                    <FlatList style={styles.list}
                              contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
                              data={[
                                  {key: 'Devin'},
                                  {key: 'Dan'},
                                  {key: 'Dominic'},
                                  {key: 'Jackson'},
                                  {key: 'James'},
                                  {key: 'Joel'},
                                  {key: 'John'},
                                  {key: 'Jillian'},
                                  {key: 'Jimmy'},
                                  {key: 'Julie'},
                              ]}
                              renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                    />
            </ImageBackground>

        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;

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
        backgroundColor: 'red'
    },
    item: {
        backgroundColor: 'white',
        width: deviceWidth * 6/7,
        marginTop: 3,
        marginBottom: 3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 15,
        fontSize: 24
    },
})
