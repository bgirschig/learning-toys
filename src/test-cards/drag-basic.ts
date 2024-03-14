import { CardModuleInit } from "../testCard";
import Hammer from 'hammerjs';

export default function init({el, success}:CardModuleInit) {
  const dragObject = el.querySelector('.draggable') as HTMLElement;
  const targetObject = el.querySelector('.target') as HTMLElement;
  
  const hammer = new Hammer(dragObject, {
    recognizers: [
      [Hammer.Pan, {threshold: 0}]
    ]
  });

  let startCenter = {x:0, y:0};
  hammer.on('panstart', () => {
    startCenter = {
      x: dragObject.offsetLeft,
      y: dragObject.offsetTop,
    };
  })

  hammer.on('pan', e => {
    dragObject.style.left = startCenter.x + e.deltaX + "px";
    dragObject.style.top = startCenter.y + e.deltaY + "px";

    const distance = distanceToTarget();
    if (distance < 100) success();
  });

  function distanceToTarget() {
    const x = targetObject.offsetLeft - dragObject.offsetLeft;
    const y = targetObject.offsetTop - dragObject.offsetTop;
    return Math.sqrt(x**2 + y**2);
  }
}