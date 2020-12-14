import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import Header from '../../components/Header/header.component';
import { SearchBar } from 'react-native-elements';
// import { color } from 'react-native-reanimated';
import TextButton from '../../components/Button/textButton.component';
import MoreIcon from '../../components/Icon/more.component';

export interface SearchLayoutProps {
    tagHistory: string[];
    history: string[];
    // showMore: () => void;
}

const SearchLayout: React.FC<SearchLayoutProps> = (props) => {
    const [search, changeText] = React.useState('');
    const [more, setMore] = React.useState(false);
    const tags = ['US Election', 'Taiwan', 'HK Protest', 'Tokyo Olympic', 'NTU', 'Play Station', 'Election', 'Thailand Protest',
    'Covid-19', 'China', 'Covid-19 Vaccines'];
    const keywords = ['money heist', 'buy mask', 'windows update', 'airpods max'];

    console.log(search)

    // function doSearch(search) {
    //     changeText(search)
    // }
    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Header
                    hasChild={true}
                    child={"SEARCH"}
                    previous={null}
                    navigation={null}
                />
                <SearchBar
                    placeholder="Search for keywords or tags"
                    onChangeText={
                        search => changeText(search)
                    }
                    value={search}
                    // clearIcon={false}
                    containerStyle={styles.searchBarContainer}
                    // inputContainerStyle={styles.inputContainer}
                />
                <React.Fragment>
                    {
                        search !== '' ? 
                        <View>
                            
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