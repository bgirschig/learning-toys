import { getFileName } from "./utils/path";
import './test-card.scss'
import JSConfetti from 'js-confetti'

const cssTestCards = import.meta.glob("./test-cards/*.{css,scss}");
const jsTestCards = import.meta.glob("./test-cards/*.{ts,js}");
const jsConfetti = new JSConfetti();

const TEST_CARD_CLASSNAME = 'test-card';

export const config = {
  confettiOnSuccess: true,
}

export function initTestCard(moduleUrl:string) {
  const name = getFileName(moduleUrl);
  const el = document.querySelector(`.${TEST_CARD_CLASSNAME}#${name}`) as HTMLElement;
  let isDone = false;

  function success() {
    if (isDone) return;
    el.classList.add('success');
    if (config.confettiOnSuccess) jsConfetti.addConfetti({confettiNumber: 200});
    isDone = true;
  }

  return {name, el, success};
}

export function listAvailableModules() {
  const cards = [
    ...Object.keys(cssTestCards).map(getFileName),
    ...Object.keys(jsTestCards).map(getFileName),
    ...Array.from(document.querySelectorAll(`.${TEST_CARD_CLASSNAME}`)).map(item => item.id),
  ];
  return Array.from(new Set(cards));
}

export function loadTestCards(cardIds:string[]) {
  const testCardEls = document.querySelectorAll(".test-card");
  testCardEls.forEach(testCard => {
    if (cardIds.includes(testCard.id)) testCard.classList.add("active");
  })

  for(let key in cssTestCards) {
    const moduleName = getFileName(key);
    if (cardIds.includes(moduleName)) {
      cssTestCards[key]();
    }
  }

  for(let key in jsTestCards) {
    const moduleName = getFileName(key);
    if (cardIds.includes(moduleName)) {
      jsTestCards[key]();
    }
  }
}