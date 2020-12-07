import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ProfileLayoutProps {
    tagHistory: string[];
    history: string[];
}

const ProfileLayout: React.FC<ProfileLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default ProfileLayout;