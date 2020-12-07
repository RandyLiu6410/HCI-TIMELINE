import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

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
    background: 'black',
    card: 'black',
    text: '#FFFFFF',
    primary: '#7B40DC',
  },
};

export default function App() {
  const sheetRef = React.useRef(null);
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        hasChild={false}
        child="TAGs"
      />
      <NavigationContainer theme={Theme}>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // let iconName;

            // if (route.name === 'Home') {
            //   iconName = focused
            //     ? 'ios-information-circle'
            //     : 'ios-information-circle-outline';
            // } else if (route.name === 'Settings') {
            //   iconName = focused ? 'ios-list-box' : 'ios-list';
            // }

            // You can return any component that you like here!
            return <FontAwesome5 name={route.name} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4D7AEE',
          inactiveTintColor: 'gray',
          showLabel: false
        }}
        >
          <Tab.Screen name="home" component={HomepageLayout} />
          <Tab.Screen name="hashtag" component={TagsLayout} />
          <Tab.Screen name="search" component={SearchLayout} />
          <Tab.Screen name="user" component={ProfileLayout} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* <MainCard
        image=""
        source="Newsweek"
        title="Obama Says Biden's Margin of Victory Over Trump Is Bigger than Trump's Margin Over Clinton in 2016"
        tags="US Election"
        publishedHours={7}
      />
      <NavigationBar/>
      <Button
        title="Open Bottom Sheet"
        onPress={() => sheetRef.current.snapTo(0)}
      />
      <StatusBar style="auto" /> */}
      {/* <TagPopUp 
        sheetRef={sheetRef}
        title="Obama Says Biden's Margin of Victory Over Trump Is Bigger than Trump's Margin Over Clinton in 2016"
        tags={["test1", "test2"]}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
