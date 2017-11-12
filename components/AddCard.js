import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CtaButton from './CtaButton';
import { connect } from 'react-redux';
import { newDeck } from '../actions';
import { newCard } from '../actions';
import { addCardToDeck } from '../utils/api';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  state = {
    question: '',
    answer: ''
  }

  /*
   * When the form gets submitted the values are being read from the local
   * state. After sending them to the API-Function for adding them
   * to a deck they get dispatched to the redux store and at the end the
   * user gets routed to the deck detail view.
   */
  submit = () => {
    const { question, answer } = this.state;
    const { deckId } = this.props;
    const card = { question, answer };

    if(question.length > 0 && answer.length > 0) {
      addCardToDeck(deckId, card)
        .then(() => this.props.dispatch(newCard(deckId, card)))
        .then(() => this.props.navigation.navigate(
          'DeckDetail',
          { deckId }
        ));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          placeholder={'Question'}
          placeholderTextColor={'#666'}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
        />
        <TextInput
          style={styles.textinput}
          placeholder={'Answer'}
          placeholderTextColor={'#666'}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
        />

        <CtaButton onPress={this.submit}>
          Submit
        </CtaButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  textinput: {
    width: '90%',
    height: 50,
    fontSize: 25,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 40,
  },
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId
  }
}

export default connect(mapStateToProps)(AddCard)