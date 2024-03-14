import './style.scss'
import * as testCards from './testCard';


function main() {
  const params = loadUrlParams();
  const availableModules = testCards.listAvailableModules();

  if (params.modules.length === 0) testCards.loadTestCards(availableModules);
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

