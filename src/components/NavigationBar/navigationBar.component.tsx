import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface NavigationBarProps {
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default NavigationBar;