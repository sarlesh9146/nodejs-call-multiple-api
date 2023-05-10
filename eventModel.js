const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventId: {
        type: String,
    },
    eventName: {
        type: String,

    },
    marketId: {
        type: String,

    },
}, {
    versionKey: false,
    timestamps: true
});
const EventModel = mongoose.model('events', eventSchema);
module.exports = EventModel;
