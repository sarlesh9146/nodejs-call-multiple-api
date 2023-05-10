
const https = require('http');



const callExternalApiUsingHttp = (url, callback) => {
    // _EXTERNAL_URL = 'http://194.195.119.155:7000/match-list?token=ancffvtgbhnjm345yhdfdhhdhhdhjjskk';
    _EXTERNAL_URL = url;

    https.get(_EXTERNAL_URL, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            return callback(data);
            // console.log(JSON.stringify(data));
        });

    }).on("error", (err) => {

        console.log("Error: " + err.message);
    });
}

module.exports.callApi = callExternalApiUsingHttp;