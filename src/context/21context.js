import React, { createContext, useReducer, useRef } from 'react';

const initialState = {
  score: 0,
  cards: [],
  bust: false,
  win: false,
};

export const TwentyOneContext = createContext(initialState);

export const TwentyOneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TwentyOneReducer, initialState);

  let value = useRef(0);

  const changeScore = (score, highScore) => {
    highScore
      ? dispatch({ type: 'CHANGE_HIGH_SCORE', payload: score })
      : dispatch({ type: 'CHANGE_SCORE', payload: score });
  };

  const changeCard = (card) => {
    dispatch({ type: 'CHANGE_CARD', payload: card });
    switch (card.value) {
      case 'KING':
      case 'QUEEN':
      case 'JACK':
        value.current = value.current + 10;
        break;
      case 'ACE':
        value.current = value.current + 11;
        break;
      default:
        value.current = value.current + parseInt(card.value);
        break;
    }
    if (value.current > 21) {
      dispatch({ type: 'END', payload: { win: false } });
      value.current = 0;
    } else if (value.current === 21) {
      dispatch({ type: 'END', payload: { win: true } });
      value.current = 0;
    } else {
      dispatch({ type: 'CHANGE_SCORE', payload: 1 });
    }
  };

  const newGame = () => {
    dispatch({ type: 'NEW_GAME', payload: false });
  };

  return (
    <TwentyOneContext.Provider
      value={{
        score: state.score,
        cards: state.cards,
        bust: state.bust,
        win: state.win,
        changeScore,
        changeCard,
        newGame,
      }}
    >
      {children}
    </TwentyOneContext.Provider>
  );
};

const TwentyOneReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SCORE':
      return {
        ...state,
        score: state.score + action.payload,
      };
    case 'CHANGE_CARD': {
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    }
    case 'END': {
      if (
        window.localStorage.getItem('highScore') === null ||
        state.score > parseInt(window.localStorage.getItem('highScore'))
      ) {
        window.localStorage.setItem('highScore', state.score.toString());
      }
      if (action.payload.win) {
        return {
          ...state,
          win: true,
        };
      } else {
        return { ...state, bust: true };
      }
    }
    case 'CHANGE_VALUE': {
      return {
        ...state,
        value: state.value + action.payload,
      };
    }
    case 'NEW_GAME': {
      return {
        ...state,
        score: 0,
        bust: false,
        win: false,
        cards: [],
      };
    }
    default:
      return state;
  }
};
