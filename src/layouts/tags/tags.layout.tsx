import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header/header.component';

export interface TagsLayoutProps {
    tags: string[];
}

const TagsLayout: React.FC<TagsLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
            <Header
                hasChild={true}
                child={"TAGs"}
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

export default TagsLayout;