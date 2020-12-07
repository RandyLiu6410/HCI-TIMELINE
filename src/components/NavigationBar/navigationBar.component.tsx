import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import IconButton from '../Button/iconButton.component';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export interface NavigationBarProps {
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
    function navigate() {

    }

    return(
        <View style={styles.container}>
            <IconButton icon="home" color="#828282" size={24} onPress={() => navigate}/>
            <IconButton icon="hash" color="#828282" size={24} onPress={() => navigate}/>
            <IconButton icon="search" color="#828282" size={24} onPress={() => navigate}/>
            <IconButton icon="user" color="#828282" size={24} onPress={() => navigate}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 51,
        alignSelf: "center",
        backgroundColor: "#222222",
        // marginBottom: screenHeight - 72,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});

export default NavigationBar;