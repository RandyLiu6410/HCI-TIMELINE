import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header/header.component';

export interface ProfileLayoutProps {
    tagHistory: string[];
    history: string[];
}

const ProfileLayout: React.FC<ProfileLayoutProps> = (props) => {
    return(
        <View style={styles.container}>
            <Header
                hasChild={true}
                child={"PROFILE"}
                previous={null}
                navigation={null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
});

export default ProfileLayout;