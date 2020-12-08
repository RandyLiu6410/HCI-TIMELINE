import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import NewsModel from '../../model/news.model';

export interface NewsLayoutProps {
    value: object;
}

const NewsLayout: React.FC<NewsLayoutProps> = (props) => {
    const news: NewsModel = props.route.params.news;
    const nowTime = (new Date()).getTime();

    return(
        <View style={styles.container}>
            <Image
                style={styles.mainImage}
                source={{
                    uri: props.route.params.news.images[0].src,
                }}
            />
            <Text style={styles.source}>{news.source}</Text>
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.update}>Updated {Math.round((nowTime - news.postTime) / 3600000)} hours ago</Text>
            <Text style={styles.content}>{news.content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    mainImage: {
        width: "100%"
    },
    source: {
        fontSize: 10,
        color: "#C1C1C1"
    },
    title: {
        fontSize: 18,
        color: "#FFFFFF"
    },
    update: {
        fontSize: 10,
        color: "#828282"
    },
    content: {
        fontSize: 18,
        color: "#FFFFFF"
    }
});

export default NewsLayout;