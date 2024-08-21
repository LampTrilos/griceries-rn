import {Button, Text} from "react-native";
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import {useEffect} from "react";
export default function recipe ({ navigation, route }) {
    // Extract parameters passed via navigation
    const { item } = route.params;
    useEffect(() => {
        // Programmatically set the header title based on the item passed as a parameter
        navigation.setOptions({
            title: item.title, // Set the header title dynamically
            headerRight: () => (
                <Button
                    onPress={() => alert('Right button pressed!')}
                    title="Info"
                    color="#00cc00"
                />
            ),
        });
    }, [navigation, item]);


    return (
        <WebView
            originWhitelist={['*']}
            source={{uri: 'https://reactnative.dev/'}}
        />
    )
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 50,
        },
    })
