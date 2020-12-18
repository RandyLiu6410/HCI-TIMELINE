import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomText from '../CustomText/customText.component';
import { RadioButton } from 'react-native-paper';

export interface SortPopUpProps {
    sheetRef: React.MutableRefObject<null>;
    sortChanged: () => void
}

const SortPopUp: React.FC<SortPopUpProps> = (props) => {
    const [checked, setChecked] = React.useState('new');

    function checkOnChange(status) {
        setChecked(status)
        props.sortChanged()
    }

    const renderContent = () => (
        <View style={styles.container}>
            <View style={styles.content}>
                <RadioButton
                    value="new"
                    status={ checked === 'new' ? 'checked' : 'unchecked' }
                    onPress={() => checkOnChange('new')}
                />
                <RadioButton
                    value="old"
                    status={ checked === 'old' ? 'checked' : 'unchecked' }
                    onPress={() => checkOnChange('old')}
                />
            </View>
        </View>
      );

    return(
      <BottomSheet
        ref={props.sheetRef}
        snapPoints={[300, 200, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={0}
        onOpenStart={() => {
        //   setTags(props.news.tags);
          console.log('click')
        }}
        onCloseEnd={() => {
        //   onChangeText('');
          // sheetRef.current.snapTo(1);
        }}
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
    
});

export default SortPopUp;