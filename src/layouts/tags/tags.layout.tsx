import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface TagsLayoutProps {
    tags: string[];
}

const TagsLayout: React.FC<TagsLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default TagsLayout;