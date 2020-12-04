import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface HeaderProps {
    hasChild: boolean;
    child: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default Header;