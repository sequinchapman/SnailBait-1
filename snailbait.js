var canvas = document.getElementById('snailbait-game-canvas'),
    context = canvas.getContext('2d'),
    background = new Image(),
    STARTING_BACKGROUND_VELOCITY = 35,
    STARTING_BACKGROUND_OFFSET = 0,
    lastAnimationFrameTime = 0,
    lastFpsUpdateTime = 0,
    fpsElement = document.getElementById('fps'),
    backgroundOffset = STARTING_BACKGROUND_OFFSET,
    bgVelocity = STARTING_BACKGROUND_VELOCITY



function draw(now){
    setOffsets(now);
    drawBackground();
}

function setOffsets(now) {
    setBackgroundOffset(now);
}

function drawBackground() {
    context.translate(-backgroundOffset, 0);

    // Initially onscreen:
    context.drawImage(background, 0, 0);

    // Initially offscreen: need to draw background again at end of previous backround so we can continue scroll
    context.drawImage(background, background.width, 0);

    // Set context back to where it was before call
    context.translate(backgroundOffset, 0);
}


function setBackgroundOffset(now) {
    backgroundOffset +=
        bgVelocity * (now - lastAnimationFrameTime) / 1000;

    if (backgroundOffset < 0 || backgroundOffset > background.width) {
        backgroundOffset = 0;
    }
}

function calculateFps(now) {
    var fps = 1 / (now - lastAnimationFrameTime) * 1000;
    if (now - lastFpsUpdateTime > 1000) {
        lastFpsUpdateTime = now;
        fpsElement.innerHTML = fps.toFixed(0) + ' fps ' + fps;
    }
    return fps;
}

function animate(now) {
    calculateFps(now);
    draw(now);
    lastAnimationFrameTime = now;
    requestNextAnimationFrame(animate);
}

function initializeImages() {
    background.src = 'images/wall.png';

    background.onload = function (e) {
        startGame();
    };
}

function startGame() {
    window.requestNextAnimationFrame(animate);
}

initializeImages();