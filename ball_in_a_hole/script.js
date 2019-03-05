let ball, level, menu
let ballSpeedX, ballSpeedY, ballPosX, ballPosY, ballSizeX, ballSizeY
let playgroundX, playgroundY
let holePosX, holePosY, holeSizeX, holeSizeY
let start, lastTime
let gameRunning = false
let startTime, endTime

function initialize() {
    ball = document.querySelector('.ball')
    level = document.querySelector('.level')
    menu = document.querySelector('.menu')
    lastTime = document.querySelector('#lastTime')
    window.addEventListener('deviceorientation', orientationChange)
    start = document.querySelector('#start')
    start.addEventListener("click", startGame)
    ballSizeX = 30
    ballSizeY = 30
    playgroundX = 300
    playgroundY = 460
    holePosX = 130
    holePosY = 290
    holeSizeX = 40
    holeSizeY = 40
}

document.addEventListener("DOMContentLoaded", initialize)

function startGame()
{
    setBallPos()
    level.classList.remove("level--hidden");
    menu.classList.add("menu--hidden");
    ballSpeedX = 0
    ballSpeedY = 0
    ballPosX = 0
    ballPosY = 0
    gameRunning = true
    moveBall()
    startTime = Date.now()
}


function orientationChange(event) {
    //event.alpha 0 360, event.beta -180 180, event.gamma -90 90
    ballSpeedX = 1*event.gamma
    ballSpeedY = -1*event.beta
}

function moveBall() 
{
    if(!gameRunning)
    {
        return;
    }
    ballPosX = Math.min( Math.max( 0, ballPosX+ballSpeedX ), playgroundX-ballSizeX )
    ballPosY = Math.min( Math.max( 0, ballPosY+ballSpeedY ), playgroundY-ballSizeY )

    setBallPos()

    if(ballInTheHole())
    {
        endGame()
    }
    else
    {
        setTimeout(moveBall, 1000/60)
    }
}

function setBallPos()
{
    ball.style.left = ballPosX + "px"
    ball.style.bottom = ballPosY + "px"
}

function ballInTheHole()
{
    if(ballPosX >= holePosX && ballPosX+ballSizeX <= holePosX+holeSizeX && ballPosY >= holePosY && ballPosY+ballSizeY <= holePosY+holeSizeY)
    {
        return true
    }
    return false
}

function endGame()
{
    gameRunning = false
    level.classList.add("level--hidden");
    menu.classList.remove("menu--hidden");
    endTime = Date.now()
    updateTime()
}

function updateTime()
{
    let fullMiliseconds = endTime - startTime
    let seconds = Math.floor(fullMiliseconds/1000)
    let miliseconds = fullMiliseconds%1000

    lastTime.innerHTML = `${seconds} seconds ${miliseconds} miliseconds`
}