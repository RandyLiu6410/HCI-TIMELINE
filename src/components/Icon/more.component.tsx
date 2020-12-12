import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface MoreIconProps {
    color: string;
    size: number;
}

const MoreIcon: React.FC<MoreIconProps> = (props) => {
    return(
        <Feather name="more-horizontal" size={props.size} color={props.color}/>
    );
}

const styles = StyleSheet.create({
    container: {
      marginLeft: 21
    },
});

export default MoreIcon;