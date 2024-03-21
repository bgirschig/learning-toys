import './style/style.scss'
import * as testCards from './testCard';

import './audio';


function main() {
  const params = loadUrlParams();
  const availableCards = testCards.listAvailableCards();

  if (params.cards.length === 0) testCards.loadTestCards(availableCards);
  else testCards.loadTestCards(params.cards);
  
  testCards.config.confettiOnSuccess = !params.noConfetti;
  testCards.config.soundOnSuccess = !params.noSound;
}

function loadUrlParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const cards = searchParams.get("cards") || "";
  return {
    cards: cards.split(",").map(item=>item.trim()).filter(Boolean),
    noConfetti: searchParams.has("no-confetti"),
    noSound: searchParams.has("no-sound"),
  }
}

main();

