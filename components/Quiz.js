import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import CtaButton from './CtaButton';
import { connect } from 'react-redux';
import { newDeck } from '../actions';
import { newCard } from '../actions';
import { addCardToDeck } from '../utils/api';
import FlipCard from 'react-native-flip-card';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    questionsTotal: this.props.questions.length,
    currentQuestion: 0,
    answerCorrect: 0,
    answerIncorrect: 0,
    showScore: false,
  }

  submitCorrect = () => {
    let { answerCorrect } = this.state;

    this.setState({
      answerCorrect: answerCorrect + 1
    });

    this.nextQuestion();
  }

  submitIncorrect = () => {
    let { answerIncorrect } = this.state;

    this.setState({
      answerIncorrect: answerIncorrect + 1
    });

    this.nextQuestion();
  }

  nextQuestion = () => {
    let { currentQuestion, questionsTotal } = this.state;

    if(currentQuestion + 1 < questionsTotal) {
      this.setState({
        currentQuestion: currentQuestion + 1
      });
    } else {
      this.setState({
        showScore: true
      });
    }
  }

  reset = () => {
    this.setState({
      currentQuestion: 0,
      answerCorrect: 0,
      answerIncorrect: 0,
      showScore: false,
    })
  }

  render() {
    const { questionsTotal, showScore } = this.state;
    const { questions } = this.props;
    let { currentQuestion, answerCorrect, answerIncorrect } = this.state;

    if(showScore) {
      const percentScore = Math.floor((100 / questionsTotal) * answerCorrect);
      let motivation = 'Woo, default motivation... how booooooooring!';

      if(percentScore > 99) {
        motivation = 'WOW! That\'s just... wow... Is that a Kobayashi-Maru situation? No no, you just did great work, I\'m honored being a part of it!\nI have to tell that to the other apps...';
      } else if(percentScore >= 90) {
        motivation = 'Oh you handsome brain! You deserve a reward: Go read a wonderful book!';
      } else if(percentScore >= 80) {
        motivation = 'Awesome! Hard work pays off!'
      } else if(percentScore >= 50) {
        motivation = 'Great! G-R-E-A-T! You\'re on the right path!';
      } else if(percentScore >= 20) {
        motivation = 'That\'s good! Give it another try, I\'m shure you\'re getting better!';
      } else {
        motivation = 'Bad day, huh!?\nI had those aswell when I was a tiny calculator app on a smartphone from Cupertino. I got easy distracted and just returned random numbers, not even recognizing what the users typed in.\nBut these days are over, I got better and you can too! I believe in you, just give it another try! :)';
      }

      return (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreSentence}>
            You got {questionsTotal} question{questionsTotal !== 1 && ('s')} asked and gave {answerCorrect} correct and {answerIncorrect} incorrect answers.
          </Text>
          <Text style={styles.scorePercent}>
            That's <Text style={styles.scorePercentEmphatic}>{percentScore}% correct answers</Text>!
          </Text>
          <Text style={styles.scoreMotivation}>
            {motivation}
          </Text>

          <CtaButton
            onPress={this.reset}
            size="wide"
          >
            Take the Quiz again
          </CtaButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.counterContainer}>
          <Text style={styles.counter}>{currentQuestion + 1} / {questionsTotal}</Text>
        </View>

        <View style={styles.flipCardContainer}>
          <FlipCard
            friction={10}
            perspective={10000}
            flipHorizontal={true}
            flipVertical={false}
            style={styles.flipCard}
          >
            <View>
              <Text style={styles.txtQuestionAnswer}>{questions[currentQuestion].question}</Text>
              <Text style={styles.txtToggle}>(tap to see answer)</Text>
            </View>
            <View>
              <Text style={styles.txtQuestionAnswer}>{questions[currentQuestion].answer}</Text>
              <Text style={styles.txtToggle}>(tap to see question)</Text>
            </View>
          </FlipCard>
        </View>

        <View style={styles.buttonContainer}>
          <CtaButton
            onPress={this.submitCorrect}
            layout="positive"
            size="wide"
          >
            Correct
          </CtaButton>

          <CtaButton
            onPress={this.submitIncorrect}
            layout="false"
            size="wide"
          >
            Incorrect
          </CtaButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  scoreSentence: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  scorePercent: {
    fontSize: 24,
    color: '#000',
    marginBottom: 60,
  },
  scorePercentEmphatic: {
    fontWeight: 'bold',
  },
  scoreMotivation: {
    fontSize: 22,
    color: '#666',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  counterContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    color: '#999',
    fontSize: 18,
  },
  txtQuestionAnswer: {
    fontSize: 25,
  },
  txtToggle: {
    color: '#bbb',
    fontSize: 18,
  },
  flipCardContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    flex: 1,
    backgroundColor: '#fcfae0',
    padding: 10,
    borderRadius: 5,
    width: 300,
  },
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    questions: state[deckId].questions,
  }
}

export default connect(mapStateToProps)(Quiz)