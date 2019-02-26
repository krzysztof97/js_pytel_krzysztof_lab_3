let ball, level, ballSpeedX, ballSpeedY, ballPosX, ballPosY;

function initialize() {
    window.addEventListener('deviceorientation', orientationChange);
    ball = document.querySelector('.ball');
    level = document.querySelector('.level');
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballPosX = ball.style.left;
    ballPosY = ball.style.bottom;
}

initialize();

console.log(ballPosX);

function orientationChange(event) {
    //event.alpha 0 360, event.beta -180 180, event.gamma -90 90
    ballSpeedX = -1*event.beta
    ballSpeedY = 1*event.gamma
}

function moveBall() 
{
    console.log(ballSpeedX);
    console.log(ballSpeedY);
    setTimeout(moveBall, 1000/60);
}

moveBall();