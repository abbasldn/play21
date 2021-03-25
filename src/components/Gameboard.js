import React, { useContext, useEffect, useState } from 'react';
import { TwentyOneContext } from '../context/21context';
import '../App.scss';
import { getNewCard, getNewDeck } from '../context/actions';
import Card from './Card';

const Gameboard = () => {
  const { cards, score, changeCard, bust, newGame, win } = useContext(
    TwentyOneContext
  );
  const [deck, setDeck] = useState('');
  const [isNewGame, setIsNewGame] = useState(false);

  useEffect(() => {
    setIsNewGame(true);
  }, []);

  console.log(cards);

  return (
    <div>
      <div className="gameboard">
        <div className="score-banner">
          <h1>High Score: {window.localStorage.getItem('highScore')}</h1>
        </div>

        {isNewGame ? (
          <button
            onClick={async () => {
              const newDeck = await getNewDeck();
              setDeck(newDeck.deck_id);
              newGame();
              setIsNewGame(false);
              console.log(newDeck);
            }}
            className="start-new-game"
          >
            Start Game
          </button>
        ) : (
          <>
            {score !== 0 && (
              <>
                <div className="cards">
                  {cards.map((card) => (
                    <Card cardData={card} key={card.code} />
                  ))}
                </div>
                <h1 className="score">Score: {score}</h1>
              </>
            )}

            {!win && !bust && (
              <button
                onClick={async () => {
                  await getNewCard(deck, changeCard);
                }}
                className="hit-me"
              >
                Hit Me
              </button>
            )}
            {win && (
              <div className="win">
                <h1>You win!</h1>{' '}
                <button
                  onClick={() => {
                    setIsNewGame(true);
                  }}
                >
                  Play again!
                </button>
              </div>
            )}

            {bust && (
              <div className="bust">
                <h1>BUST</h1>{' '}
                <button
                  onClick={() => {
                    setIsNewGame(true);
                  }}
                >
                  Try again!
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Gameboard;
