import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import LatestLayout from './latest.layout';
import FollowingLayout from './following.layout';
import LocalsLayout from './locals.layout';
import WorldLayout from './world.layout';

export interface HomepageLayoutProps {
    // items: object[];
}

const HomepageLayout: React.FC<HomepageLayoutProps> = (props) => {
    const Tab = createMaterialTopTabNavigator();

    return(
        <View style={styles.container}>
            <Tab.Navigator 
                tabBarOptions={{
                    indicatorStyle: {backgroundColor: '#7B40DC'},
                    labelStyle: {fontSize: 10},
                    style: {backgroundColor: '#101010'}
                }}
                // tabBar={
                // (props) => { 
                //     return ( <LinearGradient colors={['#1DB5FF', '#7B40DC']} start={[1, 0]} end={[0, 0]}> 
                //     <MaterialTopTabBar {...props} style={{backgroundColor: 'transparent' }} /> 
                //     </LinearGradient> ); 
                // }}
            >
                <Tab.Screen name="Latest" component={LatestLayout} />
                <Tab.Screen name="Following" component={FollowingLayout} />
                <Tab.Screen name="Locals" component={LocalsLayout} />
                <Tab.Screen name="World" component={WorldLayout} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
});

export default HomepageLayout;