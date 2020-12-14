import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewsModel from '../../../model/news.model';

export interface SimpleCardProps {
    news: NewsModel;
}

const SimpleCard: React.FC<SimpleCardProps> = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.source}>{props.news.source}</Text>
            <Text style={styles.title}>{props.news.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    source: {
        fontSize: 10,
        lineHeight: 14,
        color: "#C4C4C4"
    },
    title: {
        fontSize: 14,
        lineHeight: 25,
        color: "#FFFFFF",
    }
});

export default SimpleCard;