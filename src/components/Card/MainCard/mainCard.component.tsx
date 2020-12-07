import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from 'react-native';
import IconButton from '../../Button/iconButton.component';
import img from "../../../../assets/obama_biden.jpeg";
import TextButton from '../../Button/textButton.component';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export interface MainCardProps {
    image: string;
    source: string;
    title: string;
    tags: string;
    publishedHours: number;
}

const MainCard: React.FC<MainCardProps> = (props) => {
    const sheetRef = React.useRef(null);

    return(
        <View style={styles.border}>
            <View style={styles.container}>
                <Image source={img} style={styles.image}></Image>
                <Text style={styles.source}>{props.source}</Text>
                <Text style={styles.title}>{props.title}</Text>
                <TextButton text="# US Election"/>
                <View style={styles.horizontalView}>
                    <Text style={styles.time}>{props.publishedHours} hours ago</Text>
                    <IconButton icon="hash" color="#828282" size={24} onPress={null}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    border: {
        color: "#484848",
        borderWidth: 1,
        borderRadius: 10,
        // left: "6.33%",
        // right: "6.33%",
        width: 359,
        height: 350,
    },
    container: {
        width: 359,
        height: 350,
        position: "relative",
        // left: "6.33%",
        // right: "6.33%",
        // top: -200,
        backgroundColor: "#141414",
        borderRadius: 10,
    },
    image: {

    },
    source: {
        fontFamily: "Noto Sans",
        fontSize: 10,
        position: "absolute",
        lineHeight: 14,
        left: "4.46%",
        bottom: "48.57%",
        color: "#C1C1C1",
    },
    title: {
        fontFamily: "Noto Sans",
        fontSize: 18,
        position: "absolute",
        lineHeight: 25,
        left: "4.46%",
        bottom: "26.57%",
        color: "#FFFFFF",
    },
    time: {
        fontFamily: "Noto Sans",
        fontSize: 10,
        color: "#828282",
    },
    horizontalView: {
        flexDirection: "row",
        position: "absolute",
        lineHeight: 14,
        left: "4.46%",
        bottom: "3.71%",
    }

});

export default MainCard;