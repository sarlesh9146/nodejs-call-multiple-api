const router = require('express').Router();
const events = require('./events');

router.get('/events', events.updateEvents);


module.exports = router;