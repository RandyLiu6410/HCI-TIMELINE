import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function HomepageLayout() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

HomepageLayout.defaultProps = {
};
  
HomepageLayout.propTypes = {
    items: PropTypes.array.isRequired
};