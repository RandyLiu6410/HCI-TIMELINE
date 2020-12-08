import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header/header.component';

export interface SearchLayoutProps {
    tagHistory: string[];
    history: string[];
}

const SearchLayout: React.FC<SearchLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
            <Header
                hasChild={true}
                child={"SEARCH"}
                previous={null}
                navigation={null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default SearchLayout;