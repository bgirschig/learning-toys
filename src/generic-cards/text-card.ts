import { initTestCard } from "../testCard";

export function init(moduleUrl:string) {
  const testCard = initTestCard(moduleUrl);
  const targetText = testCard.el.dataset.targetText;
  const input = testCard.el.querySelector("input");
  const targetTextEl = testCard.el.querySelector(".targetText");

  if (!input) throw new Error(`bad html for ${testCard.name}`);
  if (!targetText) throw new Error(`bad html for ${testCard.name}`);
  if (!targetTextEl) throw new Error(`bad html for ${testCard.name}`);

  targetTextEl.textContent = targetText;

  input?.addEventListener("input", checkResult);
  
  function checkResult() {
    const currentValue = input?.value.replaceAll('"', '').trim();
    if (currentValue === targetText) testCard.success();
  }
}