import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IconButtonProps {
    icon: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default IconButton;