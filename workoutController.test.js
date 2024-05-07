const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');

const { getWorkout, deleteWorkout, editWorkout, getWorkouts } = require('../learning-mern-stack/backend/controllers/workoutController');
const workoutModel = require('../learning-mern-stack/backend/models/workoutModel');
const workoutRoutes = require('../learning-mern-stack/backend/routes/workouts')
const app = new express();

app.use('/', workoutRoutes);

describe('Test getWorkouts', function () {
    test('responds with workouts and total pages', async () => {
        // Mock countDocuments to return a fixed value
        const countDocumentsSpy = jest.spyOn(workoutModel, 'countDocuments').mockResolvedValue(10);

        const findSpy = jest.spyOn(workoutModel, "find").mockImplementationOnce(() => ({
            limit: () => ({
                skip: () => ({
                    sort: () => [{
                        _id: '613712f7b7025984b080cea9',
                        name: 'mock workout',
                        createdAt: new Date('2024-05-01')
                    }]
                })
            })
        }))

        // Mock req and res objects
        const req = { query: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Call the getWorkouts function
        await getWorkouts(req, res);

        // Check if the WorkoutModel methods were called
        expect(countDocumentsSpy).toHaveBeenCalledWith({ deleted: null });
        expect(findSpy).toHaveBeenCalledWith({ deleted: null });

        expect(res.status).toHaveBeenCalledWith(200);

        // Restore the original methods
        countDocumentsSpy.mockRestore();
        findSpy.mockRestore();
    });
});


describe('Test getWorkout', function () {
    test('responds with a 404 error when an invalid id is provided', async () => {
        const req = { params: { id: 'invalidId' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No such workout' });
    });

    test('respond with 200', async () => {
        const validId = new mongoose.Types.ObjectId("578df3efb618f5141202a196");
        const mockWorkout = { _id: validId, name: 'mock workout'};
        const spy = jest.spyOn(workoutModel, "findById");
        spy.mockReturnValue(mockWorkout);

        const res = await request(app).get(`/${validId}`);
        expect(res.statusCode).toBe(200);
    });
});


describe('deleteWorkout', () => {
    test('responds with the deleted workout when a valid id is provided', async () => {
        const validId = new mongoose.Types.ObjectId("578df3efb618f5141202a196");
        const mockWorkout = { _id: validId, name: 'mock workout'};
        const spy = jest.spyOn(workoutModel, "findOneAndDelete");
        spy.mockReturnValue(mockWorkout);
        
        const res = await request(app).delete(`/${validId}`);
        expect(res.statusCode).toBe(200);
    });

    test('responds with a 404 error when an invalid id is provided', async () => {
        const req = { params: { id: 'invalidId' } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await deleteWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No such workout' });
    });
});

describe('editWorkout', () => {
    // test('responds with 200 when workout is edited', async () => {
    //     const validId = new mongoose.Types.ObjectId("578df3efb618f5141202a196");
    //     const body = {title: 'mock title', load: 2, reps: 2};
    //     const mockWorkout = { _id: validId, body};
    //     const spy = jest.spyOn(workoutModel, "findOneAndUpdate");
    //     spy.mockReturnValue(mockWorkout);

        
    //     const res = await request(app).put(`/${validId}`);
        
    //     expect(res.statusCode).toBe(200);
    // });

    test('responds with 404', async () => {
        const req = {   params: { id: 'invalidId' },
                        body: { title: 'title', load: 1, rep: 1} };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await editWorkout(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No such workout' });
    });
});