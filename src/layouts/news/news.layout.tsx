import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface NewsLayoutProps {
    value: object;
}

const NewsLayout: React.FC<NewsLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default NewsLayout;