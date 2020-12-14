import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Timeline from '../../components/Timeline/timeline.component';

export interface TimelineLayoutProps {
    tag: string;
}

const TimelineLayout: React.FC<TimelineLayoutProps> = (props) => {

    return(
        <View style={styles.container}>
            <Timeline />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        marginHorizontal: 20
    },
});

export default TimelineLayout;