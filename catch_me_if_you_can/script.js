// deklaracja wymaganych zmiennych
let socketKey = "fj3Dk83A9fGr4Dc2"; // filtrowanie wiadomości z websocket po tym kluczu (nagłówek wiadomości)
let uluru, map, marker
let ws;
let players = {}
let nick = '1'
let begForLocation = document.querySelector('.beg-for-location')
let guid = parseInt(Date.now() + Math.random() * 1000) // unikatowy identyfikator
let icon = guid % 5 // numer obrazka

//elementy chatu
let chatNick, chatContent, chatMessages, chatForm

//ws = new WebSocket("ws://91.121.6.192:8010")
ws = new WebSocket("ws://77.55.222.58:443")

// funkcja wykonywana po załadowaniu kodu mapy
function initMap()
{
    uluru = { lat: -25.363, lng: 131.044 }
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: uluru,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({position: uluru, map: map, icon: iconString(icon)});

    initChat()
}

// funckja inicjujca elementy chatu
function initChat()
{
    chatNick = document.querySelector('#nick')
    chatContent = document.querySelector('#content')
    chatMessages = document.querySelector('#messages')
    chatForm = document.querySelector('#form')
    chatForm.addEventListener('submit', function(e){
        e.preventDefault()
        sendChatMessage()
    })
}

// funkcja pobierająca aktualną lokalizację
function getLocalization()
{
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

// jesli się udało pobieram koordynaty i ustawiam marker na odpowiedniej pozycji
function geoOk(data)
{
    begForLocation.classList.remove('beg-for-location--visible');
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    };
    placeMyMarker(coords, 'new')

}

// jeśli się nie udało, pokazuje informację o koniecznosci włączenia lokalizacji
function geoFail(data)
{
    begForLocation.classList.add('beg-for-location--visible');
}

// uruchomienie nasłuchiwania zdarzenia wciśnięcia klawiszy myszy
function watchKeys()
{
    document.addEventListener('keydown', moveMarker)
}

// funkcja sprawdzajaca który klawisz został wciśnięty i ustalająca położenie markera
function moveMarker(e)
{
    let coords = { 
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    }

    switch(e.key)
    {
        case 'ArrowUp':
            coords.lat += 0.001
            break;
        case 'ArrowDown':
            coords.lat -= 0.001
            break;
        case 'ArrowLeft':
            coords.lng -= 0.001
            break;
        case 'ArrowRight':
            coords.lng += 0.001
            break;
        default:
            break;
    }
    placeMyMarker(coords, 'move')
}

// funkcja umieszcza marker na mapie i przekazuje wiadomość do funkcji wysyłającej lokalizacje do websocket
function placeMyMarker(_coords, _action)
{
    marker.setPosition(_coords)
    map.setCenter(_coords)

    let me = {
        id: guid,
        action: _action,
        coords: _coords,
        playericon: icon
    }

    sendMessage(me)
}

// wysyła wiadomość do websocket dodając klucz tej aplikacji ( filtrowanie od innych aplikacji )
function sendMessage(obj)
{
    ws.send(socketKey + JSON.stringify(obj))
}

// funkcja odczytująca wiadomość z websocket
function receiveMessage(msg)
{
    // sprawdza czy wiadomość z websocket zawiera klucz filtrujący tej aplikacji
    if(msg.substring(0, socketKey.length) == socketKey)
    {
        msg = msg.substring(socketKey.length)
        msg = JSON.parse(msg)
        
        // pomijam wiadomość która zawiera id tego użytkownika
        if(msg.id != guid)
        {
            // jesli nowy użytkownik to dodaje nowy marker do mapy
            if(msg.action == 'new')
            {
                players[msg.id] = new google.maps.Marker({position: msg.coords, map: map, icon: iconString(msg.playericon)});
            }
            // jesli użytkownik się przesunął to przesuwam jego marker
            if(msg.action == 'move')
            {
                if(players[msg.id])
                    players[msg.id].setPosition(msg.coords);
                else
                    players[msg.id] = new google.maps.Marker({position: msg.coords, map: map, icon: iconString(msg.playericon)});
            }
            // jeśli użytkownik się rozłączył to usuwam marker
            if(msg.action == 'close')
            {
                players[msg.id].setMap(null)
            }
            // jeśli to wiadomość chatu to przekazuje do funkcji wyświetlającej
            if(msg.action == 'chat')
            {
                showMessage(msg)
            }
        }
    }
}

// odpalenie funkcji pobirającej lokalizację
getLocalization()

// odpalenie funkcji która włącza nasłuchiwanie zdarzenia kliknięcia klawisza klawiatury
watchKeys()

// funkcja która się wykonuje przy otrzymaniu wiadomości z websocket
ws.onmessage = function(e) 
{ 
    let msg = e.data
    receiveMessage(msg)
};

// wysłanie wiadomości o zamknięciu okna do websocket
window.onbeforeunload = function(e)
{
    sendMessage({
        id: guid,
        action: 'close'
    });
}

// funkcja pomocnicza która zwraca ścieżkę pliku do avatara
function iconString(number)
{
    return `icon/${number}.png`
}

// funkcja wysyłająca wiadomosc chatu
function sendChatMessage()
{
    let msg = {
        id: -1,
        nick: chatNick.value,
        content: chatContent.value,
        time: new Date(),
        action: 'chat'
    }

    // sprawdza czy nick i wiadomość nie są puste
    if(msg.nick.length > 0 && msg.content.length > 0)
    {
        chatContent.value = ''
        sendMessage(msg)
    }
}

// wyświetla na stronei wiadomość
function showMessage(msg)
{
    let messageDOMObject = 
    `<div class="message">
        <div class="message__header">
            <div class="message__nick">${msg.nick}</div>
            <div class="message__time">(${msg.time})</div>
        </div>
        <div class="message__content">${msg.content}</div>
    </div>`
    chatMessages.innerHTML = messageDOMObject + chatMessages.innerHTML
}