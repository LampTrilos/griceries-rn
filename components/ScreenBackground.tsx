import {ImageBackground, StyleSheet, View} from "react-native";


export default function ScreenBackground({ children }) {


return (
<View>
    <ImageBackground source={require('../assets/images/grocery-bag-girl.jpg')} style={styles.image}
                     imageStyle={{opacity: 0.6}} >

        {children}

    </ImageBackground>
    </View>
);
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%'
    }
});