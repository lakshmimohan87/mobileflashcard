import  React, {Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';


class QuizView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctAnswer: 0,
            incorrectAnswer: 0,
            currentQuestion: 0,
            showAnswer: false
            
        }
    } 

    handleAnswer = (answer) => {
        if (answer === 'isCorrect') {
            this.setState((currentState) => ({correctAnswer : currentState.correctAnswer + 1,
                                            currentQuestion : currentState.currentQuestion + 1,
            }))
        }
        else {
            this.setState((currentState) => ({incorrectAnswer : currentState.incorrectAnswer + 1,
                currentQuestion : currentState.currentQuestion + 1,
            }))
           
        }
        
    }

    displayAnswer = () => {
        return this.setState({showAnswer: true})
    }

    displayQuestion = () => {
        return this.setState({showAnswer: false})
    }

    startOver = () => {
        this.setState({currentQuestion: 0,
                        correctAnswer: 0,
                        incorrectAnswer: 0,
        })
    }


    render() {
        const {id} = this.props.route.params
        const { deck } = this.props.route.params
        const deckLength = deck.cards.length
        
        return(
            <View>
                {deckLength !== 0
                    ?   <View>
                            {this.state.currentQuestion < deckLength
                            ?   <View>
                                    <Text style = {{fontSize: 30}}>{this.state.currentQuestion}/{deckLength}</Text>
                                    {this.state.showAnswer 
                                    ?   <View>
                                            <Text style = {styles.question }>{deck.cards[this.state.currentQuestion].answer}</Text>
                                            <TouchableOpacity onPress = {() => this.displayQuestion()}>
                                                <Text style = {styles.answer}>Question</Text>
                                            </TouchableOpacity>
                                        </View>    
                                    :  <View> 
                                            <Text style = {styles.question }>{deck.cards[this.state.currentQuestion].question}</Text>
                                            <TouchableOpacity onPress = {() => this.displayAnswer()}>
                                                <Text style = {styles.answer}>Answer</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    
                                    <TouchableOpacity  onPress = {() => this.handleAnswer('isCorrect')}>
                                        <Text style = {[styles.answerBtn,{backgroundColor: '#3a9e21',}]}>Correct</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress = {() => this.handleAnswer('isNotCorrect')}>
                                        <Text style = {[styles.answerBtn,{backgroundColor: '#d11518',}]}>Incorrect</Text>
                                    </TouchableOpacity>  
                                </View>
                            :   <View>
                                    <Text style = {styles.score}>Score: {this.state.correctAnswer}/{deckLength}</Text>
                                    <Text style = {[styles.score,{fontSize: 25}]}>Quiz Ends</Text>
                                    <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                                        <Text style = {styles.startOverBtn}>Go Back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress = {() => this.startOver()}>
                                        <Text style = {styles.startOverBtn}>Start Over</Text>
                                    </TouchableOpacity>
                                </View>  
                            }    
                        </View>
                            
                    :   <View><Text style = {{fontSize:30}}>Sorry the deck is empty</Text></View>

                }      
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    question:{
        padding: 30,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom:30,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000' ,
        fontSize: 30,
        textAlign: 'center',
    },
    answer: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#3a9e21',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 30,
    },
    answerBtn: {
        padding: 30,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        textAlign: 'center',
    },
    score: {
        padding: 30,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom:20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000' ,
        fontSize: 30,
        textAlign: 'center',
    },
    startOverBtn: {
        padding: 30,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: '#424ba1'
    }

})


export default connect()(QuizView)