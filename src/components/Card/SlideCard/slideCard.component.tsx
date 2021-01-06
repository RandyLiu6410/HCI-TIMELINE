import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Headline } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import NewsModel from '../../../model/news.model';

import moment from 'moment';

import MoreIcon from '../../Icon/more.component';
import { CardStyleInterpolators } from '@react-navigation/stack';

const SLIDER_HEIGHT = Dimensions.get('window').height * 0.3;
const SLIDER_WIDTH = Dimensions.get('window').width * 0.7;
const ITEM_WIDTH = Math.round(Dimensions.get('window').width * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

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

export interface SlideCardProps {
    news: NewsModel[];
    cardOnPress: any;
}

const SlideCard: React.FC<SlideCardProps> = (props) => {
    const [data, setData] = React.useState(props.news);
    const carouselRef = React.useRef(null);

    function renderItem({item, index}: {item: NewsModel, index: number}) {
        const date = new Date(item.publishedAt);
        const time = (new Date()).getTime() - date.getTime();

        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => props.cardOnPress(item)}>
                    <Card style={styles.card} >
                        <View style={styles.content}>
                            <Card.Content style={{width: '70%'}}>
                                <Title style={styles.source}>{item.source}</Title>
                                <Headline style={styles.title}>{item.title.length >= 100 ? item.title.slice(0, 101) + '...' : item.title }</Headline>
                            </Card.Content>
                            <Card.Cover style={styles.image} source={{ uri: item.urlToImage }} />
                        </View>
                        <Card.Content style={styles.tags}>
                            {
                                item.tags.slice(0, 2).map((t: string, index: number) => {
                                    return <Text key={index} style={styles.tag} >{'# ' + t}</Text>
                                })
                            }
                            {
                                item.tags.length > 2
                                ?
                                <Text style={styles.more}>...</Text>
                                :
                                <></>
                            }
                        </Card.Content>
                        <Card.Content style={styles.footer}>
                            <Paragraph style={styles.time}>{moment(date).format('YYYY/MM/DD hh:mm')}</Paragraph>
                            {
                                time > 24 * 3600000
                                ?
                                <Paragraph style={styles.time}>{Math.round(time / 3600000 / 24)}
                                {
                                    Math.round(time / 3600000 / 24) > 1
                                    ?
                                    " days ago"
                                    :
                                    " day ago"
                                }
                                </Paragraph>
                                :
                                <Paragraph style={styles.time}>{Math.round(time / 3600000)} 
                                {
                                    Math.round(time / 3600000) > 1
                                    ?
                                    " hours ago"
                                    :
                                    " hour ago"
                                }
                                </Paragraph>
                            }
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Carousel
              ref={carouselRef}
              data={data}
              renderItem={renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
            //   sliderHeight={SLIDER_HEIGHT}
            //   itemHeight={ITEM_HEIGHT}
            //   scrollInterpolator={scrollInterpolator}
            //   slideInterpolatedStyle={animatedStyles}
              layout={'stack'}
              layoutCardOffset={9}
            />
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
        width: "90%",
        height: 180,
        backgroundColor: "#141414",
        borderColor: '#7B40DC',
        borderWidth: 1,
        borderRadius: 10,
        flexWrap: 'wrap'
    },
    content: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        height: 100
    },
    image: {
        resizeMode: 'contain',
        width: '30%',
        height: '100%',
        flexShrink: 0.5
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
        marginTop: 10
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
    more: {
        fontSize: 10, 
        color: '#C4C4C4'
    },
    time: {
        // fontFamily: "Noto Sans",
        fontSize: 10,
        color: "#828282",
    },
    footer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default SlideCard;