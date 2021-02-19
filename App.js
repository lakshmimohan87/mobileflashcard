import 'react-native-gesture-handler';
import * as React from 'react';
import {  View, Platform } from 'react-native';
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import PrimaryView from './components/PrimaryView';
import DeckView from './components/DeckView';
import AddCardView from './components/AddCardView';
import QuizView from './components/QuizView';
import NewDeckView from './components/NewDeckView';
import Constants from 'expo-constants'
import { setLocalNotification } from './utils/helpers'



const UdaciStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tab = createBottomTabNavigator()
const NavTab = () => (
  <Tab.Navigator initialRouteName="PrimaryView" tabBarOptions={{
    activeTintColor: Platform.OS === 'ios' ? '#424ba1' : '#FFFFFF',
    style: {
      backgroundColor: Platform.OS === 'ios' ? '#FFFFFF' : '#424ba1',
      shadowColor: '#424ba1',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }}>
    <Tab.Screen name="PrimaryView" component={PrimaryView} options={{
          tabBarLabel: 'Decks',
          tabBarIcon: () => (
            <Ionicons name="ios-bookmarks" size={30} color='#FFFFFF'/>
          ),
        }}/>
    <Tab.Screen name="NewDeckView" component={NewDeckView} options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: () => (
            <FontAwesome name="plus-square" size={30} color='#FFFFFF'/>
          ),
        }}/>
  </Tab.Navigator>
)


const Stack = createStackNavigator();
const NavStack = () => {
  return(
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={NavTab} options={{title: ''}} />
        <Stack.Screen name='AddCardView' component={AddCardView} options={{title: 'Add new card'}}/>
        <Stack.Screen name='QuizView' component={QuizView} options={{title: 'Quiz'}}/>
        <Stack.Screen name='DeckView' component={DeckView} options={{title: 'Deck'}}/>
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <UdaciStatusBar backgroundColor='#424ba1' barStyle='light-content' />
        <NavigationContainer> 
          <NavStack/>
        </NavigationContainer>
      </Provider>
    );
  }
  
}

