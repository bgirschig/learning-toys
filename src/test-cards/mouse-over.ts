import { CardModuleInit } from "../testCard";

export default function init({el, success}:CardModuleInit) {
  el.addEventListener("mousemove", success);
}