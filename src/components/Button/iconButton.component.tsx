import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export interface IconButtonProps {
    icon: string;
    color: string;
    size: number;
    onPress: any;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
    return(
        <AntDesign onPress={props.onPress} name={props.icon} size={props.size} color={props.color} />
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default IconButton;