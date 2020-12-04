import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function SearchLayout() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

SearchLayout.defaultProps = {
};
  
SearchLayout.propTypes = {
    tagHistory: PropTypes.array.isRequired,
    history: PropTypes.array.isRequired,
};