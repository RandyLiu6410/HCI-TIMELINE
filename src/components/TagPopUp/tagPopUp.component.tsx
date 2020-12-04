import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomText from '../CustomText/customText.component';
import GridRow from '../GridRow/gridRow.component';
import IconButton from '../Button/iconButton.component';

export interface TagPopUpProps {
  sheetRef: React.MutableRefObject<null>;
  title: string;
  tags: string[];
}

const TagPopUp: React.FC<TagPopUpProps> = (props) => {
    const [value, onChangeText] = React.useState("");

    const renderContent = () => (
        <View
          style={styles.container}
        >
          <Text style={styles.newstitle}>{props.title}</Text>
          <CustomText text="Suggested Tag" fontSize={18} width={150}/>
          <GridRow tagName="US Election"/>
          <GridRow tagName="Biden"/>
          <GridRow tagName="Trump"/>
          <GridRow tagName="US"/>
          <View style={styles.textField}>
            <Text style={styles.hash}>#</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="create your tag"
              placeholderTextColor="#828282"
              onChangeText={text => onChangeText(text)}
              value={value}/>
            <IconButton style={styles.checkButton} icon="check" size={24} color="white"/>
          </View>
        </View>
      );

    return(
      <BottomSheet
        ref={props.sheetRef}
        snapPoints={[550, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={1}
      />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222222",
        minHeight: 450,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25
    },
    newstitle: {
        fontSize: 12,
        lineHeight: 16,
        color: "#FFFFFF",
        width: "80%",
        alignSelf: "center",
        margin: 10,
    },
    title: {
      marginLeft: 45
    },
    textField: {
      flexDirection: "row",
      width: "100%",
      marginTop: 10,
      top: 50
    },
    hash: {
      color: "#F4B400",
      fontWeight: "bold",
      fontSize: 24,
    },
    textInput: {
      color: "#FFFFFF",
      marginLeft: 10,
      fontSize: 24,
    },
    checkButton: {
      left: 10
    }
});

export default TagPopUp;