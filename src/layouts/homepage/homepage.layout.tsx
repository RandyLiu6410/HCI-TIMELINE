import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../components/Header/header.component';

import LatestLayout from './latest.layout';
import FollowingLayout from './following.layout';
import LocalsLayout from './locals.layout';
import WorldLayout from './world.layout';

import NewsLayout from '../news/news.layout';
import TimelineLayout from '../timeline/timeline.layout';

import NewsModel from '../../model/news.model';
import LinearGradient from 'react-native-linear-gradient';

import UserContext from '../../services/UserContext';

export interface HomepageLayoutProps {
    // items: object[];
}

function HomeScreen({ navigation }) {
    const Tab = createMaterialTopTabNavigator();
    function latestLayoutComponent() {
        return (
        <UserContext.Consumer>
          {user => (
            <LatestLayout 
            user={user}
            cardOnPress={(news: NewsModel) => {
                navigation.navigate('News', { news: news, user: user });
                addHistory(user.name, news.url);
            }}/>
          )}
        </UserContext.Consumer>
        );
    };

    function followingLayoutComponent() {
        return (
        <UserContext.Consumer>
          {user => (
            <FollowingLayout 
            user={user}
            cardOnPress={(news: NewsModel) => {
                navigation.navigate('News', { news: news, user: user });
                addHistory(user.name, news.url);
            }}/>
          )}
        </UserContext.Consumer>
        );
    };

    function localsLayoutComponent() {
        return (
        <UserContext.Consumer>
          {user => (
            <LocalsLayout 
            user={user}
            cardOnPress={(news: NewsModel) => {
                navigation.navigate('News', { news: news, user: user });
                addHistory(user.name, news.url);
            }}/>
          )}
        </UserContext.Consumer>
        );
    };

    function worldLayoutComponent() {
        return (
        <UserContext.Consumer>
          {user => (
            <WorldLayout 
            user={user}
            cardOnPress={(news: NewsModel) => {
                navigation.navigate('News', { news: news, user: user });
                addHistory(user.name, news.url);
            }}/>
          )}
        </UserContext.Consumer>
        );
    };

    return (
        <View style={styles.container}>
            <Tab.Navigator 
                tabBarOptions={{
                    indicatorStyle: {backgroundColor: '#7B40DC'},
                    labelStyle: {fontSize: 10},
                    style: {backgroundColor: '#101010'}
                }}
                // tabBar={
                // (props) => { 
                //     return ( <LinearGradient colors={['#1DB5FF', '#7B40DC']} start={{x: 1, y: 0}} end={{x: 0, y: 0}}> 
                //     <MaterialTopTabBar {...props} style={{backgroundColor: 'transparent' }} /> 
                //     </LinearGradient> ); 
                // }}
            >
                <Tab.Screen name="Latest" component={latestLayoutComponent}/>
                <Tab.Screen name="Following" component={followingLayoutComponent} />
                <Tab.Screen name="Locals" component={localsLayoutComponent} />
                <Tab.Screen name="World" component={worldLayoutComponent} />
            </Tab.Navigator>
        </View>
    );

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

const HomepageLayout: React.FC<HomepageLayoutProps> = (props) => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator screenOptions={{
            header: ({ scene, previous, navigation }) => {
                return (
                    <Header
                        hasChild={false}
                        child={""}
                        previous={previous}
                        navigation={navigation}
                    />
                );
            }
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="News" component={NewsLayout} />
            <Stack.Screen name="Timeline" component={TimelineLayout} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
});

export default HomepageLayout;