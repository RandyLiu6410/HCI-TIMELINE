import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import Header from '../../components/Header/header.component';
import CustomText from '../../components/CustomText/customText.component';
import { createStackNavigator } from '@react-navigation/stack';

import TimelineLayout from '../timeline/timeline.layout';
import NewsLayout from '../news/news.layout';

export interface TagsLayoutProps {
    tags: string[];
}


function TagScreen({ navigation }) {
    const tags = ['US Election', 'Taiwan', 'HK Protest', 'Tokyo Olympic', 'NTU', 'Play Station', 'Election'];
    // const [tag, setTag] = React.useState('');
    
    return(
        <SafeAreaView style={styles.container}>
            <Header
                hasChild={true}
                child={"TAGs"}
                previous={null}
                navigation={navigation}
            />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Tags You Follow</Text>
                <View style={styles.content}>
                    {    
                        tags.map((t, index) => {
                            return(
                                <TouchableOpacity key={index} style={styles.hashWrapper} 
                                onPress={()=>navigation.navigate('Timeline', {tag: t, navigation: navigation})}>
                                    <Text style={styles.hash}>{'# '}</Text>
                                    <Text style={styles.hashContent}>{t}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const TagsLayout: React.FC<TagsLayoutProps> = (props) => {
    
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
            <Stack.Screen name="Tag" component={TagScreen} />
            <Stack.Screen name="Timeline" component={TimelineLayout} />
            <Stack.Screen name="News" component={NewsLayout} />
        </Stack.Navigator>
    );
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