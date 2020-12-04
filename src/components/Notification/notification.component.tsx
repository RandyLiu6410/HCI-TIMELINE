import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function Notification() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

Notification.defaultProps = {
};
  
Notification.propTypes = {
    tagName: PropTypes.string.isRequired
};