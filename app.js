/* eslint-disable no-undef */
const express = require('express');
const routes = require('./route');
const db = require('./conn');
const app = express();
var cronJob = require('cron').CronJob;  

// Set no cache headers
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});



// Test database connection
try {
    db.connectDB();
    console.log('Database connection to databases have been established successfully.');
} catch (err) {
    console.log('Database connection failed');
    console.log(err);
    process.exit(1);
}

//Add Api Routes 
app.use(routes);


var job = new cronJob({ 
    cronTime:'0 */10 * * * *', 
    onTick: function(){
        var my_date = new Date();
        var tomorrow_date = my_date.getFullYear() + "-" + ('0'+(my_date.getMonth()+1)) + "-" + (my_date.getDate()+1)
        var condition = [{},{$set: {'plannedDeliveryDate' :tomorrow_date +'T00:00:00.000Z'}}]
        // dbQuery.updateMany(orderModel, condition, function(err, result){
        //     if(result.nModified == result.n) console.log(err, result)
        // })
    },
    start:true,
    timeZone:'Asia/Kolkata'
});
job.start();

const server = app.listen(3000, function () {
    console.log('Listening on port ' + server.address().port);
});


module.exports = server;
