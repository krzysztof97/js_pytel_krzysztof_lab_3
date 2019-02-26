var ball, level, ballSpeedX, ballSpeedY, ballPosX, ballPosY;

//function initialize() {
    window.addEventListener('deviceorientation', orientationChange);
    ball = document.querySelector('.ball');
    level = document.querySelector('.level');
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballPosX = ball.style.left;
    ballPosY = ball.style.bottom;
//}

//initialize();

console.log(ballPosX);

function orientationChange(event) {
    console.log(event);
    //event.alpha 0 360, event.beta -180 180, event.gamma -90 90
}

function moveBall() {
    
    setTimeout(moveBall, 1000/60);
}
moveBall();