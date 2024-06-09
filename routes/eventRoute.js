const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const middleware = require('../middleware/middleware');

router.get('/', eventController.getEvents);
router.get('/new', middleware, eventController.getEventForm);
router.post('/new', middleware, eventController.createEvent);
router.get('/update/:id', middleware, eventController.getEventForm);
router.post('/update/:id', middleware, eventController.updateEvent);
router.post('/delete/:id', middleware, eventController.deleteEvent);
router.get('/search', eventController.getEventByTitle);
router.get('/filter', eventController.getEventByDate);

module.exports = router;