import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import TextButton from '../../components/Button/textButton.component';
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
            <View style={styles.tags}>
            {
                news.tags.map((t, index) => {
                    return <TextButton key={index} text={'# ' + t} />
                })
            }
            </View>
            <Text style={styles.content}>Former President Barack Obama has stated that President-elect Joe Biden's electoral victory over President Donald Trump is greater than Trump's 2016 victory over then-Democratic presidential nominee Hillary Clinton.

In a clip of a forthcoming interview with Gayle King of CBS Sunday Morning, Obama mentioned how, on Election Night 2016, he called Trump at 2:30 in the morning to congratulate him on his victory.
</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20
    },
    mainImage: {
        width: "100%",
        alignSelf: "stretch",
        resizeMode: "contain",
        flex: 1
    },
    source: {
        fontSize: 10,
        color: "#C1C1C1"
    },
    title: {
        fontSize: 18,
        color: "#FFFFFF",
        marginBottom: 10,
    },
    update: {
        fontSize: 10,
        color: "#828282",
        marginBottom: 10,
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    content: {
        fontSize: 18,
        color: "#FFFFFF"
    }
});

export default NewsLayout;