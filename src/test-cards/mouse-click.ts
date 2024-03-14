import { CardModuleInit } from "../testCard";

export default function init({el, success, name}:CardModuleInit) {
  let score = 0;
  
  el.addEventListener("click", () => {
    setScore(score+1);
    success();
  });

  function setScore(value:number) {
    score = value;
    const scoreEl = el.querySelector(".score");
    if (!scoreEl) throw new Error(`Missing '.score' element in DOM for ${name}`);
    scoreEl.textContent = value.toString();
  }
}
