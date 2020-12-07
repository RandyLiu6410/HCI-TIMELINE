import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import TextButton from '../Button/textButton.component';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export interface TabBarProps {
}

const TabBar: React.FC<TabBarProps> = (props) => {
    const Tab = createMaterialTopTabNavigator();

    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 46,
        backgroundColor: "#222222",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    tabName: {
        fontFamily: "Noto Sans",
        fontSize: 16,
        position: "absolute",
        lineHeight: 22,
        // right: 318,
        // top: 85,
        color: "#FFFFFF",
        // justifyContent: "space-between",
        // alignItems: "center",
        // flexDirection: "row",
    }
});

export default TabBar;