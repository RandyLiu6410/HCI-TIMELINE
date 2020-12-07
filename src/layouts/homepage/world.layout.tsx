import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export interface WorldLayoutProps {
    // items: object[];
}

const WorldLayout: React.FC<WorldLayoutProps> = (props) => {
    const Tab = createMaterialTopTabNavigator();

    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default WorldLayout;