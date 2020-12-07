const axios = require('axios');

// Estoy usé MAPBOX porque la api de https://home.openweathermap.org/
// no me funcionaba, pero solamente había que esperar varios minutos
const getLugarLatLng = async(direccion) => { // Creo una función async para devolver una promesa
    const encodedDireccion = encodeURI(direccion);

    const access_token = 'pk.eyJ1IjoidW9iYW5kbyIsImEiOiJja2F1NWF1emswdnhoMnJyMjFmY2U0OWw4In0.PWfJ-TS1EIYpr7ug87zRPA';

    const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedDireccion}.json?access_token=${access_token}`,
        // timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
    });

    const resp = await instance.get();

    if (resp.data.features.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = resp.data.features[0];
    const address = data.place_name;
    const lat = data.center[0];
    const lng = data.center[1];

    return {
        address,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}