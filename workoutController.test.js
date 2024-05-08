const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');

const { getWorkout, deleteWorkout, editWorkout, getWorkouts, createWorkout } = require('../learning-mern-stack/backend/controllers/workoutController');
const workoutModel = require('../learning-mern-stack/backend/models/workoutModel');
const workoutRoutes = require('../learning-mern-stack/backend/routes/workouts')
const app = new express();

app.use('/', workoutRoutes);

describe.only('Test getWorkouts', function () {
    test('responds with workouts and total pages', async () => {
        // Mock countDocuments to return a fixed value
        const countDocumentsSpy = jest.spyOn(workoutModel, 'countDocuments').mockResolvedValue(10);

        const findSpy = jest.spyOn(workoutModel, "find").mockImplementationOnce(() => ({
            limit: () => ({
                skip: () => ({
                    sort: () => [{
                        _id: '613712f7b7025984b080cea9',
                        name: 'mock workout 1',
                        createdAt: new Date('2024-05-01')
                    },{
                        _id: '578df3efb618f5141202a196',
                        name: 'mock workout 2',
                        createdAt: new Date('2024-05-02')
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


describe('GET workout by id url/${id}', function () {
    test('responds with a 404 error when an invalid id is provided', async () => {
        const invalidId ='invalidId';
        const res = await request(app).get(`/${invalidId}`)

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'No such workout' });
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

describe('createWorkout', () => {
    test('responds with 400 when error occurs', async () => {
         // Mock request body
         const req = { body: { title: 'Test Workout', load: 100, reps: 10 } };
         // Mock response object
         const res = {
             status: jest.fn().mockReturnThis(), // Mock status method
             json: jest.fn() // Mock json method
         };
         // Mocking the WorkoutModel.create method to throw an error
         jest.spyOn(workoutModel, 'create').mockRejectedValue(new Error('Database error'));
         
         // Call the createWorkout function with the mock request and response
         await createWorkout(req, res);
 
         // Check if status method is called with 400
         expect(res.status).toHaveBeenCalledWith(400);
         // Check if json method is called with error message
         expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
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
    test('responds with 200 when workout is edited', async () => {
        const validId = new mongoose.Types.ObjectId("578df3efb618f5141202a196");
        const mockWorkout = { _id: validId, title: 'Updated Title', load: 5, reps: 10 };
        const updatedWorkout = {title: 'Updated Title', load: 5, reps: 10};

        const findOneAndUpdateSpy = jest.spyOn(workoutModel, 'findOneAndUpdate');
        findOneAndUpdateSpy.mockResolvedValue(mockWorkout);
        
        const res = await request(app)
        .put(`/${validId}`)
        .send(updatedWorkout);
        
        expect(res.statusCode).toBe(200);
    });

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