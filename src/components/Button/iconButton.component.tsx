import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export interface IconButtonProps {
    style: object;
    icon: string;
    color: string;
    size: number;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
    return(
        <AntDesign name={props.icon} size={props.size} color={props.color} />
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default IconButton;