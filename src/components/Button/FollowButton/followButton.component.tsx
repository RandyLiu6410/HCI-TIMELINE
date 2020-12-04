import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function FollowButton() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

FollowButton.defaultProps = {
};
  
FollowButton.propTypes = {
    tagName: PropTypes.string.isRequired,
};