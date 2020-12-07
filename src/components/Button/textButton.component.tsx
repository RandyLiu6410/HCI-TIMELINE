import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface TextButtonProps {
    text: string;
}

const TextButton: React.FC<TextButtonProps> = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 100,
      backgroundColor: "#424242",
      height: 20,
      width: 60,
      alignContent: "center",
      flexWrap: "wrap",
    },
    text: {
        color: "#E5E5E5",
        alignSelf: "center",
        fontSize: 10,
        textAlign: "center",
        height: 14,
        top: 3,
    }
});

export default TextButton;