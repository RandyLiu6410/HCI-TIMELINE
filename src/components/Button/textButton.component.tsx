import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface TextButtonProps {
    text: string;
}

const TextButton: React.FC<TextButtonProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default TextButton;