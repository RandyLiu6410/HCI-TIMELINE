import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import NewsModel from '../../model/news.model';
import SimpleCard from '../Card/SimpleCard/simpleCard.component';
import SlideCard from '../Card/SlideCard/slideCard.component';
import TimelineList from 'react-native-timeline-flatlist';

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
        circleSize: 12,
        circleColor: '#828282',
        dotColor: '#828282'
    },
    {
        id: "2",
        source: "Reuters",
        title: "Thousands of Thai protesters call for removal of prime minister",
        content: ["BANGKOK (Reuters) - Thailand’s King Maha Vajiralongkorn told well-wishers of the importance of unity as he marked the opening of a new railway line on Saturday, after thousands of protesters had turned their backs on his motorcade as it passed through central Bangkok.", "Around 2,500 demonstrators had gathered at the capital’s Democracy Monument in the latest of months of protests against Prime Minister Prayuth Chan-ocha, demanding changes to the constitution as well as reforms of the monarchy.", "The protesters draped the centrepiece of the monument, which has become a rallying point for the protests, in a cloth covered in grievances and insults. “Dictatorship be destroyed, democracy shall prosper,” shouted protesters who scaled the three-metre structure.", "As the motorcade carrying the king and Queen Suthida passed by they turned their backs, gave the three-fingered “Hunger Games” salute of pro-democracy campaigners, and sang the national anthem in the latest show of disaffection with the monarchy.", "The king was greeted with a show of support when he arrived at the rail ceremony in the west of the city, where thousands of people had gathered in yellow shirts, waving national flags and chanting “long live the king”.", "“He told me to show children how important the unity of the country is,” said Donnapha Kladbupha, 48, a teacher who posed for selfies with the king.", "The Royal Palace has not commented since the start of the protests, but the king said two weeks ago that the protesters were still loved and that Thailand was a land of compromise.", "“Think well, do good, be hopeful, endure. Have unity in being Thai,” the king wrote on the back of a picture of himself and the queen which had been held up by one supporter.", "The initial focus of protests that began in July was to seek the removal of Prime Minister Prayuth Chan-ocha. But demonstrators have increasingly called for reforms to the monarchy, breaking a long-standing taboo against criticising the institution - an offence punishable with 15 years in jail.", "“Without the people, the government and monarchy will have no power,” said Panusaya Sithijirawattanakul, one of the protest leaders. “Are they willing to take a step back or find a consensus that we can agree on?”"],
        publishedAt: "2020-12-13T23:13:41Z",
        tags: ["Thai Protest", "world", "protest"],
        type: 'politics',
        url: "https://www.youtube.com/watch?v=URYpn8PbEng",
        urlToImage: "https://i.ytimg.com/vi/URYpn8PbEng/maxresdefault.jpg",
        circleSize: 18,
        circleColor: '#FFFFFF',
        dotColor: '#000000'
    },
    {
        id: "3",
        source: "What’s on Netflix",
        title: "‘Money Heist’ Season 5: Netflix Release Date & What to Expect",
        content: ["The international Netflix phenomenon, Money Heist (also known as La Casa De Papel) is officially returning for a fifth and final season on Netflix at some point in 2021. Here’s the latest and everything we know so far about Money Heist season 5, including the path to renewal, its potential release date, production updates, and why we won’t be getting a season 6.", "Money Hiest currently holds the current record of being the most-watched non-English title on Netflix. Once again for the fourth season, the series smashed all of the previous records it set. The fourth part of Money Heist managed to rack up an incredible 65 million views.", "Before we move onto what we know about season 5, you should check out the accompanying documentary released on April 3rd, 2020 called Money Heist: The Phenomenon. It documents the meteoric rise of the series with guests including Ted Sarandos as well as much of the cast and the creators. It gave us some stunning insights including the fact the show was almost axed.", "Part four of Money Heist was released on Netflix globally on April 3rd, 2020, and consisted of eight episodes."],
        publishedAt: "2020-12-13T23:01:00Z",
        tags: ["Netflix", "Money Heist", "God made"],
        type: 'entertainment',
        url: "https://www.nytimes.com/2020/12/13/books/john-le-carre-dead.html",
        urlToImage: "https://static01.nyt.com/images/2019/09/02/obituaries/00carre-toppix/00carre-toppix-facebookJumbo-v2.jpg",
        circleSize: 12,
        circleColor: '#828282',
        dotColor: '#828282'
    }
  ];

export interface TimelineProps {
    tag: string;
    cardOnPress: any;
    user: {name: string};
    followtime: string;
}

