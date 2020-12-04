import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface GridRowProps {
    tagName: string;
}

const GridRow: React.FC<GridRowProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default GridRow;