import React, {useEffect} from 'react';
import {Button, FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ScreenBackground from "@/components/ScreenBackground";

export default function recipe ({ navigation, route }) {
    // Extract parameters passed via navigation
    const { item } = route.params;
    useEffect(() => {
        // Programmatically set the header title based on the item passed as a parameter
        navigation.setOptions({
            title: item.title, // Set the header title dynamically
        });
    }, [navigation, item]);

    //The element of the list
    const renderRecipe = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('recipe', { title: item.title, item })}
        >
            <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenBackground>
            <FlatList
                data={item.recipes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={renderRecipe}
            />
        </ScreenBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', // Light background color
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        backgroundColor: '#ff7043', // Header background color (you can change it)
        color: '#fff', // Header text color
        textAlign: 'center',
    },
    listContainer: {
        padding: 10,
    },
    itemContainer: {
        backgroundColor: '#fff', // White background for each item
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8, // Rounded corners
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
        shadowOpacity: 0.2, // Shadow for iOS
        shadowRadius: 4, // Shadow for iOS
        elevation: 3, // Shadow for Android
    },
    itemText: {
        fontSize: 18,
        color: '#333', // Dark text color
    },
});
