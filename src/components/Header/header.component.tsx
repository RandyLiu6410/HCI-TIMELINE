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
        position: "absolute",
        width: 411,
        left: screenWidth/2 - 411/2,
        top: 0,
        // width: screenWidth,
        // top: 0,
        height: 72,
        marginBottom: screenHeight,
        backgroundColor: "#222222",
    },
    appNameLarge: {
        fontFamily: "Audrey",
        fontSize: 40,
        alignSelf: "center",
        marginTop: 11.5, //incorrect
        color: "#FFFFFF",
    },
    appNameSmall: {
        fontFamily: "Audrey",
        fontSize: 14,
        alignSelf: "center",
        marginTop: 15,
        color: "#FFFFFF",
    },
    childName: {
        fontFamily: "Gobold",
        fontSize: 24,
        alignSelf: "center",
        color: "#FFFFFF",
    }
});

export default Header;