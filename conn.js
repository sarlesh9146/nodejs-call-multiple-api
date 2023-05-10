/* eslint-disable no-undef */
const mongoose = require('mongoose');

let mongoUrl = 'mongodb://127.0.0.1:27017/sample_test';

module.exports.connectDB = async () => {
    try {
        await mongoose.connect(`${mongoUrl}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('*** Database connected successfully ***');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        // process.exit(1);
    }
};
