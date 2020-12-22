import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header/header.component';
import CustomText from '../../components/CustomText/customText.component';
import { createStackNavigator } from '@react-navigation/stack';

import TimelineLayout from '../timeline/timeline.layout';
import NewsLayout from '../news/news.layout';

import UserContext from '../../services/UserContext';
import { AppLoading } from 'expo';

export interface TagsLayoutProps {
    tags: string[];
    customTags: string[];
}

const TagsScreen: React.FC<TagsLayoutProps> = (props) => {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [customTags, setCustomTags] = React.useState([]);
    const [isReady, setIsReady] = React.useState(false);

    // React.useEffect(() => {
    //     if(isReady)
    //     {
    //         const unsubscribe = navigation.addListener('tabPress', () => {
    //             _cacheResourcesAsync(username);
    //           });
          
    //         return unsubscribe;
    //     }
    // }, []);

    // if (!isReady) {
    //     return (
    //         <UserContext.Consumer>
    //         {user => (
    //             <AppLoading
    //                 startAsync={() => _cacheResourcesAsync(user.name)}
    //                 onFinish={() => setIsReady(true)}
    //                 onError={console.warn}
    //             />
    //         )}
    //         </UserContext.Consumer>
    //     )
    // }
    
    return(
        <UserContext.Consumer>
        {user => (
            <SafeAreaView style={styles.container}>
                {/* <Header
                    hasChild={true}
                    child={"TAGs"}
                    previous={null}
                    navigation={navigation}
                /> */}
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>Tags You Follow</Text>
                    <View style={styles.content}>
                        {    
                            props.tags.map((t, index) => {
                                return(
                                    <TouchableOpacity key={index} style={styles.hashWrapper} 
                                    onPress={()=>navigation.navigate('Timeline', {tag: t.tag, followtime: t.followtime, user: user})}>
                                        <Text style={styles.hash}>{'# '}</Text>
                                        <Text style={styles.hashContent}>{t.tag}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        
                    </View>
                    <Text style={styles.title}>Tags You Made</Text>
                    <View style={styles.content}>
                        {    
                            props.customTags.map((t, index) => {
                                return(
                                    <TouchableOpacity key={index} style={styles.hashWrapper} 
                                    onPress={()=>navigation.navigate('Timeline', {customtag: true, tag: t.tag, followtime: t.followtime, user: user})}>
                                        <Text style={styles.hash}>{'# '}</Text>
                                        <Text style={styles.hashContent}>{t.tag}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
        )}
        </UserContext.Consumer>
    );

    async function _cacheResourcesAsync(username: string) {
        setUsername(username);
        
        const cache = await fetch(`http://54.226.5.241:8080/user/followtags/?username=${username}`)
        .then((res) => {
            return res.json();
        })

        setTags(cache);

        const cache1 = await fetch(`http://54.226.5.241:8080/user/customtags/?username=${username}`)
        .then((res) => {
            return res.json();
        })

        setCustomTags(cache1);

        return cache;
    }
}

const TagsLayout: React.FC<TagsLayoutProps> = (props) => {
    const navigation = useNavigation();
    navigation.addListener('focus', async () => {
        _cacheResourcesAsync(username);
    });

    const Stack = createStackNavigator();

    const [username, setUsername] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [customTags, setCustomTags] = React.useState([]);
    const [isReady, setIsReady] = React.useState(false);

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

    // if (isReady)
    // {
    //     React.useEffect(() => {
    //             const unsubscribe = navigation.addListener('focus', async () => {
    //                 _cacheResourcesAsync(username);
    //             });
            
    //             return unsubscribe;
    //     }, [navigation]);
    // }
    
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
            <Stack.Screen name="Tag" component={() => <TagsScreen tags={tags} customTags={customTags} />} />
            <Stack.Screen name="Timeline" component={TimelineLayout} />
            <Stack.Screen name="News" component={NewsLayout} />
        </Stack.Navigator>
    );

    async function _cacheResourcesAsync(_username: string) {
        if(_username !== username)
        {
            setUsername(username);
        }
        
        const cache = await fetch(`http://54.226.5.241:8080/user/followtags/?username=${username}`)
        .then((res) => {
            return res.json();
        })

        setTags(cache);

        const cache1 = await fetch(`http://54.226.5.241:8080/user/customtags/?username=${username}`)
        .then((res) => {
            return res.json();
        })

        setCustomTags(cache1);

        return cache;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        height: "60%",
    },
    title: {
        marginTop: 25,
        marginLeft: 42,
        marginBottom: 29,
        color: '#1DB5FF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    content: {
        // margin: 40,
        marginLeft: 43,
        marginBottom: 29,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    hashWrapper: {
        marginLeft: 10,
        marginBottom: 20,
        flexDirection: 'row'
    },
    hash: {   
        marginRight: 19,
        fontSize: 24,
        color: '#FFFFFF'
    },
    hashContent: {
        paddingVertical: 3,
        fontSize: 20,
        color: '#FFFFFF'
    },
});

export default TagsLayout;