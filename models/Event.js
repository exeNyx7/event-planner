const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    category: String,
    reminder: { type: Date, required: false },
    // Remove userEmail field
});

module.exports = mongoose.model('Event', eventSchema);
