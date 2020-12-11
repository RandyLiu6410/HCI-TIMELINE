import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import Header from '../../components/Header/header.component';
import CustomText from '../../components/CustomText/customText.component';

export interface TagsLayoutProps {
    tags: string[];
}

const TagsLayout: React.FC<TagsLayoutProps> = (props) => {
    // var tagList = props.tags.map((t, index) => {
    //     return <GridRow key={index} tagName={t}/>
    // })
    const tags = ['US Election', 'Taiwan', 'HK Protest', 'Tokyo Olympic', 'NTU', 'Play Station', 'Election'];
    const [tag, setTag] = React.useState('');

    console.log(tag)

    return(
        <View style={styles.container}>
            <Header
                hasChild={true}
                child={"TAGs"}
                previous={null}
                navigation={null}
            />
            <View style={styles.content}>
                <CustomText text="Tags You Follow" width={150} fontSize={18} />
                {/* <Text>Tags You Follow</Text> */}
                <ScrollView style={styles.scrollView}>
                    {/* {tagList} */}
                </ScrollView>
                {    
                    tags.map((t, index) => {
                        return(
                            <TouchableOpacity key={index} style={styles.hashWrapper} onPress={()=>setTag(t)}>
                                <Text style={styles.hash}>{'# '}</Text>
                                <Text style={styles.hashContent}>{t}</Text>
                                {/* <PureTextButton key={index} text={t} fontSize={20} paddingVertical={3} marginTop={11}/> */}
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    title: {
        height: 25,
        marginTop: 3,
        marginLeft: 42,
    },
    content: {
        margin: 40,
        marginLeft: 43,
        marginBottom: 29,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    hashWrapper: {
        marginLeft: 10,
        marginBottom: 20,
        flexDirection: 'row'
    },
    hash: {   
        marginRight: 19,
        fontSize: 24,
        color: '#FFFFFF'
    },
    hashContent: {
        paddingVertical: 3,
        fontSize: 20,
        color: '#FFFFFF'
    },
    scrollView: {
        height: "60%",
    }
});

export default TagsLayout;