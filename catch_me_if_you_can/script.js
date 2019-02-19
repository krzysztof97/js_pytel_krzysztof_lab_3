let socketKey = "fj3Dk83A9fGr4Dc2"; // filtrowanie wiadomości z websocket po tym kluczu (nagłówek wiadomości)
let uluru, map, marker
let ws;
let players = {}
let nick = '1'
let begForLocation = document.querySelector('.beg-for-location')
let guid = parseInt(Date.now() + Math.random() * 1000) // unikatowy identyfikator
let icon = guid % 5 // numer obrazka

//ws = new WebSocket("ws://91.121.6.192:8010")
ws = new WebSocket("ws://77.55.222.58:8010")

function initMap()
{
    uluru = { lat: -25.363, lng: 131.044 }
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: uluru,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({position: uluru, map: map, icon: iconString(icon)});

}

function getLocalization()
{
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

function geoOk(data)
{
    begForLocation.classList.remove('beg-for-location--visible');
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    };
    placeMyMarker(coords, 'new')

}

function geoFail(data)
{
    begForLocation.classList.add('beg-for-location--visible');
}

function watchKeys()
{
    document.addEventListener('keydown', moveMarker)
}

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

function sendMessage(obj)
{
    ws.send(socketKey + JSON.stringify(obj))
}

function receiveMessage(msg)
{
    if(msg.substring(0, socketKey.length) == socketKey)
    {
        msg = msg.substring(socketKey.length)
        msg = JSON.parse(msg)
        console.log(msg)
        if(msg.id != guid)
        {
            if(msg.action == 'new')
            {
                players[msg.id] = new google.maps.Marker({position: msg.coords, map: map, icon: iconString(msg.playericon)});
            }
            if(msg.action == 'move')
            {
                if(players[msg.id])
                    players[msg.id].setPosition(msg.coords);
                else
                    players[msg.id] = new google.maps.Marker({position: msg.coords, map: map, icon: iconString(msg.playericon)});
            }
        }
    }
}

getLocalization()

watchKeys()

ws.onmessage = function(e) 
{ 
    let msg = e.data
    receiveMessage(msg)
};

function iconString(number)
{
    return `icon/${number}.png`
}