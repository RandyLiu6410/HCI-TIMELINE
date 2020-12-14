import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';
import Timeline from '../../components/Timeline/timeline.component';

import Header from '../../components/Header/header.component';
import BackIcon from '../../components/Icon/back.component';
import TextButton from '../../components/Button/textButton.component';

export interface TimelineLayoutProps {
    tag: string;
}

const TimelineLayout: React.FC<TimelineLayoutProps> = (props) => {
    const tag  = props.route.params.tag;
    const navigation = props.route.params.navigation;
    console.log(tag)

    return(
        <SafeAreaView style={styles.container}>
             <View style={styles.back}>
                <BackIcon size={20} color={'#C4C4C4'} onPress={()=>(navigation.goBack())}></BackIcon>
            </View>
            <React.Fragment>
                <Text style={styles.title}>{'# ' + tag}</Text>
                <TextButton text='Following' fontSize={10} paddingVertical={5} paddingHorizontal={15} marginTop={10} 
                marginLeft={'auto'} marginRight={15}/>
            </React.Fragment>
            
            {/* <Button title='goBack' onPress={()=>(navigation.goBack())}></Button> */}
           
            {/* <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    
                </View>
            </ScrollView> */}
            <Timeline />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    scrollView: {
        height: "60%",
    },
    title: {
        color: '#FFFFFF',
        textAlign: 'right',
        fontSize: 24,
        fontFamily: 'Gobold',
        // fontWeight: 'bold',
        marginTop: -20,
        marginRight: 20
    },
    wrapper: {
        marginLeft: 'auto'
    },
    back: {
        marginTop: 18.62,
        marginLeft: 19
    },
    content: {
        margin: 40,
        marginLeft: 43,
        marginBottom: 29,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    scrollview: {
        marginHorizontal: 20
    },
});

export default TimelineLayout;