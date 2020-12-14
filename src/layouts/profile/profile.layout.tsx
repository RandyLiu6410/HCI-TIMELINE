import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import Header from '../../components/Header/header.component';
import UserAvatar from 'react-native-user-avatar';

export interface ProfileLayoutProps {
    tagHistory: string[];
    history: string[];
}

const ProfileLayout: React.FC<ProfileLayoutProps> = (props) => {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Header
                    hasChild={true}
                    child={"PROFILE"}
                    previous={null}
                    navigation={null}
                />
                <View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        height: '60%'
    }
});

export default ProfileLayout;