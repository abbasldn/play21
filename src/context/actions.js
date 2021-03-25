import api from '../api/21-api';

export const getNewDeck = async () => {
  try {
    const res = await api.get('deck/new/shuffle/?deck_count=1');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getNewCard = async (deckId, changeCard) => {
  try {
    const res = await api.get(`deck/${deckId}/draw/?count=1`);
    changeCard(res.data.cards[0]);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
