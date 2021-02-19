import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { addCard } from '../actions/card'

class AddCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {question: '',
                   answer: '',
                },
            enteredQuestion: '',
            enteredAnswer: '',
            
        }
    }

    handleQuestion = (text) => {
        this.setState({enteredQuestion: text})
    }

    handleAnswer = (text) => {
        this.setState({enteredAnswer: text})
    }

    handleSubmit = (title, newQuestion, newAnswer) => {
        this.props.dispatch(addCard(title, newQuestion, newAnswer))
        this.props.navigation.goBack()
    }

    render() {
        const { decks }  =  this.props
        const { id } = this.props.route.params
        const title = decks[id].title
        return(
            <View>
                <TextInput placeholder = "Question" style={[styles.inputBox,{marginTop:100}]} onChangeText={this.handleQuestion} />
                <TextInput placeholder = "Answer" style={styles.inputBox} onChangeText={this.handleAnswer}  />
                <TouchableOpacity style = {styles.inputBtn} onPress = {() => this.handleSubmit(title, this.state.enteredQuestion, this.state.enteredAnswer, decks)}>
                    <Text style = {styles.inputBtnTxt} >Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    inputBox: {
        marginLeft: 10,
        marginTop: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#fff',
        fontSize: 20,
    },

    inputBtn: {
        padding: 20,
        marginLeft: 90,
        marginRight: 100,
        marginTop: 90,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#424ba1',
    },
    inputBtnTxt: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#424ba1',
    },  
}) 
function mapStateToProps({decks}) {
    return{
      decks
    }
  }

export default connect(mapStateToProps)(AddCardView)