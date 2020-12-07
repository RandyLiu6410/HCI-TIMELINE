import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface TextButtonProps {
    text: string;
}

const TextButton: React.FC<TextButtonProps> = (props) => {
    return(
        // <View style={styles.container}>
            <Text style={styles.container}>{props.text}</Text>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        backgroundColor: "#424242",
        // alignContent: "center",
        color: "#E5E5E5",
        fontSize: 10,
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginHorizontal: 3,
        maxWidth: 100,
        minWidth: 60
    }
});

export default TextButton;