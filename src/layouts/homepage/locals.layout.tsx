import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainCard from '../../components/Card/MainCard/mainCard.component';
import Constants from 'expo-constants';
import TagPopUp from '../../components/TagPopUp/tagPopUp.component';
import Notification from '../../components/Notification/notification.component';
import NewsModel from '../../model/news.model';
import { AppLoading } from 'expo';

const DATA = [
    {
        id: "1",
        source: "Newsweek",
        title: "Obama Says Biden's Margin of Victory Over Trump Is Bigger than Trump's Margin Over Clinton in 2016",
        content: ["Former President Barack Obama has stated that President-elect Joe Biden's electoral victory over President Donald Trump is greater than Trump's 2016 victory over then-Democratic presidential nominee Hillary Clinton.", "In a clip of a forthcoming interview with Gayle King of CBS Sunday Morning, Obama mentioned how, on Election Night 2016, he called Trump at 2:30 in the morning to congratulate him on his victory.", "\"His margin of victory over Hillary Clinton wasn't greater than Joe Biden's margin over him,\" Obama told King, later adding, \"Joe Biden will be the next president of the United States. Kamala Harris will be the next vice president.\"", "Obama's declaration of Biden's margin of victory, and his assertion that Biden and Harris will lead the upcoming administration contradict Trump and his administration's repeated assertions that Trump won the election and will serve out a second term, a claim repeated this week by White House Press Secretary Kayleigh McEnany and Secretary of State Mike Pompeo."],
        publishedAt: "2020-12-13T23:25:00Z",
        tags: ["US Election", "US", "Biden", "Trump"],
        type: 'politics',
        url: "https://www.politico.com/news/2020/12/13/vandals-black-churches-washington-dc-444940",
        urlToImage: "https://static.politico.com/ab/61/f11f8c744bd29626c37bd5e812c1/20201213-trump-protests-gty-773.jpg",
    }
  ];

export interface LocalsLayoutProps {
    user: {name: string};
    cardOnPress: Function;
}

const LocalsLayout: React.FC<LocalsLayoutProps> = (props) => {
    const Tab = createMaterialTopTabNavigator();
    const tagSheetRef = React.useRef(null);
    const notificationSheetRef = React.useRef(null);
    const [isReady, setIsReady] = React.useState(false);
    const [newsData, setNewsData] = React.useState([]);
    const [news, setNews] = React.useState(DATA[0]);
    const [notification, setNotification] = React.useState('');
    const [startIndex, setStartIndex] = React.useState(0);

    if (!isReady) {
        return (
            <AppLoading
              startAsync={() => _cacheResourcesAsync()}
              onFinish={() => setIsReady(true)}
              onError={console.warn}
            />
        )
    }

    return(
        <View style={styles.container}>
            <ScrollView 
                scrollEventThrottle={400}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        _cacheResourcesAsync();
                    }
                }}
                showsVerticalScrollIndicator={false}
            >
                {
                    newsData.map((item, index) => {
                        return <MainCard
                            key={index}
                            news={item}
                            sheetRef={tagSheetRef}
                            tagOnPress={(_news: NewsModel) => {
                                setNews(_news);
                                tagSheetRef.current.snapTo(0);
                            }}
                            onPress={props.cardOnPress}
                        />
                    })
                }
            </ScrollView>
            <TagPopUp 
                sheetRef={tagSheetRef}
                news={news}
                user={props.user}
                tagAdded={(tagName: string) => {
                    setNotification(tagName);
                    tagSheetRef.current.snapTo(2);
                    notificationSheetRef.current.snapTo(0);
                    
                    setTimeout(() => notificationSheetRef.current.snapTo(1), 1000);
                }}
            />
            <Notification sheetRef={notificationSheetRef} message={notification}/>
        </View>
    );

    async function _cacheResourcesAsync() {
        const cacheNews = await fetch(`http://54.226.5.241:8080/news/keywords?keyWord=Taiwan&sort=descending&startIndex=${startIndex}&limit=20`)
        .then((res) => res.json())
        .then(data => {
            if(newsData.length === 0)
            {
                setNewsData(data);
            }
            else
            {
                setNewsData(newsData.concat(data));
            }

            setStartIndex(startIndex + 20);
        })

        return cacheNews;
    }

    function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   marginTop: Constants.statusBarHeight
    }
});

export default LocalsLayout;