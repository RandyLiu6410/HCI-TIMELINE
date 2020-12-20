import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import TextButton from '../../components/Button/textButton.component';
import TagIcon from '../../components/Icon/tag.component';
import NewsModel from '../../model/news.model';
import TagPopUp from '../../components/TagPopUp/tagPopUp.component';
import Notification from '../../components/Notification/notification.component';

import TimelineLayout from '../timeline/timeline.layout';

const win = Dimensions.get('window');
const ratio = win.width / 540;

export interface NewsLayoutProps {
    news: NewsModel;
    user: {name: string};
}

const NewsLayout: React.FC<NewsLayoutProps> = (props) => {
    const news: NewsModel = props.route.params.news;
    const time = (new Date()).getTime() - (new Date(news.publishedAt)).getTime();
    const tagSheetRef = React.useRef(null);
    const notificationSheetRef = React.useRef(null);
    const [notification, setNotification] = React.useState('');
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.mainImage}
                    source={{
                        uri: news.urlToImage,
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
                        return <TouchableOpacity onPress={() => navigation.navigate('Timeline', { tag: t, user: props.user })}>
                        <TextButton key={index} text={'# ' + t} fontSize={10} paddingVertical={3} paddingHorizontal={10} 
                        marginTop={11} marginRight={2}/>
                        </TouchableOpacity>
                    })
                }
                </View>
                <View>
                    <Text style={styles.content}>{news.content}</Text>
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

// const NewsLayout: React.FC<NewsLayoutProps> = (props) => {
//     const Stack = createStackNavigator();
//     const [news, setNews] = React.useState(props.route.params.news);

//     React.useEffect(() => {
//         setNews(props.route.params.news);
//     }, [props.route.params.news])

//     return(
//         <Stack.Navigator screenOptions={{
//             header: ({ scene, previous, navigation }) => {
//                 return null;
//             }
//         }}>
//             <Stack.Screen name="NewsPage" component={() => <NewsScreen news={news}/>} />
//             <Stack.Screen name="Timeline" component={TimelineLayout} />
//         </Stack.Navigator>
//     );
// }

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