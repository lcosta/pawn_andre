//Eye movement

const MAX_OFFSET = 8;

let eyes = document.querySelectorAll('.santa__pupil');

let eyesRect = [];
let eyesLeft = [];
let eyesTop = [];
let eyesX = [];
let eyesY = [];

function reset() {
    eyesRect = [];
    eyesX = [];
    eyesY = [];
    for (let i = 0; i < eyes.length; i++) {
        eyesRect.push(eyes[i].getBoundingClientRect());
        eyesX.push(eyesRect[i].x);
        eyesY.push(eyesRect[i].y);
    }
}

function init() {
    for (let i = 0; i < eyes.length; i++) {
        eyesRect.push(eyes[i].getBoundingClientRect());

        eyesLeft.push(eyes[i].offsetLeft);
        eyesTop.push(eyes[i].offsetTop);
        eyesX.push(eyesRect[i].x);
        eyesY.push(eyesRect[i].y);
    }
}

init();


const eyeMovement = function (e) {
    let sin, cos;
    let dist, distsX, distsY;
    distsX = [];
    distsY = [];

    for (let i = 0; i < eyes.length; i++) {
        distsX.push(e.clientX - eyesX[i]);
        distsY.push(eyesY[i] - e.clientY);

        dist = Math.sqrt(distsX[i] * distsX[i] + distsY[i] * distsY[i]);
        if (!dist) dist = 0.00001;

        sin = distsY[i] / dist;
        cos = distsX[i] / dist;

        eyes[i].style.left = `${eyesLeft[i] + MAX_OFFSET * cos}px`;
        eyes[i].style.top = `${eyesTop[i] - MAX_OFFSET * sin}px`;
    }
};

document.addEventListener('mousemove', eyeMovement);

window.onresize = function () {
    reset();
};
