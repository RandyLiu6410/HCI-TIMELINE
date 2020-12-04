import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface SlideCardProps {
    image: string;
    source: string;
    title: string;
    tags: string;
    publishedHours: number;
}

const SlideCard: React.FC<SlideCardProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default SlideCard;