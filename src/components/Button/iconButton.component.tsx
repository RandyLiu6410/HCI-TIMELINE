import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function IconButton() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

IconButton.defaultProps = {
};
  
IconButton.propTypes = {
    icon: PropTypes.func.isRequired,
};