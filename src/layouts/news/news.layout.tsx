import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { AppLoading } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
// import Dialog from "react-native-dialog";

import TextButton from '../../components/Button/textButton.component';
import TagIcon from '../../components/Icon/tag.component';
import NewsModel from '../../model/news.model';
import TagPopUp from '../../components/TagPopUp/tagPopUp.component';
import Notification from '../../components/Notification/notification.component';
import ConfirmIcon from '../../components/Icon/confirm.component';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import moment from 'moment';

const win = Dimensions.get('window');
const ratio = win.width / 540;

export interface NewsLayoutProps {
    news: NewsModel;
    user: {name: string};
}

const NewsLayout: React.FC<NewsLayoutProps> = (props) => {
    const news: NewsModel = props.route.params.news;
    const date = new Date(news.publishedAt);
    const time = (new Date()).getTime() - date.getTime();
    // const tagSheetRef = React.useRef(null);
    const notificationSheetRef = React.useRef(null);
    const [notification, setNotification] = React.useState('');
    const [addTag, setAddTag] = React.useState(false);
    const [value, onChangeText] = React.useState("");
    const navigation = useNavigation();

    return(
        <PaperProvider>
            <View style={styles.container}>
                <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                    <Image
                        style={styles.mainImage}
                        source={{
                            uri: news.urlToImage,
                        }}
                        resizeMode= "contain"
                    />
                    <Text style={styles.source}>{news.source}</Text>
                    <Text style={styles.title}>{news.title}</Text>
                    <View style={styles.grid}>
                        <Text style={styles.update}>{moment(date).format('YYYY/MM/DD hh:mm')}</Text>
                        <Text style={styles.update}>Updated {
                                time > 24 * 3600000
                                ?
                                <Text>{Math.round(time / 3600000 / 24)}
                                {
                                    Math.round(time / 3600000 / 24) > 1
                                    ?
                                    " days ago"
                                    :
                                    " day ago"
                                }
                                </Text>
                                :
                                <Text>{Math.round(time / 3600000)} 
                                {
                                    Math.round(time / 3600000) > 1
                                    ?
                                    " hours ago"
                                    :
                                    " hour ago"
                                }
                                </Text>
                            }
                        
                        </Text>
                        
                    </View>
                
                    <Portal>
                        <Dialog visible={addTag} onDismiss={() => {
                            setAddTag(false);
                            onChangeText('');
                            }} style={styles.dialogWrapper}>
                            <Dialog.Content>
                                <View style={styles.textField}>
                                    <Text style={styles.hash}>#</Text>
                                    <TextInput 
                                        style={styles.textInput}
                                        placeholder="Create your tag"
                                        placeholderTextColor="#828282"
                                        onChangeText={text => onChangeText(text)}
                                        />
                                        {
                                            value !== "" ? 
                                            <ConfirmIcon onPress={() => {
                                                fetch(`http://54.226.5.241:8080/user/customtags?username=${props.route.params.user.name}&tag=${value}`, {
                                                method: 'POST'
                                                })
                                                .then((res) => {
                                                    if(res.ok)
                                                    {
                                                        setNotification(`The news has been added to ${value}`)
                                                        notificationSheetRef.current.snapTo(0);

                                                        setTimeout(() => notificationSheetRef.current.snapTo(1), 1000);
                                                        setAddTag(false);
                                                        onChangeText('');
                                                    }
                                                })
                                                .catch((err) => {
                                                })
                                            }} size={24} color="#FFFFFF"/>
                                            :
                                            <View />
                                        }
                                </View>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>
                    
                    <View style={styles.tags}>
                    {
                        news.tags.map((t, index) => {
                            return <TouchableOpacity key={index} onPress={() => navigation.navigate('Timeline', { tag: t, user: props.route.params.user })}>
                            <TextButton text={'# ' + t} fontSize={10} paddingVertical={3} paddingHorizontal={10} 
                            marginTop={11} marginRight={2}/>
                            </TouchableOpacity>
                        })
                    }
                        <TouchableOpacity onPress={()=>setAddTag(true)}>
                            <TextButton text={'+'} fontSize={10} paddingVertical={3} paddingHorizontal={10} 
                                marginTop={11} marginRight={2}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.content}>{news.content}</Text>
                    </View>
                </ScrollView>
                {/* <TagPopUp 
                    sheetRef={tagSheetRef}
                    news={news}
                    user={props.route.params.user}
                    tagAdded={(tagName: string) => {
                        setNotification(tagName);
                        tagSheetRef.current.snapTo(2);
                        notificationSheetRef.current.snapTo(0);

                        setTimeout(() => notificationSheetRef.current.snapTo(1), 1000);
                    }}
                /> */}
                <Notification sheetRef={notificationSheetRef} message={notification}/>
            </View>
        </PaperProvider>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        marginHorizontal: 20
    },
    mainImage: {
        width: win.width,
        height: ratio * 360,
        alignSelf: "stretch",
        flex: 1
    },
    source: {
        fontSize: 10,
        color: "#C1C1C1",
        marginTop: -5,
        marginBottom: 5
    },
    title: {
        fontSize: 18,
        color: "#FFFFFF",
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    update: {
        fontSize: 10,
        color: "#828282",
        marginBottom: 10,
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    dialogWrapper: {
        backgroundColor: '#222222',
        // flex: 1,
        // width: 100,
        // height: 50
    },
    dialog: {
        backgroundColor: '#222222',
    },
    addTag: {
        backgroundColor: '#000000',
        width: '100%', 
        height: '100%', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    content: {
        fontSize: 18,
        color: "#FFFFFF",
        marginVertical: 10
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

export default NewsLayout;