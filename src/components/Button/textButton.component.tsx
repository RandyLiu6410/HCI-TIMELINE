import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function TextButton() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

TextButton.defaultProps = {
};
  
TextButton.propTypes = {
    text: PropTypes.string.isRequired,
};