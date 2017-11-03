import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then((decks) => dispatch(receiveDecks(decks)));
  }

  renderItem = ( deck ) => {
    const { title, questions } = deck.item;
    const qAmount = questions.length;

    return (
      <View style={styles.deck}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'DeckDetail',
              { deckId: title }
          )}
          style={styles.deckButton}
        >
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckCardAmount}>{qAmount} {qAmount !== 1 ? 'cards' : 'card'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { decks } = this.props;
    const decksArr = Object.keys(decks).map(deck => decks[deck]);

    return (
      <View style={styles.container}>
        {decksArr.length > 0 && (<FlatList
          data={decksArr}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.title}
          style={styles.listContainer}
        />)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  listContainer: {
    width: '100%',
  },
  deck: {
    borderBottomWidth: 2,
  },
  deckButton: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  deckTitle: {
    fontSize: 20,
  },
  deckCardAmount: {
    fontSize: 15,
    color: '#666'
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)