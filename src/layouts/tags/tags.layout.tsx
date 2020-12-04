import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function TagsLayout() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

TagsLayout.defaultProps = {
};
  
TagsLayout.propTypes = {
    tags: PropTypes.array.isRequired
};