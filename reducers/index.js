import { RECEIVE_DECKS, NEW_DECK, NEW_CARD } from '../actions';

// Reducer for the decks
function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case NEW_DECK:
      return {
        ...state,
        ...action.deck
      }
    case NEW_CARD:
      const { deck, card } = action;
      let questionsArr = state[deck].questions;
      questionsArr.push(card);

      return {
        ...state,
        [deck]: {
          ...state[deck],
          "questions": questionsArr,
        },
      }
    default:
      return state
  }
}

export default decks