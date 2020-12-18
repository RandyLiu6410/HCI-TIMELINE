import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../components/Header/header.component';
import { SearchBar } from 'react-native-elements';
// import { color } from 'react-native-reanimated';
import TextButton from '../../components/Button/textButton.component';
import MoreIcon from '../../components/Icon/more.component';
import SearchCard from '../../components/Card/SearchCard/searchCard.component';

import NewsLayout from '../news/news.layout';

export interface SearchLayoutProps {
    tagHistory: string[];
    history: string[];
    // showMore: () => void;
}

function SearchScreen({ navigation }) {
    const [search, changeText] = React.useState('');
    const [more, setMore] = React.useState(false);
    const [result, setResult] = React.useState([]);
    const [startIndex, setStartIndex] = React.useState(0);
    const tags = ['US Election', 'Taiwan', 'HK Protest', 'Tokyo Olympic', 'NTU', 'Play Station', 'Election', 'Thailand Protest',
    'Covid-19', 'China', 'Covid-19 Vaccines'];
    const keywords = ['money heist', 'buy mask', 'windows update', 'airpods max'];

    // function doSearch(search) {
    //     changeText(search)
    // }
    
    return(
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
                onSubmitEditing={() => _cacheResourcesAsync()}
                value={search}
                // clearIcon={false}
                containerStyle={styles.searchBarContainer}
                // inputContainerStyle={styles.inputContainer}
            />
            <ScrollView 
                scrollEventThrottle={400}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        _cacheResourcesAsync();
                    }
                }}
                style={styles.scrollView}
            >
                <React.Fragment>
                    {
                        search !== '' ? 
                        <View>
                            {
                                result.map(r => {
                                    return <TouchableOpacity onPress={() => navigation.navigate('News', { news: r })}>
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
                                tags.map((t, index) => {
                                    return (
                                    <TouchableOpacity onPress={()=>changeText(t)}>
                                        <TextButton key={index} text={'# ' + t} fontSize={14} paddingVertical={6} paddingHorizontal={10} marginTop={0} 
                                        marginLeft={''} marginRight={0}/>
                                    </TouchableOpacity>
                                    )
                                })
                                :
                                tags.slice(0,5).map((t, index) => {
                                    return (
                                    <TouchableOpacity onPress={()=>changeText(t)}>
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
                                <TouchableOpacity onPress={()=>{setMore(true)}}>
                                    <MoreIcon size={20} color={'#C4C4C4'}></MoreIcon>
                                </TouchableOpacity>
                            }
                            </View>
                            {    
                                keywords.map((t, index) => {
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
    );

    async function _cacheResourcesAsync() {
        const cacheNews = await fetch(`http://localhost:8080/news/keywords?keyWord=${search}&sort=descending&startIndex=${startIndex}&limit=20`)
        .then((res) => {
            return res.json();
        })
        
        if(result.length === 0)
        {
            setResult(cacheNews);
        }
        else
        {
            setResult(result.concat(cacheNews));
        }
        
        setStartIndex(startIndex + 20);

        return cacheNews;
    }

    function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
}

const SearchLayout: React.FC<SearchLayoutProps> = (props) => {
    
    // var tagList = props.tags.map((t, index) => {
    //     return <GridRow key={index} tagName={t}/>
    // })
    const Stack = createStackNavigator();
    
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
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="News" component={NewsLayout} />
        </Stack.Navigator>
    );
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