const axios = require('axios');

const appid = 'd8822a0e44bdfe527698fbe8cd74696a';

const getClima = async(lat, lgn) => {
    // Debo usar el await porque debo esperar a que la promesa se resuelva antes de retornar la información
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lgn}&appid=${appid}&units=metric`);

    return resp.data.main.temp;
}

module.exports = {
    getClima
}