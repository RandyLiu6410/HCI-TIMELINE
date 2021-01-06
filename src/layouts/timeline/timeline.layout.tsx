import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';
import Timeline from '../../components/Timeline/timeline.component';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../components/Icon/back.component';
import TextButton from '../../components/Button/textButton.component';
import SortIcon from '../../components/Icon/sort.component';
import SortPopUp from '../../components/SortPopUp/sortPopUp.component';

import NewsModel from '../../model/news.model';

export interface TimelineLayoutProps {
}

const TimelineLayout: React.FC<TimelineLayoutProps> = (props) => {
    const tag = props.route.params.tag;
    const followtime = props.route.params.followtime;
    const user = props.route.params.user;
    const customtag = props.route.params.customtag || false;
    const navigation = useNavigation();
    // const sortSheetRef = React.useRef(null);
    const [sort, setSort] = React.useState('new');
    const [following, setFollowing] = React.useState(false);

    function changeSort() {
        // sortSheetRef.current.snapTo(0);
        sort === 'new' ? setSort('old'): setSort('new')
    }

    React.useEffect(() => {
        if(customtag)
        {
            fetch(`http://54.226.5.241:8080/user/checkfollow?username=${user.name}&tag=${tag}&customtag=true`)
            .then((res) => {
                res.json().then(result => setFollowing(result));
            })
            .catch((err) => {
            })
        }
        else
        {
            fetch(`http://54.226.5.241:8080/user/checkfollow?username=${user.name}&tag=${tag}`)
            .then((res) => {
                res.json().then(result => setFollowing(result));
            })
            .catch((err) => {
            })
        }
    }, [following])

    function followTag() {
        // if(customtag)
        // {
        //     fetch(`http://54.226.5.241:8080/user/customtags?username=${user.name}&tag=${tag}`, {
        //       method: 'POST'
        //     })
        //     .then((res) => {
        //         if(res.ok)
        //         {
        //             setFollowing(true)
        //         }
        //     })
        //     .catch((err) => {
        //     })
        // }
        // else
        {
            fetch(`http://54.226.5.241:8080/user/followtags?username=${user.name}&tag=${tag}`, {
              method: 'POST'
            })
            .then((res) => {
                if(res.ok)
                {
                    setFollowing(true)
                }
            })
            .catch((err) => {
            })
        }
    }

    function unfollowTag() {
        // if(customtag)
        // {
        //     fetch(`http://54.226.5.241:8080/user/followtags?username=${user.name}&tag=${tag}&customtag=true`, {
        //       method: 'DELETE'
        //     })
        //     .then((res) => {
        //         if(res.ok)
        //         {
        //             setFollowing(false)
        //         }
        //     })
        //     .catch((err) => {
        //     })
        // }
        // else
        {
            fetch(`http://54.226.5.241:8080/user/followtags?username=${user.name}&tag=${tag}`, {
              method: 'DELETE'
            })
            .then((res) => {
                if(res.ok)
                {
                    setFollowing(false)
                }
            })
            .catch((err) => {
            })
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.back}>
                <BackIcon size={20} color={'#C4C4C4'} onPress={()=>(navigation.goBack())}></BackIcon>
                <Text style={styles.title}>{'# ' + tag}</Text>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.wrapperFooter}>
                    <TouchableOpacity onPress={() => following ? unfollowTag() : followTag()}>
                        <Text style={following ? styles.followingButton: styles.followButton}>{following ? 'Following' : "Follow"}</Text>
                    </TouchableOpacity>
                    <View style={styles.sort}>
                        {
                            sort === 'new'
                            ?
                            <Text style={styles.sortText}>Latest</Text>
                            :
                            <Text style={styles.sortText}>Oldest</Text>
                        }
                        <SortIcon size={23} color={'#C4C4C4'} onPress={changeSort}></SortIcon>
                    </View>
                </View>
            </View>
            <Timeline sort={sort} customtag={customtag} tag={tag} followtime={followtime} user={user} 
                cardOnPress={(news: NewsModel) => {
                navigation.navigate('News', { news: news, user: user });
                addHistory(user.name, news.url);
            }}/>
            {/* <SortPopUp
                sheetRef={sortSheetRef}
                sortChanged={(status)=>{
                    setSort(status);
                    sortSheetRef.current.snapTo(1);
            }}/> */}
        </SafeAreaView>
    )

    async function addHistory(username: string, url: string) {
        await fetch(`http://54.226.5.241:8080/user/history?username=${username}&url=${url}`, {
          method: 'POST'
        })
        .then((res) => {
            res.json().then(m => console.log(m));
        })
        .catch((err) => {
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101010'
    },
    scrollView: {
        height: "60%",
    },
    wrapper: {
        marginLeft: 'auto'
    },
    wrapperFooter: {
        flexDirection: 'row'
    },
    title: {
        color: '#FFFFFF',
        textAlign: 'right',
        fontSize: 24,
        fontFamily: 'Gobold',
        // fontWeight: 'bold',
        // marginTop: -20,
        marginRight: 15,
        marginBottom: 5
    },
    sort: {
        marginLeft: 'auto',
        marginRight: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    sortText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginRight: 10,
        marginTop: 3
    },
    back: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },
    content: {
        margin: 40,
        marginLeft: 43,
        marginBottom: 29,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    scrollview: {
        marginHorizontal: 20
    },
    followButton: {
        borderRadius: 100,
        backgroundColor: "#1DB5FF",
        alignContent: "center",
        justifyContent: "center",
        color: "#E5E5E5",
        fontSize: 10,
        textAlign: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        width: 60,
        alignSelf: 'flex-end',
        marginVertical: 10,
        marginRight: 15
    },
    followingButton: {
        borderRadius: 100,
        backgroundColor: "#424242",
        alignContent: "center",
        justifyContent: "center",
        color: "#E5E5E5",
        fontSize: 10,
        textAlign: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        width: 60,
        alignSelf: 'flex-end',
        marginVertical: 10,
        marginRight: 15
    }
});

export default TimelineLayout;