import { CardModuleInit } from "../testCard";

export default function init({el, success, name}:CardModuleInit) {
  const targetText = el.dataset.targetText;
  const input = el.querySelector("input");
  const targetTextEl = el.querySelector(".targetText");

  if (!input) throw new Error(`bad html for ${name} (missing input)`);
  if (!targetText) throw new Error(`bad html for ${name} (missing or empty data-target-text prop)`);
  if (!targetTextEl) throw new Error(`bad html for ${name} (missing targetText element)`);

  targetTextEl.textContent = targetText;

  input?.addEventListener("input", checkResult);
  
  function checkResult() {
    const currentValue = input?.value.replaceAll('"', '').trim();
    if (currentValue === targetText) success();
  }
}