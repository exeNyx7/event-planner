const request = require('supertest');
const app = require('../server'); // Import your Express app
const mongoose = require('mongoose');
require('dotenv').config();

// Close database connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Event Management', () => {

    // Test event creation
    test('Create a new event and send email', async () => {
        const res = await request(app)
            .post('/events/create')
            .send({
                name: 'Test Event',
                description: 'Automated Test Event',
                date: '2025-03-20T10:00:00',
                category: 'Meetings',
                email: 'i222414@nu.edu.pk'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Event created and email sent successfully');
        expect(res.body.event).toHaveProperty('_id');
    });

    // Test fetching events
    test('Fetch upcoming events', async () => {
        const res = await request(app).get('/events/upcoming');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});
