import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function TagButton() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

TagButton.defaultProps = {
};
  
TagButton.propTypes = {
    tagName: PropTypes.string.isRequired,
};