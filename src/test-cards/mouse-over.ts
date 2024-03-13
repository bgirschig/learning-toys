import { initTestCard } from "../testCard";

function main() {
  const testCard = initTestCard(import.meta.url);
  testCard.el?.addEventListener("mousemove", testCard.success);
}

main();