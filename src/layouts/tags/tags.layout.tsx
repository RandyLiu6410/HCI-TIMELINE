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
    
    return(
        <UserContext.Consumer>
        {user => (
            <View style={styles.container}>
                <Header
                    hasChild={true}
                    child={"TAGs"}
                    previous={null}
                />
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
                    {/* <Text style={styles.title}>Tags You Made</Text>
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
                        
                    </View> */}
                </ScrollView>
            </View>
        )}
        </UserContext.Consumer>
    );
}

const TagsLayout: React.FC<TagsLayoutProps> = (props) => {
    const navigation = useNavigation();

    const Stack = createStackNavigator();

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

    function TagsScreenComponent() {
        return (
            <TagsScreen tags={tags} customTags={customTags} />
        );
    };
    
    return(
        <Stack.Navigator screenOptions={{
            header: ({ scene, previous, navigation }) => {
                return (
                    <></>
                );
                
            }
        }}>
            <Stack.Screen name="Tag" component={TagsScreenComponent} />
            <Stack.Screen name="Timeline" component={TimelineLayout} />
            <Stack.Screen name="News" component={NewsLayout} />
        </Stack.Navigator>
    );

    async function _cacheResourcesAsync(_username: string) {
        navigation.addListener('focus', async () => {
            _cacheResourcesAsync(_username);
        });
        
        const cache = await fetch(`http://54.226.5.241:8080/user/followtags/?username=${_username}`)
        .then((res) => res.json())
        .then(data => setTags(data));

        const cache1 = await fetch(`http://54.226.5.241:8080/user/customtags/?username=${_username}`)
        .then((res) => res.json())
        .then(data => setCustomTags(data));

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