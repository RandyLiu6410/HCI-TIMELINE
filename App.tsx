import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './src/components/Header/header.component';
import TabBar from './src/components/TabBar/tabBar.component';
import NavigationBar from './src/components/NavigationBar/navigationBar.component';
import TagPopUp from './src/components/TagPopUp/tagPopUp.component';
import MainCard from './src/components/Card/MainCard/mainCard.component';

export default function App() {
  const sheetRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Header
        hasChild={false}
        child="TAGs"
      />
      <TabBar/>
      <MainCard
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
      <StatusBar style="auto" />
      <TagPopUp 
        sheetRef={sheetRef}
        title="Obama Says Biden's Margin of Victory Over Trump Is Bigger than Trump's Margin Over Clinton in 2016"
        tags={["test1", "test2"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
