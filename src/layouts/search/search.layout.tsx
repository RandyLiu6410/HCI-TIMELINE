import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header/header.component';
import { SearchBar } from 'react-native-elements';
// import { color } from 'react-native-reanimated';
import TextButton from '../../components/Button/textButton.component';
import MoreIcon from '../../components/Icon/more.component';
import SearchCard from '../../components/Card/SearchCard/searchCard.component';

import NewsLayout from '../news/news.layout';
import TimelineLayout from '../timeline/timeline.layout';

import UserContext from '../../services/UserContext';
import { AppLoading } from 'expo';

export interface SearchLayoutProps {
    tags: string[]; 
    keywords: string[];
    initialKeywords: string[];
}

const SearchScreen: React.FC<SearchLayoutProps> = (props) => {
    const navigation = useNavigation();
    const [search, changeText] = React.useState('');
    const [more, setMore] = React.useState(false);
    const [result, setResult] = React.useState([]);
    const [startIndex, setStartIndex] = React.useState(0);

    function searchHistory(user: {name: string}, search: string) {
        changeText(search);
        navigation.navigate('Timeline', { tag: search, user: user })
        changeText('');

        fetch(`http://54.226.5.241:8080/user/searchhistory?username=${user.name}&tag=${search}`, {
          method: 'POST'
        });
    }
    
    return(
        <UserContext.Consumer>
        {user => (
            <SafeAreaView style={styles.container}>
                <Header
                    hasChild={true}
                    child={"SEARCH"}
                    previous={null}
                    navigation={null}
                />
                <SearchBar
                    placeholder="Search for keywords or tags"
                    onChangeText={ (search) => {
                        setResult([]);
                        changeText(search);
                    }}
                    onSubmitEditing={() => {
                        onSearch();

                        fetch(`http://54.226.5.241:8080/user/searchhistory?username=${user.name}&keyword=${search}`, {
                            method: 'POST'
                        });
                    }}
                    value={search}
                    // clearIcon={false}
                    containerStyle={styles.searchBarContainer}
                    // inputContainerStyle={styles.inputContainer}
                />
                <ScrollView 
                    scrollEventThrottle={400}
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            onSearch();
                        }
                    }}
                    style={styles.scrollView}
                >
                    <React.Fragment>
                        {
                            search !== '' ? 
                            <View>
                                <View style={styles.tags}>
                                {
                                    props.initialKeywords.filter(word => word.toLowerCase().includes(search.toLowerCase()))
                                    .map((word, index) => {
                                        return (
                                            <TouchableOpacity onPress={()=>searchHistory(user, word)}>
                                                <TextButton key={index} text={'# ' + word} fontSize={14} paddingVertical={6} paddingHorizontal={10} marginTop={0} 
                                                marginLeft={''} marginRight={0}/>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                                </View>
                                {
                                    result.map(r => {
                                        return <TouchableOpacity onPress={() => {
                                            navigation.navigate('News', { news: r, user: user });
                                            addHistory(user.name, r.url);
                                        }}>
                                            <SearchCard news={r}/>
                                        </TouchableOpacity>
                                    })
                                }
                            </View>
                            :
                            <View>
                                <Text style={styles.history}>History</Text>
                                <View style={styles.tags}>
                                {    
                                    more ? 
                                    props.tags.map((t, index) => {
                                        return (
                                        <TouchableOpacity onPress={()=>searchHistory(user, t)}>
                                            <TextButton key={index} text={'# ' + t} fontSize={14} paddingVertical={6} paddingHorizontal={10} marginTop={0} 
                                            marginLeft={''} marginRight={0}/>
                                        </TouchableOpacity>
                                        )
                                    })
                                    :
                                    props.tags.slice(0,5).map((t, index) => {
                                        return (
                                        <TouchableOpacity onPress={()=>searchHistory(user, t)}>
                                            <TextButton key={index} text={'# ' + t} fontSize={14} paddingVertical={6} paddingHorizontal={10} marginTop={0} 
                                            marginLeft={''} marginRight={0}/>
                                        </TouchableOpacity>
                                        )
                                    })
                                }
                                {   
                                    more ?
                                    <></>
                                    :
                                    props.tags.length > 5 ?
                                    <TouchableOpacity onPress={()=>{setMore(true)}}>
                                        <MoreIcon size={20} color={'#C4C4C4'}></MoreIcon>
                                    </TouchableOpacity>
                                    :
                                    <></>
                                }
                                </View>
                                {    
                                    props.keywords.map((t, index) => {
                                        return (
                                        <TouchableOpacity style={styles.keywordWrapper} onPress={()=>changeText(t)}>
                                            <Text key={index} style={styles.keyword}>{t}</Text>
                                        </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        }

                    </React.Fragment>
                </ScrollView>
            </SafeAreaView>
        )}
        </UserContext.Consumer>
    );

    async function onSearch() {
        const cacheNews = await fetch(`http://54.226.5.241:8080/news/keywords?keyWord=${search}&sort=descending&startIndex=${startIndex}&limit=20`)
        .then((res) => res.json())
        .then(data => {
            if(result.length === 0)
            {
                setResult(data);
            }
            else
            {
                setResult(result.concat(data));
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

    async function addHistory(username: string, url: string) {
        await fetch(`http://54.226.5.241:8080/user/history?username=${username}&url=${url}`, {
          method: 'POST'
        })
        .then((res) => {
            res.json().then(m => console.log(m));
        })
        .catch((err) => {
        })
    }
}

const SearchLayout = () => {
    const navigation = useNavigation();

    const Stack = createStackNavigator();

    const [isReady, setIsReady] = React.useState(false);
    const [history, setHistory] = React.useState({});
    const [initialKeywords, setInitialKeywords] = React.useState([]);

    if (!isReady) {
        return (
            <UserContext.Consumer>
            {user => (
                <AppLoading
                startAsync={() => _cacheResourcesAsync(user.name)}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
                />
            )}
            </UserContext.Consumer>
        )
    }

    function SearchScreenComponent() {
        return (
            <SearchScreen tags={history.tags} keywords={history.keywords} initialKeywords={initialKeywords} />
        );
    };

    return(
        <Stack.Navigator screenOptions={{
            header: ({ scene, previous, navigation }) => {
                return (
                    // <Header
                    //     hasChild={true}
                    //     child={"TAGs"}
                    //     previous={previous}
                    //     navigation={navigation}
                    // />
                    <></>
                );
                
            }
        }}>
            <Stack.Screen name="Search" component={SearchScreenComponent} />
            <Stack.Screen name="News" component={NewsLayout} />
            <Stack.Screen name="Timeline" component={TimelineLayout} />
        </Stack.Navigator>
    );

    async function _cacheResourcesAsync(_username: string) {
        navigation.addListener('focus', async () => {
            _cacheResourcesAsync(_username);
        });
        
        const cache = await fetch(`http://54.226.5.241:8080/user/searchhistory/?username=${_username}`)
        .then((res) => res.json())
        .then(data => setHistory(data));

        const cache1 = await fetch(`http://54.226.5.241:8080/news/taglist`)
        .then((res) => res.json())
        .then(data => setInitialKeywords(data));

        return cache;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        height: "60%",
    },
    searchBarContainer: {
        padding: 0,
        color: 'black'
    },
    inputContainer: {
        color: 'black'
    },
    history: {
        marginTop: 26,
        marginLeft: 31,
        height: 13.62,
        fontSize: 10,
        color: '#C4C4C4'
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 17,
        marginBottom: 17,
        marginLeft: 31,
    },
    tagButton: {
        borderRadius: 100,
        backgroundColor: "#424242",
        alignContent: "center",
        justifyContent: "center",
        color: "#E5E5E5",
        fontSize: 14,
        paddingVertical: 6, 
        paddingHorizontal: 10, 
        marginHorizontal: 5,
        marginTop: 0, 
        marginRight: 0,
        marginBottom: 17,
        maxWidth: 200,
        minWidth: 60,
    },
    keywordWrapper: {
        marginTop: 5,
        marginLeft: 31,
    },
    keyword: {
        marginBottom: 17,
        fontSize: 18,
        color: '#C4C4C4'
    }
});

export default SearchLayout;