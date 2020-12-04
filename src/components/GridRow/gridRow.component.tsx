import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from '../Button/textButton.component';

export interface GridRowProps {
    tagName: string;
}

const GridRow: React.FC<GridRowProps> = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.tag}># {props.tagName}</Text>
            <TextButton text="FOLLOW"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    tag: {
        color: "#FFFFFF"
    }
});

export default GridRow;