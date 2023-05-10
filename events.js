/* eslint-disable no-unused-vars */
const EventModel = require('./eventModel');
const apiCallFromRequest = require('./util');
var request = require('request');


const updateEvents = async (req, res) => {
    try {
        let finalData = [];

        const url1 = "http://194.195.119.155:7000/match-list?token=ancffvtgbhnjm345yhdfdhhdhhdhjjskk";
        apiCallFromRequest.callApi(url1, function (response) {

            const apiData = JSON.parse(response)
            const result1 = apiData.result.result;
            const resultData = result1;
            resultData.forEach(async function (d) {
                if (d.sportId === "4") {
                    var eventName = d.eventName;
                    var eventId = d.eventId
                    var marketId = d.marketId;
                    var myobj = { eventName: eventName, eventId: eventId, marketId: marketId };
                    let output=[];
                    const addedOrUpdatedEvents = await EventModel.findOneAndUpdate({ eventId: eventId }, myobj, { new: true, upsert: true });

                    const url2 = 'http://194.195.119.155:7000/match-data/' + marketId + '?token=ancffvtgbhnjm345yhdfdhhdhhdhjjskk';
                    output= apiCallFromRequest.callApi(url2, function (response1) {
                        const apiData1 = JSON.parse(response1)
                        const result2 = apiData1.result[marketId];
                        if (result2.diamond !== null) {
                            const diamondData = JSON.parse(result2.diamond);
                            const t3data = diamondData.data.t3;
                            if (t3data != null) {
                               finalData[marketId] =
                                {
                                    'T3': {
                                        'MID': t3data[0]['mid'],
                                        'SID': t3data[0]['sid'],
                                        'NAT': t3data[0]['nat']
                                    }
                                }
                            }
                        }
                        console.log("finalData",finalData[marketId]);
                        return (finalData[marketId]);
                    });
                }
            });
            // res.json(finalData);

        });
       
        // res.json(true);
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    updateEvents
};