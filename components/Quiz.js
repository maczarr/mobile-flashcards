import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notifications';
import { NavigationActions } from 'react-navigation';
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

  /*
   * The state of the current quiz gets stored in a local state object.
   */
  state = {
    questionsTotal: this.props.questions.length,
    currentQuestion: 0,
    answerCorrect: 0,
    answerIncorrect: 0,
    showScore: false,
  }

  /*
   * If the user hits the button for a correct answer the value in
   * the local state gets increased and the function for going forward
   * to the next question gets called.
   */
  submitCorrect = () => {
    let { answerCorrect } = this.state;

    this.setState({
      answerCorrect: answerCorrect + 1
    });

    this.nextQuestion();
  }

  /*
   * If the user hits the button for an incorrect answer the value in
   * the local state gets increased and the function for going forward
   * to the next question gets called.
   */
  submitIncorrect = () => {
    let { answerIncorrect } = this.state;

    this.setState({
      answerIncorrect: answerIncorrect + 1
    });

    this.nextQuestion();
  }

  /*
   * This function forwards to the next questions by increasing the
   * value for the current question in the local state.
   * If the quiz is over (the user answered the last question) the score
   * gets visible, the notification for today gets cleared and a
   * new notification is being set for the upcoming days.
   */
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

      clearLocalNotification()
        .then(setLocalNotification)
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
    const { questions, deckId } = this.props;
    let { currentQuestion, answerCorrect, answerIncorrect } = this.state;

    /*
     * If the quiz is over the score will be shown with some
     * hopefully motivational text and two buttons for doing the quiz again
     * or going back to the deck detail view.
     */
    if(showScore) {
      const percentScore = Math.floor((100 / questionsTotal) * answerCorrect);
      let motivation = '';

      if(percentScore > 99) {
        motivation = 'WOW! That\'s just... wow... Is that a Kobayashi-Maru situation? No no, you just did great work, I\'m honored being a part of it!\nI have to tell that to the other apps...';
      } else if(percentScore >= 90) {
        motivation = 'Oh you handsome brain! You deserve a reward: Go read a wonderful book!';
      } else if(percentScore >= 80) {
        motivation = 'Awesome! Hard work pays off!'
      } else if(percentScore >= 50) {
        motivation = 'Great! G-R-E-A-T! You\'re on the right path!';
      } else if(percentScore >= 20) {
        motivation = 'That\'s good! Give it another try, I\'m sure you\'re getting better!';
      } else {
        motivation = 'Bad day, huh!?\nI had those when I was a tiny calculator app on a smartphone from Cupertino. I got easily distracted and just returned random numbers.\nBut I got better and you can too! Just give it another try! :)';
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
            /*onPress={() => this.props.navigation.navigate(
              'DeckDetail', { deckId }
            )}*/
            onPress={() => this.props.navigation.dispatch(
              NavigationActions.back()
            )}
            layout='light'
            size='wide'
          >
            Back to Deck
          </CtaButton>

          <CtaButton
            onPress={this.reset}
            size="wide"
          >
            Take the Quiz again
          </CtaButton>
        </View>
      )
    }

    /*
     * If the quiz isn't over a flip card will be rendered (front view
     * shows the question, back shows the answer) and two buttons to mark
     * the current card as correct or incorrect answered.
     * The buttons are instances of the CtaButton-Component.
     */
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
    fontSize: 20,
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