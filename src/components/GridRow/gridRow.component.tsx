import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function GridRow() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

GridRow.defaultProps = {
};
  
GridRow.propTypes = {
    tagName: PropTypes.string.isRequired
};