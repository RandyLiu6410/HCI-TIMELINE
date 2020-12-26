import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../components/Icon/back.component';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export interface HeaderProps {
    hasChild: boolean;
    child: string;
    previous: any;
}

const Header: React.FC<HeaderProps> = (props) => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        'Audrey': require('../../../assets/fonts/Audrey/Audrey-Normal.otf'),
        'Gobold': require('../../../assets/fonts/gobold/GoboldBold.otf')
    });

    return (
        <View style={styles.container}>
            {
                props.previous ? 
                <View style={styles.backButton}>
                    <BackIcon onPress={navigation.goBack} color="#C4C4C4" size={20}/> 
                </View>
                : <View />
            }
            {
                props.hasChild ?
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
        height: 72,
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
        alignSelf: 'center'
    },
    appNameSmall: {
        flex: 1,
        fontFamily: "Audrey",
        fontSize: 14,
        marginTop: 15,
        color: "#FFFFFF",
    },
    childName: {
        flex: 4,
        fontFamily: "Gobold",
        fontSize: 24,
        color: "#FFFFFF",
    },
    backButton: {
        position: 'absolute',
        alignSelf: 'flex-start',
        left: 20,
    }
});

export default Header;