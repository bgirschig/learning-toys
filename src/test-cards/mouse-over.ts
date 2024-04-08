import { CardModuleInit } from "../testCard";
import html from "./mouse-over.html?raw";

export default function init({el, success}:CardModuleInit) {
  el.addEventListener("mousemove", success);
  
  const template = document.createElement("template");
  template.innerHTML = html;
  const containerEl = document.body.querySelector("#test-cards")
  containerEl!.append(...template.content.children);
}