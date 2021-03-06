import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export interface ConfirmIconProps {
    color: string;
    size: number;
    onPress: any;
}

const ConfirmIcon: React.FC<ConfirmIconProps> = (props) => {
    return(
        <AntDesign onPress={props.onPress} name="check" size={props.size} color={props.color} />
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default ConfirmIcon;