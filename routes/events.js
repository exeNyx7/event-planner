const express = require('express');
const Event = require('../models/Event');
const sendReminderEmail = require('../services/reminder'); // Import email function

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { name, description, date, category, email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required to send a notification' });
        }

        const event = new Event({ name, description, date, category });
        await event.save();

        // Send email immediately after event is created
        await sendReminderEmail(email, name, date);

        res.json({ message: 'Event created and email sent successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
});


// Get all upcoming events
router.get('/upcoming', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 }); // Sort by date
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
});

module.exports = router;