const Timeline: React.FC<TimelineProps> = (props) => {
    const [isReady, setIsReady] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [sorteddata, setSorteddata] = React.useState([]);
    const [startIndex, setStartIndex] = React.useState(0);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [isWaiting, setIsWaiting] = React.useState(false);

    if (!isReady) {
        return (
            <AppLoading
              startAsync={_cacheResourcesAsync}
              onFinish={() => setIsReady(true)}
              onError={console.warn}
            />
        )
    }

    function onEventPress(data){
        props.cardOnPress(data)
    }

    function onRefresh(){
        setIsRefreshing(true);
        
        setIsRefreshing(false);
    }

    function onEndReached() {
        if (!isWaiting) {
            setIsWaiting(true);
    
            _cacheResourcesAsync()
            .then(() => setIsWaiting(false));
        }
      }

    function renderTime(rowData) {
        const time = new Date(rowData.publishedAt);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        
        return (
            <View style={{alignItems: 'center', width: 50}}>
                <Text style={styles.year}>{year}/</Text>
                <Text style={styles.date}>{month}/{date}</Text>
                <Text style={styles.time}>{hours < 10 ? '0'+hours.toString() : hours }:{minutes < 10 ? '0'+minutes.toString() : minutes}</Text>
            </View>
        )
    }

    function renderDetail(rowData) {
        if(rowData.data)
        {
            return (
                <SlideCard news={rowData.data} cardOnPress={props.cardOnPress}/>
                // <SimpleCard news={rowData.data[0]}/>
            )
        }
        else
        {
            return (
                <TouchableOpacity onPress={() => props.cardOnPress(rowData)}>
                    <SimpleCard news={rowData}/>
                </TouchableOpacity>
            )
        }
    }

    function renderFooter() {
        if (isWaiting) {
            return <ActivityIndicator />;
        } else {
            return <Text>~</Text>;
        }
    }

    return(
        <View style={styles.container}>
            <TimelineList 
                style={styles.list}
                data={sorteddata}
                circleSize={18}
                dotSize={10}
                dotColor='#000000'
                circleColor='#FFFFFF'
                lineColor='#FFFFFF'
                innerCircle={'dot'}
                timeContainerStyle={{width:52, marginTop: -5}}
                options={{
                    style:{ 
                        paddingTop:5,
                    },
                    refreshControl: (
                        <RefreshControl
                          refreshing={isRefreshing}
                          onRefresh={onRefresh}
                        />
                    ),
                    renderFooter: renderFooter,
                    onEndReached: onEndReached
                }}
                // onEventPress={onEventPress}
                renderTime={renderTime}
                renderDetail={renderDetail}
                rowContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                renderFullLine={true}
            />
        </View>
    );

    async function _cacheResourcesAsync() {
        const cacheNews = await fetch(`http://54.226.5.241:8080/news/tag?tag=${props.tag}&sort=descending&startIndex=${startIndex}&limit=20`)
        .then((res) => {
            return res.json();
        });

        if(props.followtime)
        {
            const cacheHistory = await fetch(`http://54.226.5.241:8080/user/history?username=${props.user.name}`)
            .then((res) => {
                return res.json();
            });

            const indexes = cacheHistory.map(h => {
                return cacheNews.findIndex(n => n.url === h);
            })
            .filter(i => i >= 0)
            .sort((a, b) => {
                return a - b;
            });

            var data_sort = [];

            var start = 0;
            const end = cacheNews.length;

            indexes.map((i, index) => {
                if(i === start)
                {
                    data_sort.push(cacheNews[i]);
                }
                else
                {
                    data_sort.push({
                        publishedAt: cacheNews[start].publishedAt,
                        data: cacheNews.slice(start, i)
                    });
                    data_sort.push(cacheNews[i]);
                }

                start = i + 1;
            })

            if(indexes[indexes.length - 1] !== end - 1)
            {
                data_sort.push({
                    publishedAt: cacheNews[indexes[indexes.length - 1] + 1].publishedAt,
                    data: cacheNews.slice(indexes[indexes.length - 1] + 1, end)
                });
            }

            if(sorteddata.length === 0)
            {
                setSorteddata(data_sort);
            }
            else
            {
                setSorteddata(sorteddata.concat(data_sort));
            }
        }
        else
        {
            if(sorteddata.length === 0)
            {
                setSorteddata(cacheNews);
            }
            else
            {
                setSorteddata(sorteddata.concat(cacheNews));
            }
        }
        
        setStartIndex(startIndex + 20);

        return cacheNews;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000000'
    },
    list: {
        flex: 1,
        backgroundColor: '#000000'
    },
    detailContainerStyle: {
        paddingHorizontal: 5,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#141414',
        borderColor: 'gray',
        borderWidth: 0.5
    },
    year: {
        color: '#FFFFFF',
        fontSize: 10
    },
    date: {
        color: '#FFFFFF',
        fontSize: 16
    },
    time: {
        color: '#FFFFFF',
        fontSize: 10
    }
});

export default Timeline;