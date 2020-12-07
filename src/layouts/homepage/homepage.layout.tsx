import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
            <Tab.Navigator>
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
      
    },
});

export default HomepageLayout;