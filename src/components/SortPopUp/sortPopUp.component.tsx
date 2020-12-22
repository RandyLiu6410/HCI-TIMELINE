import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomText from '../CustomText/customText.component';
import { RadioButton } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons';

export interface SortPopUpProps {
    sheetRef: React.MutableRefObject<null>;
    sortChanged: (arg0: string) => void
}

const SortPopUp: React.FC<SortPopUpProps> = (props) => {
    const [checked, setChecked] = React.useState('descending');

    function checkOnChange(status) {
        setChecked(status)
        props.sortChanged(status)
    }

    const renderContent = () => (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.button}>
                    <RadioButton
                        value="descending"
                        status={ checked === 'descending' ? 'checked' : 'unchecked' }
                        onPress={() => checkOnChange('ascending')}
                    />
                    <Text style={styles.buttonText}>New to Old</Text>
                </View>
                <View style={styles.button}>
                    <RadioButton
                        value="ascending"
                        status={ checked === 'ascending' ? 'checked' : 'unchecked' }
                        onPress={() => checkOnChange('descending')}
                    />
                    <Text style={styles.buttonText}>Old to New</Text>
                </View>
            </View>
        </View>
      );

    return(
      <BottomSheet
        ref={props.sheetRef}
        snapPoints={[150, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={1}
      />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222222",
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    content: {
        margin: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    button: {
        flexDirection: 'row',
        marginTop: 18
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 6.5,
        marginLeft: 30
    }
});

export default SortPopUp;