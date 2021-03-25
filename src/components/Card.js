import React from 'react';
import hearts from '../images/hearts.svg';
import clubs from '../images/clubs.svg';
import diamonds from '../images/diamonds.svg';
import spades from '../images/spades.svg';

const Card = ({ cardData }) => {
  //   return <img src={cardData.image} className="card" alt="" />;
  let suit;
  switch (cardData.suit) {
    case 'HEARTS':
      suit = hearts;
      break;
    case 'CLUBS':
      suit = clubs;
      break;
    case 'DIAMONDS':
      suit = diamonds;
      break;
    case 'SPADES':
      suit = spades;
      break;
    default:
      break;
  }

  let value;
  switch (cardData.value) {
    case 'KING':
      value = 'K';
      break;
    case 'QUEEN':
      value = 'Q';
      break;
    case 'JACK':
      value = 'J';
      break;
    case 'ACE':
      value = 'A';
      break;
    default:
      value = cardData.value;
      break;
  }
  console.log(cardData);
  return (
    <div className="card">
      <div className="top-left">
        <span>{value}</span>
        <img src={suit} alt="suit" />
      </div>
      <div className="bottom-right">
        <img src={suit} alt="suit" />
        <span>{value}</span>
      </div>
    </div>
  );
};

export default Card;
