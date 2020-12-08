import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export interface BackIconProps {
    color: string;
    size: number;
    onPress: any;
}

const BackIcon: React.FC<BackIconProps> = (props) => {
    return(
        <AntDesign onPress={props.onPress} name="left" size={props.size} color={props.color}/>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default BackIcon;