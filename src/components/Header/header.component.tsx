import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function Header() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

Header.defaultProps = {
};
  
Header.propTypes = {
    hasChild: PropTypes.bool.isRequired,
    child: PropTypes.string
};