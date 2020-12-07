const axios = require('axios');
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Lugar para optener el clima',
        demand: true
    }
}).argv;

const getInfo = async(direccion) => {
    try {
        const coordenadas = await lugar.getLugarLatLng(direccion);
        const temperatura = await clima.getClima(coordenadas.lat, coordenadas.lng);

        console.log(`El clima de ${coordenadas.address} es de ${temperatura}`);
    } catch (error) {
        console.log(`No se pudo determinar el clima de ${direccion}`);
    }
}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);



// lugar.getLugarLatLng(argv.direccion)
//     .then(console.log)
//     .catch(console.log);

// clima.getClima('-79.88333', '-2.18333')
//     .then(console.log)
//     .catch(console.log);



// const encodedDireccion = encodeURI(argv.direccion);
// console.log(encodedDireccion);

// const access_token = 'pk.eyJ1IjoidW9iYW5kbyIsImEiOiJja2F1NWF1emswdnhoMnJyMjFmY2U0OWw4In0.PWfJ-TS1EIYpr7ug87zRPA';
// const instance = axios.create({
//     baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedDireccion}.json?access_token=${access_token}`,
// });

// instance.get()
//     .then(res => {
//         console.log(res.data.features[0].center[0]);
//     })
//     .catch(err => {
//         console.log('Error:', err);
//     })