import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from  'react-native'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions/decks'

class DeckView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animatedValue: new Animated.Value(0.3)
        }
    }

    componentDidMount(){
        Animated.sequence([
            Animated.spring(this.state.animatedValue, { 
              toValue: 1, 
              friction: 5,
              useNativeDriver: true
            }),
            Animated.timing(this.state.animatedValue, {
              duration: 500,
              toValue: 1,
              useNativeDriver: true
            })
          ]).start()
    }

    deleteDecks = (id) => {
        this.props.dispatch(deleteDeck(id))
        this.props.navigation.navigate('Home',{screen: 'PrimaryView'})
    }

    

    render() { 

        const {id} = this.props.route.params
        const {decks}  =  this.props
        return(
            decks && decks[id] ? 
            <View>
                <Animated.Image
                    style={[styles.animationImage , {transform: [{scale: this.state.animatedValue}] }]}
                    source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}/>
                <Text style= {[styles.text, {fontSize: 30,paddingTop:10, marginTop: 20,}]}>{decks[id].title}</Text>
                <Text style= {[styles.text,{fontSize: 25,paddingTop:20, paddingBottom: 20}]}>cards: {decks[id].cards.length}</Text>
                <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('QuizView',{id:id, deck:decks[id]})}>
                    <Text style = {styles.buttonTxt}>Start Quiz</Text> 
                </TouchableOpacity>   
                <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('AddCardView',{id:id})}>
                    <Text style = {styles.buttonTxt}>Add Card</Text> 
                </TouchableOpacity> 
                <TouchableOpacity onPress = {() => this.deleteDecks(id, decks)}>
                    <Text style = {styles.deleteDeckTxt}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
            : <View><Text style= {[styles.text, {fontSize: 30,paddingTop:70, marginTop: 50,}]}>{''}</Text></View>
        )
    }
}

const styles= StyleSheet.create({
    text: {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingTop: 20,
        padding: 30,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#424ba1',

    },
    buttonTxt: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#424ba1',
    },
    deleteDeckTxt: {
        color:'#424ba1',
        textAlign: 'center',
        fontSize: 22,
        padding: 30
    },
    animationImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 227,
        height: 200,
        marginLeft: 80,
        marginTop: 10,
        marginBottom: 10

    }

})

function mapStateToProps({decks}) {
    return{
      decks
    }
  }

export default connect(mapStateToProps)(DeckView)