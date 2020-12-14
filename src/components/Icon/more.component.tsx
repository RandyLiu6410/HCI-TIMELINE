import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface MoreIconProps {
    color: string;
    size: number;
}

const MoreIcon: React.FC<MoreIconProps> = (props) => {
    return(
        <View style={styles.container}>
            <Feather name="more-horizontal" size={props.size} color={props.color}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginLeft: 15
    },
});

export default MoreIcon;