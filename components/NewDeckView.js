import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions/decks'


class NewDeckView extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            title: '',
        }
        this.textInput = React.createRef();
    }

    handleTitle = (text) => {
        this.setState({title: text})
    }

    handleSubmit = (title) => {
        this.props.dispatch(addDeck(title))
        this.props.navigation.navigate('DeckView',{id:title})
    }


    render() {
        return(
            <View>
                <Text style = {styles.text} >What is the title of your new deck?</Text>
                <TextInput placeholder = "Deck Title" style = {styles.txtInput}  onChangeText = {this.handleTitle}></TextInput>
                <TouchableOpacity style = {styles.submitBtn} onPress = {() => this.handleSubmit(this.state.title)}>
                    <Text style = {styles.submitBtnTxt}>Submit</Text>
                </TouchableOpacity>    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        marginTop: 100,
    },
    txtInput: {
        marginLeft: 20,
        marginTop: 70, 
        justifyContent: 'center',
        alignItems: 'stretch',
        width: 350,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#fff',
        fontSize: 22,
    },
    submitBtn: {
        padding: 20,
        marginLeft: 70,
        marginRight: 70,
        marginTop: 70,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#424ba1',
    },
    submitBtnTxt: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#424ba1',
    }, 
})

export default connect()(NewDeckView)