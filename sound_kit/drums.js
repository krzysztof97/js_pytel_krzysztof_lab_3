document.addEventListener('DOMContentLoaded', appStart)

// deklaracja kanałów
const channel1 = []
const channel2 = []
const channel3 = []
const channel4 = []

// domyślnie ustawiam kanał pierwszy jako wybrany
let selectedChannel = 'ch1'

// lista dostępnych dźwięków
// klucz to charcode wyzwalającego klawisza, wartość to nazwa dźwięku
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

//zmienna przechowująca czy nagrywanie w toku
let isRecording = false

// zmienna przechowująca czas rozpoczęcia nagrywania
let recStart = 0

// funkcja ustawiająca możliwe zdarzenia
function appStart() 
{
    window.addEventListener('keypress', playByCode)
    document.querySelector('#rec').addEventListener('click', recAudio)
    document.querySelector('#play').addEventListener('click', playAudio)

    document.querySelectorAll('input[name=channel]').forEach(function(radio){
        radio.addEventListener('click', function(e){
            switch(e.target.value)
            {
                case 'channel1':
                    selectedChannel = 'ch1';
                    break;
                case 'channel2':
                    selectedChannel = 'ch2';
                    break;
                case 'channel3':
                    selectedChannel = 'ch3';
                    break;
                case 'channel4':
                    selectedChannel = 'ch4';
                    break;
            }
        })
    })

    document.querySelectorAll('.trigger').forEach(function(trg){
        trg.addEventListener('click', function(e){
            playSound(e.target.value)
        })
    })
}

function playByCode(e)
{
    if(!sounds[e.charCode]) {
        return
    }
    const soundName = sounds[e.charCode]
    playSound(soundName)
}

// funkcja odtwarzająca dźwięk przy użyciu znacznika AUDIO w HTML
function playSound(soundName) 
{
    const audioDOM = document.querySelector(`#${soundName}`)
    audioDOM.currentTime = 0
    audioDOM.play()

    // jeśli nagrywanie trwa to zapisuję dźwięk do kanału
    if(isRecording)
    {
        pushSound({
            name: soundName,
            time: Date.now() - recStart
        });
    }
}

// funkcja dodająca obiekt dźwięku do aktywnego kanału
function pushSound(object)
{
    switch(selectedChannel)
            {
                case 'ch1':
                    channel1.push(object)
                    break;
                case 'ch2':
                    channel2.push(object)
                    break;
                case 'ch3':
                    channel3.push(object)
                    break;
                case 'ch4':
                    channel4.push(object)
                    break;
            }
}

// funkcja zmieniająca stan nagrywania i treść przcisku
// w momencie rozpoczęcia nagrywania uruchamia nagrane dotąd dźwięki
function recAudio(e) {
    recStart = Date.now()
    isRecording =!isRecording
    if(isRecording)
    {
        e.target.innerHTML = "Stop recording"
        playAudio()
    }
    else
    {
        e.target.innerHTML = "Record"
    }
}

// funkcja odtwarzająca wszystkie nagrane dźwięki
function playAudio(e) 
{
    channel1.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    channel2.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    channel3.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    channel4.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
}