import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export interface TagPopUpProps {
}

const TagPopUp: React.FC<TagPopUpProps> = (props) => {
    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 450,
          }}
        >
          <Text>Swipe down to close</Text>
        </View>
      );

    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222222",
        minHeight: 450,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    newstitle: {
        fontSize: 12,
        lineHeight: 16,
        color: "#FFFFFF"
    },
    title: {
        color: 
    }
});

export default TagPopUp;