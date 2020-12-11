import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { accessibilityProps } from 'react-native-paper/lib/typescript/src/components/MaterialCommunityIcon';

export interface TextButtonProps {
    text: string;
    fontSize: number;
    paddingVertical: number;
    marginTop: number;
    // onPress: any;
}

const TextButton: React.FC<TextButtonProps> = (props) => {
    return(
        // <View style={styles.container}>
        // <TouchableOpacity onPress={props.onPress}>
            <Text style={styles(props).container}>{props.text}</Text>
        // </TouchableOpacity>
        // </View>
    );
}

const styles = (props?: any) => StyleSheet.create({
    container: {
        borderRadius: 100,
        backgroundColor: "#424242",
        alignContent: "center",
        justifyContent: "center",
        color: "#E5E5E5",
        fontSize: props.fontSize,
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: props.paddingVertical,
        marginHorizontal: 5,
        marginTop: props.marginTop,
        marginBottom: 17,
        maxWidth: 200,
        minWidth: 60,
    }
});

export default TextButton;