import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Headline } from 'react-native-paper';
import TagIcon from '../../Icon/tag.component';
import NewsModel from '../../../model/news.model';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export interface MainCardProps {
    news: NewsModel;
    sheetRef: React.MutableRefObject<null>;
    tagOnPress: Function;
    onPress: Function;
}

const MainCard: React.FC<MainCardProps> = (props) => {
    const time = (new Date()).getTime() - (new Date(props.news.publishedAt)).getTime();

    return(
        <View style={styles.container}>
            <Card style={styles.card} onPress={() => props.onPress(props.news)}>
                <Card.Cover source={{ uri: props.news.urlToImage }} />
                <Card.Content>
                    <Title style={styles.source}>{props.news.source}</Title>
                    <Headline style={styles.title}>{props.news.title}</Headline>
                </Card.Content>
                <Card.Content style={styles.tags}>
                    {
                        props.news.tags.map((t, index) => {
                            return <Text key={index} style={styles.tag} >{'# ' + t}</Text>
                        })
                    }
                </Card.Content>
                <Card.Content style={styles.footer}>
                    <Paragraph style={styles.time}>{Math.round(time / 3600000)} hours ago</Paragraph>
                    {/* <TagIcon color="#828282" size={20} onPress={() => props.tagOnPress(props.news)}/> */}
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    card: {
        width: "95%",
        backgroundColor: "#141414",
        borderColor: '#484848',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
    },
    image: {

    },
    source: {
        fontSize: 10,
        lineHeight: 14,
        color: "#C1C1C1",
        marginTop: 5
    },
    title: {
        fontSize: 18,
        lineHeight: 25,
        color: "#FFFFFF",
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginTop: 10
    },
    tag: {
        borderRadius: 100,
        backgroundColor: "#424242",
        alignContent: "center",
        justifyContent: "center",
        fontSize: 10,
        color: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 10
    },
    footer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    time: {
        // fontFamily: "Noto Sans",
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