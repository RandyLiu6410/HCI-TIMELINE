import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export interface SortIconProps {
    color: string;
    size: number;
    onPress: any;
}

const SortIcon: React.FC<SortIconProps> = (props) => {
    return(
        <MaterialIcons onPress={props.onPress} name="sort" size={props.size} color={props.color}/>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default SortIcon;