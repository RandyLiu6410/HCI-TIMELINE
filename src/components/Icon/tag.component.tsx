import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export interface TagIconProps {
    color: string;
    size: number;
    onPress: any;
}

const TagIcon: React.FC<TagIconProps> = (props) => {
    return(
        <Feather onPress={props.onPress} name="hash" size={props.size} color={props.color} />
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default TagIcon;