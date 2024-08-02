import {ImageBackground, StyleSheet, Text, View} from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ImageBackground source={require('../assets/images/grocery-bag-girl.jpg')} style={styles.image}>
                <Text>Edit app/index.tsx to edit this screen222.</Text>
            </ImageBackground>

        </View>
    );
}

    const styles = StyleSheet.create({
        image: {
            height: '100%',
            width: '100%',
            opacity: 0.5
        }
})
