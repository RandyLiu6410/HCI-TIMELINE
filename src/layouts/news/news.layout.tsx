import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function NewsLayout() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

NewsLayout.defaultProps = {
};
  
NewsLayout.propTypes = {
    value: PropTypes.object.isRequired
};