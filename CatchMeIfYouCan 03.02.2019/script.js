let uluru, map, marker
let ws
let players = {}
let nick = '1'

function initMap()
{
    uluru = { lat: -25.363, lng: 131.044 }
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: uluru,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({position: uluru, map: map});

}

function getLocalization()
{
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

function geoOk(data)
{
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    };
    map.setCenter(coords)
    marker.setPosition(coords)

}

function geoFail(data)
{
    console.log(data);
}

getLocalization()

function watchKeys()
{
    document.addEventListener('keypress', moveMarker)
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

    marker.setPosition(coords)
}

watchKeys()