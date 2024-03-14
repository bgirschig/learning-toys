import { getFileName } from "./utils/path";
import './style/test-card.scss'
import JSConfetti from 'js-confetti'

const cardModules = loadModuleMap();
const jsConfetti = new JSConfetti();

const TEST_CARD_CLASSNAME = 'test-card';
const DATASET_CARD_MODULE_KEY = 'card';

export const config = {
  confettiOnSuccess: true,
}

async function initTestCard(cardId:string) {
  const selector = `.${TEST_CARD_CLASSNAME}#${cardId}[data-${DATASET_CARD_MODULE_KEY}]`;
  const el = document.querySelector(selector) as HTMLElement;
  if (!(el instanceof HTMLElement)) throw new Error(`card not found: "${selector}"`);
  
  const moduleName = el.dataset[DATASET_CARD_MODULE_KEY];
  if (!moduleName) throw new Error(`card's data-${DATASET_CARD_MODULE_KEY} attribute should be set`);

  const moduleLoader = cardModules[moduleName];
  const module = await moduleLoader();

  el.classList.add("active");

  let isDone = false;
  function success() {
    if (isDone) return;
    el.classList.add('success');
    if (config.confettiOnSuccess) jsConfetti.addConfetti({confettiNumber: 200});
    isDone = true;
  }

  const init:CardModuleInit = {cardId, el, name:moduleName, success};
  module.default(init);
}

export function listAvailableCards() {
  const selector = `.${TEST_CARD_CLASSNAME}[data-${DATASET_CARD_MODULE_KEY}]`;
  const elements = document.querySelectorAll(selector);
  const cards = Array.from(elements).map(item => item.id);
  return Array.from(new Set(cards));
}

export function loadTestCards(cardIds:string[]) {
  cardIds.forEach(initTestCard);
}

function loadModuleMap() {
  const rawMap = import.meta.glob("./test-cards/*.{ts,js}");
  const output:{[key:string]:Function} = {};
  Object.keys(rawMap).forEach(key => {
    const name = getFileName(key);
    if (name in output) throw new Error(`module name conflict: found multiple modules with name "${name}"`);
    output[name] = rawMap[key];
  })
  return output;
}

export type CardModuleInit = {
  cardId: string,
  el: HTMLElement,
  name: string,
  success: () => void,
}