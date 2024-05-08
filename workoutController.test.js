const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');

const { getWorkout, editWorkout, getWorkouts, createWorkout } = require('../learning-mern-stack/backend/controllers/workoutController');
const workoutModel = require('../learning-mern-stack/backend/models/workoutModel');
const workoutRoutes = require('../learning-mern-stack/backend/routes/workouts')
const app = new express();

app.use('/', workoutRoutes);

describe('getWorkouts: GET multiple workouts by url/', function () {
    test('responds with workouts and total pages', async () => {
        // Mock countDocuments to return a fixed value
        const countDocumentsSpy = jest.spyOn(workoutModel, 'countDocuments').mockResolvedValue(10);

        const findSpy = jest.spyOn(workoutModel, "find").mockImplementationOnce(() => ({
            limit: () => ({
                skip: () => ({
                    sort: () => [{
                        _id: '613712f7b7025984b080cea9',
                        name: 'mock workout 1',
                        createdAt: new Date('2024-05-01T00:00:00.000Z')
                    },{
                        _id: '578df3efb618f5141202a196',
                        name: 'mock workout 2',
                        createdAt: new Date('2024-05-02T00:00:00.000Z')
                    }]
                })
            })
        }))

        const res = await request(app).get('/');

        expect(countDocumentsSpy).toHaveBeenCalled();
        expect(findSpy).toHaveBeenCalled();

        expect(res.status).toBe(200);

        expect(res.body.workouts).toEqual([
            {
                _id: '613712f7b7025984b080cea9',
                name: 'mock workout 1',
                createdAt: '2024-05-01T00:00:00.000Z'
            },
            {
                _id: '578df3efb618f5141202a196',
                name: 'mock workout 2',
                createdAt: '2024-05-02T00:00:00.000Z'
            }
        ]);
        expect(res.body.totalPages).toBe(5); 

        
        countDocumentsSpy.mockRestore();
        findSpy.mockRestore();
    });
});


describe('getWorkout: GET workout by id url/${id}', function () {
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

describe('createWorkout: POST workout', () => {
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

describe('deleteWorkout: DELETE workout by id url/${id}', () => {
    test('responds with the deleted workout when a valid id is provided', async () => {
        const validId = new mongoose.Types.ObjectId("578df3efb618f5141202a196");
        const mockWorkout = { _id: validId, name: 'mock workout'};
        const spy = jest.spyOn(workoutModel, "findOneAndDelete");
        spy.mockReturnValue(mockWorkout);
        
        const res = await request(app).delete(`/${validId}`);
        expect(res.statusCode).toBe(200);
    });

    test('responds with a 404 error when an invalid id is provided', async () => {
        const invalidId = 'invalidId';
        const res = await request(app).delete(`/${invalidId}`)


        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'No such workout' });
    });
});

describe('editWorkout: PUT workout by id', () => {
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
        const invalidId = 'invalidId';
        const res = await request(app).put(`/${invalidId}`)
    

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'No such workout' });
    });
});