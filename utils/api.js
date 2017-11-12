import { AsyncStorage } from 'react-native';

// A key for everything to store in the AsyncStorage
export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

// Getting all decks and returning the results
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => JSON.parse(results) );
}

/*
 * Getting only one deck works by fetching all decks
 * like the getDecks-Method and than returning only
 * the data of that one specific deck.
 */
export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      return data[id];
    });
}

/*
 * The saveDeckTitle-Method merges a new deck object
 * to the store and returns that object at the end.
 */
export function saveDeckTitle(title) {
  const newDeck = {
    [title]: {
      "title": title,
      "questions": []
    }
  };

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
    .then(() => newDeck);
}

/*
 * First the current questions of a deck are getting read from the
 * store. Than the new card gets pushed to that array and the new
 * array of questions gets merged to the store.
 */
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      return data[title].questions;
    })
    .then(questionsArr => {
      questionsArr.push( card );

      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
          "questions": questionsArr
        }
      }));
    });
}