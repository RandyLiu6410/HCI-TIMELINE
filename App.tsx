import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Dimensions, processColor } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';

import HomepageLayout from './src/layouts/homepage/homepage.layout';
import TagsLayout from './src/layouts/tags/tags.layout';
import SearchLayout from './src/layouts/search/search.layout';
import ProfileLayout from './src/layouts/profile/profile.layout';

import Header from './src/components/Header/header.component';
import TabBar from './src/components/TabBar/tabBar.component';
import NavigationBar from './src/components/NavigationBar/navigationBar.component';
import TagPopUp from './src/components/TagPopUp/tagPopUp.component';
import MainCard from './src/components/Card/MainCard/mainCard.component';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#101010',
    // card: 'black',
    text: '#FFFFFF',
    primary: '#7B40DC',
    border: '#101010'
  },
};

export default function App() {
  const [mainRoute, setMainRoute] = React.useState(true);
  const [routeChild, setRouteChild] = React.useState('');
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header
        hasChild={!mainRoute}
        child={routeChild}
      /> */}
      <NavigationContainer theme={Theme}>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // let iconName;

            // if (route.name === 'home' && focused) {
            //   console.log('home')
            // } else {
            //   console.log('other')
            // }

            // You can return any component that you like here!
            return <FontAwesome5 name={route.name} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: '#4D7AEE',
          inactiveTintColor: 'gray',
          showLabel: false,
          style: {backgroundColor: '#101010'}
        }}
        >
          <Tab.Screen name="home" component={HomepageLayout} listeners={{
            focus: e => {
              setMainRoute(true);
            }
          }}/>
          <Tab.Screen name="hashtag" component={TagsLayout} listeners={{
            focus: e => {
              setMainRoute(false);
              setRouteChild("TAGs");
            }
          }}/>
          <Tab.Screen name="search" component={SearchLayout} listeners={{
            focus: e => {
              setMainRoute(false);
              setRouteChild("SEARCH");
            }
          }}/>
          <Tab.Screen name="user" component={ProfileLayout} listeners={{
            focus: e => {
              setMainRoute(false);
              setRouteChild("USER");
            }
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    // height: Dimensions.get('window').height
    // top: Constants.statusBarHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
