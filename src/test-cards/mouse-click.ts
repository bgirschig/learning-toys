import { initTestCard } from "../testCard";

function main() {
  const testCard = initTestCard(import.meta.url);
  let score = 0;

  testCard.el?.addEventListener("click", () => {
    setScore(score+1);
    testCard.success();
  });

  function setScore(value:number) {
    score = value;
    const scoreEl = testCard.el.querySelector(".score");
    if (!scoreEl) throw new Error(`Missing '.score' element in DOM for ${testCard.name}`);
    scoreEl.textContent = value.toString();
  }
}

main();