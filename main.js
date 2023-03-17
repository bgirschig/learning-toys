const cursorArrowStart = document.querySelector("#cursor-arrow-start");
/** @type {HTMLCanvasElement} */
const overlayCanvas = document.querySelector("canvas#overlay-canvas");

const overlayCtx = overlayCanvas.getContext('2d');
overlayCanvas.width = overlayCanvas.clientWidth;
overlayCanvas.height = overlayCanvas.clientHeight;

const currentMousePos = {x: 0, y: 0};

function init() {
    drawCursorArrow();
    document.addEventListener('mousemove', onMouseMove);
}

/**
 * 
 * @param {PointerEvent} evt 
 */
function onMouseMove(evt) {
    currentMousePos.x = evt.clientX;
    currentMousePos.y = evt.clientY;

    drawCursorArrow();
}

function drawCursorArrow() {
    const startBounds = cursorArrowStart.getBoundingClientRect();

    const start = {x: startBounds.left + startBounds.width/2, y: startBounds.top + startBounds.height};
    const end = {x: currentMousePos.x, y: currentMousePos.y};

    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    overlayCtx.strokeStyle = "red";
    overlayCtx.beginPath();
    overlayCtx.moveTo(start.x, start.y);
    overlayCtx.bezierCurveTo(start.x,start.y+100, end.x+200, end.y, end.x, end.y);
    overlayCtx.stroke();
}

init();