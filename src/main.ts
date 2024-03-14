import './style/style.scss'
import * as testCards from './testCard';


function main() {
  const params = loadUrlParams();
  const availableCards = testCards.listAvailableCards();

  if (params.modules.length === 0) testCards.loadTestCards(availableCards);
  else testCards.loadTestCards(params.modules);
  
  testCards.config.confettiOnSuccess = !params.noConfetti;
}

function loadUrlParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const modules = searchParams.get("modules") || "";
  return {
    modules: modules.split(",").map(item=>item.trim()).filter(Boolean),
    noConfetti: searchParams.has("no-confetti"),
  }
}

main();

