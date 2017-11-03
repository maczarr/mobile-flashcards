export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const NEW_DECK = 'NEW_DECK';
export const NEW_CARD = 'NEW_CARD';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function newDeck(deck) {
  return {
    type: NEW_DECK,
    deck,
  }
}

export function newCard(deck, card) {
  return {
    type: NEW_CARD,
    deck,
    card
  }
}