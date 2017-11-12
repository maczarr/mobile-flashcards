export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const NEW_DECK = 'NEW_DECK';
export const NEW_CARD = 'NEW_CARD';

/*
 * Function for receiving all decks
 */
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

/*
 * Function for creating a new deck
 */
export function newDeck(deck) {
  return {
    type: NEW_DECK,
    deck,
  }
}

/*
 * Function for creating a new card in a specific deck
 */
export function newCard(deck, card) {
  return {
    type: NEW_CARD,
    deck,
    card
  }
}