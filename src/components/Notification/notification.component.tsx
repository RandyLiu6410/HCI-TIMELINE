import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface NotificationProps {
    tagName: string;
}

const Notification: React.FC<NotificationProps> = (props) => {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default Notification;