import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import NewsModel from '../../model/news.model';
import SimpleCard from '../Card/SimpleCard/simpleCard.component';
import SlideCard from '../Card/SlideCard/slideCard.component';
import TimelineList from 'react-native-timeline-flatlist';

export interface TimelineProps {
    customtag: boolean;
    tag: string;
    cardOnPress: any;
    user: {name: string};
    followtime: string;
    sort: string;
}

const Timeline: React.FC<TimelineProps> = (props) => {
    const [isReady, setIsReady] = React.useState(false);
    const [fetchData, setFetchData] = React.useState({
        sorteddata: [],
        startIndex: 0
    });
    // const [startIndex, setStartIndex] = React.useState(0);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [isWaiting, setIsWaiting] = React.useState(false);

    React.useEffect(() => {
        if(fetchData.startIndex !== 0)
        {
            setFetchData({
                sorteddata: [],
                startIndex: 0
            })
        }
    }, [props.sort]);

    React.useEffect(() => {
        if(fetchData.startIndex === 0)
        {
            _cacheResourcesAsync();
        }
    }, [fetchData.startIndex])

    if (!isReady) {
        return (
            <AppLoading
              startAsync={() => _cacheResourcesAsync()}
              onFinish={() => setIsReady(true)}
              onError={console.warn}
            />
        )
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
                data={fetchData.sorteddata}
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
        const cacheNews = !props.customtag ? await fetch(`http://54.226.5.241:8080/news/tag?tag=${props.tag}&sort=${props.sort === 'new' ? 'descending' : 'ascending'}&startIndex=${fetchData.startIndex}&limit=20`)
        .then((res) => res.json())
        .then(data => {
            return data;
        })
        :
        await fetch(`http://54.226.5.241:8080/news/keywords?keyWord=${props.tag}&sort=${props.sort === 'new' ? 'descending' : 'ascending'}&startIndex=${fetchData.startIndex}&limit=20`)
        .then((res) => res.json())
        .then(data => {
            return data;
        })

        const indexes = await fetch(`http://54.226.5.241:8080/user/history?username=${props.user.name}`)
        .then((res) => res.json())
        .then(history => {
            const _indexes = history.map(h => {
                return cacheNews.findIndex(n => n.url === h);
            })
            .filter(i => i >= 0)
            .sort((a, b) => {
                return a - b;
            });

            return _indexes;
        })

        if(props.followtime)
        {
            if(indexes.length > 0)
            {
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
                    console.log(indexes)
                    console.log(cacheNews[indexes[indexes.length - 1] + 1])
                    data_sort.push({
                        publishedAt: cacheNews[indexes[indexes.length - 1] + 1].publishedAt,
                        data: cacheNews.slice(indexes[indexes.length - 1] + 1, end)
                    });
                }

                if(fetchData.sorteddata.length === 0)
                {
                    setFetchData({
                        sorteddata: data_sort,
                        startIndex: fetchData.startIndex + 20
                    })
                }
                else
                {
                    setFetchData({
                        sorteddata: fetchData.sorteddata.concat(data_sort),
                        startIndex: fetchData.startIndex + 20
                    })
                }
            }
            else
            {
                var data_sort = [];

                data_sort.push({
                    publishedAt: cacheNews[0].publishedAt,
                    data: cacheNews
                })

                if(fetchData.sorteddata.length === 0)
                {
                    setFetchData({
                        sorteddata: data_sort,
                        startIndex: fetchData.startIndex + 20
                    })
                }
                else
                {
                    setFetchData({
                        sorteddata: fetchData.sorteddata.concat(data_sort),
                        startIndex: fetchData.startIndex + 20
                    })
                }
            }
        }
        else
        {
            if(fetchData.sorteddata.length === 0)
            {
                setFetchData({
                    sorteddata: cacheNews,
                    startIndex: fetchData.startIndex + 20
                })
            }
            else
            {
                setFetchData({
                    sorteddata: fetchData.sorteddata.concat(cacheNews),
                    startIndex: fetchData.startIndex + 20
                })
            }
        }

        return cacheNews;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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