import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function TagPopUp() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

TagPopUp.defaultProps = {
};
  
TagPopUp.propTypes = {
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired
};