import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainCard from '../../components/Card/MainCard/mainCard.component';

export interface LatestLayoutProps {
    // items: object[];
}

const LatestLayout: React.FC<LatestLayoutProps> = (props) => {
    const Tab = createMaterialTopTabNavigator();

    return(
        <View style={styles.container}>
            <MainCard
                image=""
                source="Newsweek"
                title="Obama Says Biden's Margin of Victory Over Trump Is Bigger than Trump's Margin Over Clinton in 2016"
                tags="US Election"
                publishedHours={7}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default LatestLayout;