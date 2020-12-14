import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { AppLoading } from 'expo';

import TextButton from '../../components/Button/textButton.component';
import TagIcon from '../../components/Icon/tag.component';
import NewsModel from '../../model/news.model';
import TagPopUp from '../../components/TagPopUp/tagPopUp.component';
import Notification from '../../components/Notification/notification.component';

const win = Dimensions.get('window');
const ratio = win.width / 540;

export interface NewsLayoutProps {
    value: object;
}

const NewsLayout: React.FC<NewsLayoutProps> = (props) => {
    const news: NewsModel = props.route.params.news;
    const time = (new Date()).getTime() - (new Date(news.publishedAt)).getTime();
    const tagSheetRef = React.useRef(null);
    const notificationSheetRef = React.useRef(null);
    const [notification, setNotification] = React.useState('');

    console.log(props.route);

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.mainImage}
                    source={{
                        uri: props.route.params.news.urlToImage,
                    }}
                    resizeMode= "contain"
                />
                <Text style={styles.source}>{news.source}</Text>
                <Text style={styles.title}>{news.title}</Text>
                <View style={styles.grid}>
                    <Text style={styles.update}>Updated {Math.round(time / 3600000)} hours ago</Text>
                    <TagIcon color="#828282" size={16} onPress={() => tagSheetRef.current.snapTo(0)}/>
                </View>
                <View style={styles.tags}>
                {
                    news.tags.map((t, index) => {
                        return <TextButton key={index} text={'# ' + t} fontSize={10} paddingVertical={3} marginTop={11}/>
                    })
                }
                </View>
                <View>
                {
                    news.content.map((c, index) => {
                        return <Text style={styles.content} key={index}>{c}</Text>
                    })
                }
                </View>
            </ScrollView>
            <TagPopUp 
                sheetRef={tagSheetRef}
                news={news}
                tagAdded={(tagName: string) => {
                    setNotification(tagName);
                    tagSheetRef.current.snapTo(2);
                    notificationSheetRef.current.snapTo(0);
                }}
            />
            <Notification sheetRef={notificationSheetRef} tagName={notification}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        marginHorizontal: 20
    },
    mainImage: {
        width: win.width,
        height: ratio * 360,
        alignSelf: "stretch",
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
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        color: "#FFFFFF",
        marginVertical: 10
    }
});

export default NewsLayout;