import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from  'react-native'
import {getDecks} from '../utils/api'
import { connect } from 'react-redux'
import {receiveDecks} from '../actions/decks'
import AppLoading from 'expo-app-loading'


class PrimaryView extends Component { 
    constructor(props){
      super(props);
      this.state = {
        decksLoaded: false,
        
      }
    }

    componentDidMount () {
      getDecks().then((decks) => {
        this.props.dispatch(receiveDecks(decks))
      }).then((value) => this.setState(() => ({decksLoaded: true})))
    }

    render() {
          
      return (
            this.state.decksLoaded ? 
            <View>
            <ScrollView>
              {Object.keys(this.props.decks).map((key) => (
                    <View key={key}>
                      <TouchableOpacity style = {styles.deckBtn} onPress={() => this.props.navigation.navigate('DeckView',{id:key})}>
                        <Text style = {styles.deckBtnTxt} >{this.props.decks[key].title}</Text>
                        <Text style = {[styles.deckBtnTxt,{fontSize: 22}]}>cards: {this.props.decks[key].cards ? this.props.decks[key].cards.length : 0}</Text>
                      </TouchableOpacity>  
                    </View>
              ))}
            </ScrollView>                
            </View>
            : <AppLoading />
      )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:70,
  },
  deckBtn: {
    padding: 30,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424ba1',
  },
  deckBtnTxt: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#424ba1',
  },
  
})

function mapStateToProps({decks}) {
  debugger;
   return {
     decks
  }
}

export default connect(mapStateToProps)(PrimaryView)


