import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Headline } from 'react-native-paper';
import NewsModel from '../../../model/news.model';

export interface SearchCardProps {
    news: NewsModel;
}

const SearchCard: React.FC<SearchCardProps> = (props) => {
    const time = (new Date()).getTime() - (new Date(props.news.publishedAt)).getTime();

    return(
        <View style={styles.container}>
            <Card style={styles.card} >
                <View style={styles.content}>
                    <Card.Content style={{width: '70%'}}>
                        <Title style={styles.source}>{props.news.source}</Title>
                        <Headline style={styles.title}>{props.news.title}</Headline>
                    </Card.Content>
                    <Card.Cover style={styles.image} source={{ uri: props.news.urlToImage }} />
                </View>
                <Card.Content style={styles.tags}>
                    {
                        props.news.tags.map((t: string, index: number) => {
                            return <Text key={index} style={styles.tag} >{'# ' + t}</Text>
                        })
                    }
                </Card.Content>
                <Card.Content style={styles.footer}>
                    <Paragraph style={styles.time}>{Math.round(time / 3600000)} hours ago</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: "#141414",
        borderWidth: 1,
        borderBottomColor: 'gray'
    },
    content: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10
    },
    image: {
        resizeMode: 'contain',
        width: '30%',
        height: '100%'
    },
    source: {
        fontSize: 10,
        lineHeight: 10,
        color: "#C1C1C1"
    },
    title: {
        fontSize: 14,
        lineHeight: 14,
        color: "#FFFFFF"
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    tag: {
        borderRadius: 100,
        backgroundColor: "#424242",
        alignContent: "center",
        justifyContent: "center",
        fontSize: 8,
        color: '#FFFFFF',
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginRight: 6,
        marginTop: 3
    },
    time: {
        // fontFamily: "Noto Sans",
        fontSize: 10,
        color: "#828282",
    },
    footer: {
        // marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default SearchCard;