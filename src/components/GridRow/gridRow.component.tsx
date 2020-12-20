import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TextButton from '../Button/textButton.component';
import UserContext from '../../services/UserContext';

export interface GridRowProps {
    tagName: string;
    following: boolean;
    onPress: any;
}

const GridRow: React.FC<GridRowProps> = (props) => {

    return(
        <UserContext.Consumer>
            {user => (
                <View style={styles.container}>
                    <Text style={styles.tag}># {props.tagName}</Text>
                    <TouchableOpacity 
                    style={props.following ? styles.disablebutton : styles.button} 
                    disabled={props.following}
                    onPress={() => {
                        followTag(user.name, props.tagName);
                    }}
                    >
                        <Text>{props.following ? "FOLLOWING" : "FOLLOW"}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </UserContext.Consumer>
    );

    async function followTag(username: string, tag: string) {
        await fetch(`http://54.226.5.241:8080/user/followtags?username=${username}&tag=${tag}`, {
          method: 'POST'
        })
        .then((res) => {
            if(res.ok)
            {
                props.onPress(`You are now following ${props.tagName}`);
            }
        })
        .catch((err) => {
        })
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    tag: {
        color: "#FFFFFF"
    },
    disablebutton: {
        borderRadius: 100,
        backgroundColor: "#424242",
        alignContent: "center",
        justifyContent: "center",
        color: "#E5E5E5",
        fontSize: 10,
        textAlign: "center",
        paddingVertical: 2,
        paddingHorizontal: 2,
        marginHorizontal: 5,
        marginBottom: 17,
    },
    button: {
        borderRadius: 100,
        backgroundColor: "#424242",
        alignContent: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontSize: 10,
        textAlign: "center",
        paddingVertical: 2,
        paddingHorizontal: 2,
        marginHorizontal: 5,
        marginBottom: 17,
    }
});

export default GridRow;