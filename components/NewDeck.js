import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CtaButton from './CtaButton';
import { connect } from 'react-redux';
import { newDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';

class NewDeck extends Component {
  state = {
    text: ''
  }

  submit = () => {
    const { text } = this.state;

    saveDeckTitle(text)
      .then(data => this.props.dispatch(newDeck(data)))
      .then(() => this.props.navigation.navigate(
        'DeckDetail',
        { deckId: text }
      ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textinput}
          placeholder={'Deck title'}
          placeholderTextColor={'#666'}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
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
  title: {
    fontSize: 40,
    width: '80%',
    marginBottom: 40,
    textAlign: 'center',
  },
  textinput: {
    width: '90%',
    height: 60,
    fontSize: 30,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 40,
  },
});

export default connect()(NewDeck)