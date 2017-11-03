import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CtaButton from './CtaButton';
import { connect } from 'react-redux';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: `${deckId}`
    }
  }

  startQuiz = () => {

  }

  render() {
    const { title, questions } = this.props.deckDetails;
    const qAmount = questions.length;

    return (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckCardAmount}>{qAmount} {qAmount !== 1 ? 'cards' : 'card'}</Text>
        </View>
        <View style={styles.ctaContainer}>
          <CtaButton
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deckId: title }
            )}
            layout='light'
            size='wide'
          >
            Add Card
          </CtaButton>
          <CtaButton onPress={() => this.startQuiz} size='wide'>
            Start Quiz
          </CtaButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  deckContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 40,
  },
  deckCardAmount: {
    fontSize: 30,
    color: '#666'
  },
  ctaContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deckDetails: state[deckId],
  }
}

export default connect(mapStateToProps)(DeckDetail)