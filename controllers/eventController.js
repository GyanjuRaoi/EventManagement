const Event = require('../models/eventModel');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

exports.getEvents = (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.decode(token)
    req.user = decoded;

    const events = Event.getEvents();

    res.render('eventList', { events, req: req });
}

exports.getEventForm = (req, res) => {
    const event = req.params.id ? Event.getEventById(req.params.id) : null;
    res.render('eventForm', {event, token: req.query.token })
}

exports.createEvent = (req, res) => {
    const { title, description, participants, start_date, end_date } = req.body;
    const newEvent = {
        id: uuidv4(),
        title,
        description,
        participants: participants,
        start_date,
        end_date,
        user_id: req.user.id 
    }
    Event.createEvent(newEvent);
    res.redirect('/');
}

exports.updateEvent = (req, res) => {
    const { id } = req.params;
    const { title, description, participants, start_date, end_date } = req.body;
    const updateEvent = {
        title,
        description,
        participants: participants,
        start_date,
        end_date,
        user_id: req.user.id
    }
    Event.updateEvent(id, updateEvent);
    res.redirect('/');
}

exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    Event.deleteEvent(id)
    res.redirect('/');
}

exports.getEventByTitle = (req, res) => {
    const { title } = req.query;
    const filteredEvent = Event.getEventByTitle(title);
    res.json(filteredEvent);
}

exports.getEventByDate = (req, res) => {
    const { startDate , endDate } = req.query;
    const filteredEvent = Event.getEventByDate(startDate, endDate);
    res.json(filteredEvent);
}