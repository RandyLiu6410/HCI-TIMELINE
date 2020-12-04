import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface SearchLayoutProps {
    tagHistory: string[];
    history: string[];
}

const SearchLayout: React.FC<SearchLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default SearchLayout;