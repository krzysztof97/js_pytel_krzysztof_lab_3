let ball, level, ballSpeedX, ballSpeedY, ballPosX, ballPosY, ballSizeX, ballSizeY, playgroundX, playgroundY, holePosX, holePosY, holeSizeX, holeSizeY

function initialize() {
    window.addEventListener('deviceorientation', orientationChange)
    ball = document.querySelector('.ball')
    level = document.querySelector('.level')
    ballSpeedX = 0
    ballSpeedY = 0
    ballPosX = 0
    ballPosY = 00
    ballSizeX = 30
    ballSizeY = 30
    playgroundX = 300
    playgroundY = 460
    holePosX = 130
    holePosY = 290
    holeSizeX = 40
    holeSizeY = 40
}

initialize()

function orientationChange(event) {
    //event.alpha 0 360, event.beta -180 180, event.gamma -90 90
    ballSpeedX = 1*event.gamma
    ballSpeedY = -1*event.beta
}

function moveBall() 
{
    ballPosX = Math.min( Math.max( 0, ballPosX+ballSpeedX ), playgroundX-ballSizeX )
    ballPosY = Math.min( Math.max( 0, ballPosY+ballSpeedY ), playgroundY-ballSizeY )

    setBallPos()

    if(ballInTheHole())
    {

    }
    else
    {
        setTimeout(moveBall, 1000/60)
    }
}

moveBall()

function setBallPos()
{
    ball.style.left = ballPosX + "px"
    ball.style.bottom = ballPosY + "px"
}

function ballInTheHole()
{
    if(ballPosX >= holePosX && ballPosX+ballSizeX <= holePosX+holeSizeX && ballPosY >= holePosY && ballPosY+ballSizeY <= holePosY+holeSizeY)
    {
        ball.remove()
    }
}