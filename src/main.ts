import './style.scss'
import * as testCards from './testCard';


function main() {
  const params = loadUrlParams();
  testCards.loadTestCards(params.modules);
  testCards.config.confettiOnSuccess = !params.noConfetti;
  console.log(testCards.listAvailableModules());
}

function loadUrlParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const modules = searchParams.get("modules") || "";
  return {
    modules: modules.split(",").map(item=>item.trim()),
    noConfetti: searchParams.has("no-confetti"),
  }
}

main();

