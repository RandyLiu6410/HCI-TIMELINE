import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";
import TagIcon from '../../Icon/tag.component';

export default function AddTagButton() {
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

AddTagButton.defaultProps = {
    icon: TagIcon
};
  
AddTagButton.propTypes = {
    icon: PropTypes.func.isRequired
};