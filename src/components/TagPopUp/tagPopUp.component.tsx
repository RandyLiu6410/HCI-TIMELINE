import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomText from '../CustomText/customText.component';
import GridRow from '../GridRow/gridRow.component';
import ConfirmIcon from '../Icon/confirm.component';
import NewsModel from '../../model/news.model';

export interface TagPopUpProps {
  sheetRef: React.MutableRefObject<null>;
  news: NewsModel;
  followingTags: any;
  tagAdded: (arg0: string) => void;
}

const TagPopUp: React.FC<TagPopUpProps> = (props) => {
    const [value, onChangeText] = React.useState("");

    var tagsView = props.news.tags.map((t, index) => {
      return <GridRow 
      key={index} 
      tagName={t} 
      following={props.followingTags.filter(tag => tag.tag === t).length > 0}
      onPress={props.tagAdded}/>
    })

    const renderContent = () => (
        <View
          style={styles.container}
        >
          <View style={styles.content}>
            <Text style={styles.newstitle}>{props.news.title}</Text>
            <CustomText text="Suggested Tag" fontSize={18} width={150}/>
            <ScrollView style={styles.scrollView}>
              {tagsView}
            </ScrollView>
            <View style={styles.textField}>
              <Text style={styles.hash}>#</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="create your tag"
                placeholderTextColor="#828282"
                onChangeText={text => onChangeText(text)}
                value={value}/>
                {
                  value !== "" ? 
                  <ConfirmIcon onPress={() => props.tagAdded(`The news has been added to ${value}`)} size={24} color="white"/>
                  :
                  <View />
                }
            </View>
          </View>
        </View>
      );

    return(
      <BottomSheet
        ref={props.sheetRef}
        snapPoints={[300, 200, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={2}
      />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222222",
        height: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    content: {
      margin: 15,
      flexDirection: 'column',
      justifyContent: 'space-between'
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
    scrollView: {
      // flex: 1,
      height: "60%",
    },
    textField: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
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
      width: "80%"
    }
});

export default TagPopUp;