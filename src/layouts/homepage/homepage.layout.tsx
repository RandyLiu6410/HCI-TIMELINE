import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface HomepageLayoutProps {
    items: object[];
}

const HomepageLayout: React.FC<HomepageLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default HomepageLayout;