import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, processColor, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheet from 'reanimated-bottom-sheet';

import { FontAwesome5 } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';

import HomepageLayout from './src/layouts/homepage/homepage.layout';
import TagsLayout from './src/layouts/tags/tags.layout';
import SearchLayout from './src/layouts/search/search.layout';
import ProfileLayout from './src/layouts/profile/profile.layout';

import UserContext from './src/services/UserContext';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#101010',
    // card: 'black',
    text: '#FFFFFF',
    primary: '#7B40DC',
    border: '#101010'
  },
};

export interface HomeProps {
  
}

const Home: React.FC<HomeProps> = (props) => {
  const [mainRoute, setMainRoute] = React.useState(true);
  const [routeChild, setRouteChild] = React.useState('');
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={Theme}>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome5 name={route.name} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: '#4D7AEE',
          inactiveTintColor: 'gray',
          showLabel: false,
          style: {backgroundColor: '#101010'}
        }}
        >
          <Tab.Screen name="home" component={HomepageLayout} listeners={{
            focus: e => {
              setMainRoute(true);
            }
          }}/>
          <Tab.Screen name="hashtag" component={TagsLayout} listeners={{
            focus: e => {
              setMainRoute(false);
              setRouteChild("TAGs");
            }
          }}/>
          <Tab.Screen name="search" component={SearchLayout} listeners={{
            focus: e => {
              setMainRoute(false);
              setRouteChild("SEARCH");
            }
          }}/>
          <Tab.Screen name="user" component={ProfileLayout} listeners={{
            focus: e => {
              setMainRoute(false);
              setRouteChild("USER");
            }
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

export interface LoginProps {
  login: any;
}

const Login: React.FC<LoginProps> = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username_su, setUsername_su] = React.useState('');
  const [password_su, setPassword_su] = React.useState('');
  const [confirmpassword_su, setConfirmpassword_su] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [message_su, setMessage_su] = React.useState('');
  const [color, setColor] = React.useState('gray');
  const sheetRef = React.useRef(null);

  function openBottomSheet() {
    sheetRef.current.snapTo(0)
    setUsername_su('');
    setPassword_su('');
    setConfirmpassword_su('');
    setMessage_su('');
    setColor('gray');
  }

  const renderContent = () => (
    <View style={styles.bottomSheet}>
      <Text style={styles.appNameLarge_bs}>TIMELINE</Text>
      <TextInput 
        style={styles.textInput_bs}
        onChangeText={text => setUsername_su(text)}
        value={username_su}
        placeholder={'Username'}
        textContentType='username'
        autoFocus = {true}
      />
      <TextInput 
        style={styles.textInput_bs}
        onChangeText={text => setPassword_su(text)}
        value={password_su}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <TextInput
        style={[styles.textInput_bs, {borderColor: color}]}
        onChangeText={text => {
          setConfirmpassword_su(text);
          
          if (text === '')
          {
            setColor('gray')
            setMessage_su('')
          }
          else if(text !== password_su)
          {
            setColor('red')
            setMessage_su('Passwords need to match.')
          }
          else
          {
            setColor('#32CD32')
            setMessage_su('')
          }
        }}
        value={confirmpassword_su}
        placeholder={'Confirm Password'}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={signup} disabled={username_su === '' || password_su === '' || confirmpassword_su === '' || password_su !== confirmpassword_su}>
      <View style={username_su === '' || password_su === '' || confirmpassword_su === '' || password_su !== confirmpassword_su ? styles.loginButton_disable : styles.loginButton}>
          <Text style={styles.loginText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.message}>{message_su}</Text>
    </View>
  );

  let [fontsLoaded] = useFonts({
    'Audrey': require('./assets/fonts/Audrey/Audrey-Normal.otf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
      return (
        <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <View style={styles.loginview}>
              <Text style={styles.appNameLarge}>TIMELINE</Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={text => setUsername(text)}
                value={username}
                placeholder={'Username'}
                placeholderTextColor={'white'}
                textContentType='username'
              />
              <TextInput 
                style={styles.textInput}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder={'Password'}
                placeholderTextColor={'white'}
                secureTextEntry={true}
              />
              <TouchableOpacity onPress={login} disabled={username === '' && password === ''}>
                <View style={username === '' || password === '' ? styles.loginButton_disable : styles.loginButton}>
                  <Text style={styles.loginText}>Login</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openBottomSheet()}>
                <Text style={styles.loginText}>Sign up</Text>
              </TouchableOpacity>
              <Text style={styles.message}>{message}</Text>
            </View>
            <BottomSheet
              ref={sheetRef}
              snapPoints={[350, 0]}
              borderRadius={25}
              renderContent={renderContent}
              initialSnap={1}
            />
          </KeyboardAvoidingView>
      );
  }

  async function login() {
    await fetch(`http://54.226.5.241:8080/user/login?username=${username}&password=${password}`, {
      method: 'POST'
    })
    .then((res) => {
      props.login(res.ok, username);
      res.json().then((m) => setMessage(m));
    })
    .catch((err) => {
    })
  }

  async function signup() {
    await fetch(`http://54.226.5.241:8080/user?username=${username_su}&password=${password_su}`, {
      method: 'POST'
    })
    .then((res) => {
      res.json().then((m) => setMessage_su(m));

      if(res.ok)
      {
        setTimeout(() => sheetRef.current.snapTo(1), 1000);
        setUsername_su('');
        setPassword_su('');
        setConfirmpassword_su('');
        setMessage_su('');
        setColor('gray');
      }
    })
    .catch((err) => {
    })
  }
}

export default function App() {
  const [authorized, setAuthorized] = React.useState(false);
  const [username, setUsername] = React.useState('');
  
  if(authorized)
  {
    return(
    <UserContext.Provider value={{
      name: username
    }}>
      <Home />
    </UserContext.Provider>
    )
  }
  else{
    return(<Login login={(auth: boolean, _username: string) => {
      setAuthorized(auth);
      setUsername(_username);
    }}/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010'
  },
  loginview: {
    marginHorizontal: "20%",
    marginVertical: "50%"
  },
  appNameLarge: {
    fontFamily: "Audrey",
    fontSize: 30,
    color: "#FFFFFF",
    alignSelf: 'center',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 10
  },
  loginButton: {
    backgroundColor: '#7B40DC',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    width: '50%',
    marginTop: 26,
    marginVertical: 10,
    height: 40,
    borderRadius: 20,
  },
  loginButton_disable: {
    backgroundColor: 'gray',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    width: '50%',
    marginTop: 26,
    marginVertical: 10,
    height: 40,
    borderRadius: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
    alignContent: 'center',
    alignSelf: 'center'
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    padding: 30
  },
  appNameLarge_bs: {
    fontFamily: "Audrey",
    fontSize: 30,
    color: "black",
    alignSelf: 'center',
    marginTop: 10
  },
  textInput_bs: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    padding: 10,
    marginTop: 10,
    borderRadius: 10
  },
  message: {
    color: 'red',
    fontSize: 15,
    marginTop: 8,
    marginVertical: 10,
    alignContent: 'center',
    alignSelf: 'center'
  }
});
