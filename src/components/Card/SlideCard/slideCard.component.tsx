import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

export default function SlideCard() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

SlideCard.defaultProps = {
};
  
SlideCard.propTypes = {
    image: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    publishedHours: PropTypes.number.isRequired
};