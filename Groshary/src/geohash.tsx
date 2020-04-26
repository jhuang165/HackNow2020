import geohash from 'ngeohash';

function getGeohash() {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(pos => {
            const hash = geohash.encode(pos.coords.latitude, pos.coords.longitude);
            resolve(hash);
        })
    });
}

export { getGeohash };