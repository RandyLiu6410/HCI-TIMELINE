import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainCard from '../../components/Card/MainCard/mainCard.component';
import Constants from 'expo-constants';
import TagPopUp from '../../components/TagPopUp/tagPopUp.component';

const DATA = [
    {
        id: "1",
        source: "Newsweek",
        title: "Obama Says Biden's Margin of Victory Over Trump Is Bigger than Trump's Margin Over Clinton in 2016",
        context: ["1", "2", "3"],
        postTime: 1607302800000,
        country: 'US',
        tags: ["US Election", "US", "Biden", "Trump"],
        type: 'politics',
        images: [{
            src: 'https://d.newsweek.com/en/full/1670126/barack-obama-biden-trump-hillary-clinton-victory.webp?w=790&f=e909392b408d398c915291964115bcac',
            priority: 0
        }]
    },
    {
        id: "2",
        source: "Reuters",
        title: "Thousands of Thai protesters call for removal of prime minister",
        context: ["1", "2", "3"],
        postTime: 1607317200000,
        tags: ["Thai Protest", "world", "protest"],
        type: 'politics',
        images: [{
            src: 'https://static.reuters.com/resources/r/?m=02&d=20201114&t=2&i=1541209214&r=LYNXMPEGAD0B5&w=780',
            priority: 0
        },
        {
            src: 'https://static.reuters.com/resources/r/?m=02&d=20201114&t=2&i=1541196725&r=LYNXMPEGAD064&w=640',
            priority: 1
        },
        {
            src: 'https://static.reuters.com/resources/r/?m=02&d=20201114&t=2&i=1541196726&r=LYNXMPEGAD065&w=640',
            priority: 1
        }]
    },
    {
        id: "3",
        source: "What’s on Netflix",
        title: "‘Money Heist’ Season 5: Netflix Release Date & What to Expect",
        context: ["1", "2", "3"],
        postTime: 1607328000000,
        tags: ["Netflix", "Money Heist", "God made"],
        type: 'entertainment',
        images: [{
            src: 'https://www-whats--on--netflix-com.cdn.ampproject.org/i/s/www.whats-on-netflix.com/wp-content/uploads/2020/07/money-heist-season-5-netflix-renewal-status-release-date.jpg',
            priority: 0
        },
        {
            src: 'https://www-whats--on--netflix-com.cdn.ampproject.org/i/s/www.whats-on-netflix.com/wp-content/uploads/2020/04/money-heist-season-5-netflix-what-to-expect-release.jpg',
            priority: 1
        }]
    },
  ];

export interface LatestLayoutProps {
    // items: object[];
    onPress: Function;
}

const LatestLayout: React.FC<LatestLayoutProps> = (props) => {
    const Tab = createMaterialTopTabNavigator();
    const sheetRef = React.useRef(null);
    const [news, setNews] = React.useState(DATA[0]);

    const renderItem = DATA.map((item, index) => {
    return <MainCard
        key={index}
        news={item}
        sheetRef={sheetRef}
        onPress={(_news: string[]) => {
            setNews(_news);
            sheetRef.current.snapTo(0);
        }}
    />
    })

    return(
        <View style={styles.container}>
            <ScrollView >
                {renderItem}
            </ScrollView>
            <TagPopUp 
                sheetRef={sheetRef}
                news={news}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   marginTop: Constants.statusBarHeight
    }
});

export default LatestLayout;