import {Button, Text, View} from "react-native";
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
import CustomModal from "@/components/CustomModal";

export default function recipe({navigation, route}) {
    // Extract parameters passed via navigation
    const {item} = route.params;
    // Programmatically set the header title based on the item passed as a parameter
    useEffect(() => {
        navigation.setOptions({
            title: item.title, // Set the header title dynamically
            headerRight: () => (
                <View style={{marginRight: 10}}>
                    {item.notes && <Button
                        onPress={openModal}
                        title="Our Tips"
                        color="#00cc00"
                    />}
                </View>
            ),
        });
    }, [navigation, item]);

//State that will control the Modal with the tips
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                text={item.notes}
            />
            <WebView
                originWhitelist={['*']}
                source={{uri: 'https://reactnative.dev/'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
})
