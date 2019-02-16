document.addEventListener('DOMContentLoaded', appStart)

const channel1 = []
const channel2 = []
const channel3 = []
const channel4 = []

const sounds = {
    97:     'boom',
    115:    'clap',
    100:    'hihat',
    102:    'kick',
    103:    'openhat',
    104:    'ride',
    106:    'snare',
    107:    'tink',
    108:    'tom',
}

let isRecording = false
let recStart = 0
let tempo = 120

function appStart() {
    window.addEventListener('keypress', playSound)
    document.querySelector('#rec').addEventListener('click', recAudio)
    document.querySelector('#play').addEventListener('click', playAudio)
    document.querySelector('#tempo').addEventListener('change', changeTempo)
}

function changeTempo(e) {
    tempo = parseInt(e.target.value)
}

function playSound(e) {
     console.log(e)
    // e.charCode
    if(!sounds[e.charCode]) {
        return
    }

    const soundName = sounds[e.charCode]
    const audioDOM = document.querySelector(`#${soundName}`)
    audioDOM.currentTime = 0
    audioDOM.play()
    console.log('odpalilem')
    if(isRecording)
    {
        channel1.push(
            {
                name: soundName,
                time: Date.now() - recStart
            }
        )
    }
}

function recAudio(e) {
    recStart = Date.now()
    isRecording =!isRecording
    e.target.innerHTML = isRecording ? "Stop" : "Nagrywaj"
    if (isRecording) {
        for(i=0; i<4; i++) {
            setTimeout(metronomeTick(), i * 60000 )
        }
    }
}

function playAudio(e) {
    channel1.forEach(sound => {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
}

function metronomeTick() {
    const audioDOM = document.querySelector(`#tink`)
    audioDOM.currentTime = 0
    audioDOM.play()
}