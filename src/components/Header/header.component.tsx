import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export interface HeaderProps {
    hasChild: boolean;
    child: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <View style={styles.container}>
            {props.hasChild ?
            <React.Fragment>
                <Text style={styles.appNameSmall}>TIMELINE</Text>
                <Text style={styles.childName}>{props.child}</Text>
            </React.Fragment>
            :
            <Text style={styles.appNameLarge}>TIMELINE</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // left: screenWidth/2 - 411/2,
        // top: 0,
        // width: screenWidth,
        // top: 0,
        height: 60,
        // marginBottom: screenHeight,
        backgroundColor: "#101010",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 10
    },
    appNameLarge: {
        fontFamily: "Audrey",
        fontSize: 30,
        marginTop: 11.5, //incorrect
        color: "#FFFFFF",
    },
    appNameSmall: {
        fontFamily: "Audrey",
        fontSize: 14,
        marginTop: 15,
        color: "#FFFFFF",
    },
    childName: {
        fontFamily: "Gobold",
        fontSize: 24,
        color: "#FFFFFF",
    }
});

export default Header;