import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';
import Timeline from '../../components/Timeline/timeline.component';

import Header from '../../components/Header/header.component';
import BackIcon from '../../components/Icon/back.component';
import TextButton from '../../components/Button/textButton.component';
import SortIcon from '../../components/Icon/sort.component';
import SortPopUp from '../../components/SortPopUp/sortPopUp.component';

export interface TimelineLayoutProps {
    tag: string;
}

const TimelineLayout: React.FC<TimelineLayoutProps> = (props) => {
    const tag  = props.route.params.tag;
    const navigation = props.route.params.navigation;
    const sortSheetRef = React.useRef(null);
    const [sort, setSort] = React.useState('new');
    // console.log(tag)

    function changeSort() {
        sortSheetRef.current.snapTo(0);
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.back}>
                <BackIcon size={20} color={'#C4C4C4'} onPress={()=>(navigation.goBack())}></BackIcon>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{'# ' + tag}</Text>
                <TextButton text='Following' fontSize={10} paddingVertical={5} paddingHorizontal={15} marginTop={10} 
                 marginRight={15}/>
                <View style={styles.sort}>
                    {
                        sort === 'new'
                        ?
                        <Text style={styles.sortText}>Latest</Text>
                        :
                        <Text style={styles.sortText}>Oldest</Text>
                    }
                    <SortIcon size={23} color={'#C4C4C4'} onPress={changeSort}></SortIcon>
                </View>
            </View>
            <Timeline />
            <SortPopUp
                sheetRef={sortSheetRef}
                sortChanged={(status)=>{
                    setSort(status);
                    sortSheetRef.current.snapTo(1);
            }}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101010'
    },
    scrollView: {
        height: "60%",
    },
    wrapper: {
        marginLeft: 'auto',
        backgroundColor: '#101010'
    },
    title: {
        color: '#FFFFFF',
        textAlign: 'right',
        fontSize: 24,
        fontFamily: 'Gobold',
        // fontWeight: 'bold',
        marginTop: -20,
        marginRight: 15,
        marginBottom: 5
    },
    sort: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: -5,
        flexDirection: 'row',
    },
    sortText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginRight: 10,
        marginTop: 3
    },
    back: {
        marginTop: 18.62,
        marginLeft: 19,
        backgroundColor: '#101010'
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