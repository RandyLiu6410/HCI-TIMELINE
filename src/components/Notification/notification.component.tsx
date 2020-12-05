import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import TextButton from '../Button/textButton.component';

export interface NotificationProps {
    sheetRef: React.MutableRefObject<null>;
    tagName: string;
}

const Notification: React.FC<NotificationProps> = (props) => {
    const renderContent = () => (
        <View
          style={styles.container}
        >
          <Text style={styles.text}>The news has added to "{props.tagName}"</Text>
          <TextButton text="VIEW"/>
        </View>
      );

    return(
        <BottomSheet
            ref={props.sheetRef}
            snapPoints={[250, 0]}
            renderContent={renderContent}
            initialSnap={1}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: 250,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    text: {
        fontSize: 18
    }
});

export default Notification;