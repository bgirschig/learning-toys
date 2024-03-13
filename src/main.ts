import './style.scss'
import { listAvailableModules, loadTestCards } from './testCard';


function main() {
  const params = loadUrlParams();
  loadTestCards(params.modules);

  console.log(listAvailableModules());
}

function loadUrlParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const modules = searchParams.get("modules") || "";
  return {
    modules: modules.split(",").map(item=>item.trim()),
  }
}

main();

