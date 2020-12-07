import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import TextButton from '../Button/textButton.component';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export interface TabBarProps {
}

const TabBar: React.FC<TabBarProps> = (props) => {
    function switchTab() {

    }

    return(
        <View style={styles.container}>
            {/* <Button title="" color="#222222" onPress={() => switchTab}>
                <Text style={styles.tabName}>Latest</Text>
            </Button> */}
            {/* <View style={styles.tabName}>
                <Button title="Latest" color="#222222" onPress={() => switchTab}/>
                <Button title="Following" color="#222222" onPress={() => switchTab}/>
                <Button title="Locals" color="#222222" onPress={() => switchTab}/>
            </View> */}
            <Button title="Latest" color="#222222" onPress={() => switchTab}/>
            <Button title="Following" color="#222222" onPress={() => switchTab}/>
            <Button title="Locals" color="#222222" onPress={() => switchTab}/>
            {/* <View style={styles.tabName}>
                <Button title="Latest" color="#222222" onPress={() => switchTab}/>
            </View> */}
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
        // marginBottom: screenHeight - 72,
        
        // position: "absolute",
        // left: 47,
        // top: 76,
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