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


    //Js that removes images so the html is cleaner
    const hideImagesScript = `
  function hideImages() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = 'none';
    }
  }

  document.addEventListener("DOMContentLoaded", hideImages);

  var observer = new MutationObserver(hideImages);
  observer.observe(document.body, { childList: true, subtree: true });
`;

    return (
        <>
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                text={item.notes}
            />
            <WebView
                originWhitelist={['*']}
                source={{uri: item.url}}
                injectedJavaScript={hideImagesScript}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                }}
                onLoad={() => console.log('WebView loaded')}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
})
