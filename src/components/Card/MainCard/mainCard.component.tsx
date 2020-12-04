import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface MainCardProps {
    image: string;
    source: string;
    title: string;
    tags: string;
    publishedHours: number;
}

const MainCard: React.FC<MainCardProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default MainCard;