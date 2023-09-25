const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("./userSchema")
const Population = require('./Papulation');

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://0.0.0.0/employee', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');


        app.use(express.json());
        app.use(cors());

        app.get('/', (req, resp) => {
            resp.send('App is Working');
        });

        app.post('/register', async (req, resp) => {
            try {
                const user = new User(req.body);
                let result = await user.save();
                result = result.toObject();
                if (result) {
                    delete result.password;
                    resp.send(req.body);
                    console.log(result);
                } else {
                    console.log('User already registered');
                }
            } catch (e) {
                console.error(e);
                resp.status(500).send('Something Went Wrong');
            }
        });


        app.post('/login', async (req, res) => {
            const { email, password } = req.body;

            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return res.status(400).json({ message: 'User not found' });
                }

                if (password !== user.password) {
                    return res.status(401).json({ message: 'Invalid Password' });
                }

                const userRole = user.role;

                const token = jwt.sign({ user }, 'your-secret-key', { expiresIn: '1h' });
                res.status(200).json({ messege: 'Login successful', role: userRole, token });

            } catch (error) {
                console.error(error);
                res.status(500).send('Something Went Wrong');
            }
        });

        // ADD Operation
        app.post('/add-population', async (req, resp) => {
            try {
                const populationData = new Population(req.body);
                const result = await populationData.save();
                resp.status(201).json(result);
            } catch (e) {
                console.error(e);
                resp.status(500).send('Something Went Wrong');
            }
        });

        // Read Operation
        app.get('/get-population', async (req, resp) => {
            try {
                const populationData = await Population.find();
                resp.status(200).json(populationData);
            } catch (e) {
                console.error(e);
                resp.status(500).send('Something Went Wrong');
            }
        });


        // Update Operation
        app.put('/update-population/:id', async (req, resp) => {
            try {
                const { id } = req.params;
                const updatedPopulationData = await Population.findByIdAndUpdate(
                    id,
                    req.body,
                    { new: true }
                );

                if (!updatedPopulationData) {
                    return resp.status(404).json({ message: 'Population data not found' });
                }

                resp.status(200).json(updatedPopulationData);
            } catch (e) {
                console.error(e);
                resp.status(500).send('Something Went Wrong');
            }
        });

        // Delete Operation
        app.delete('/delete-population/:id', async (req, resp) => {
            try {
                const { id } = req.params;
                const deletedPopulationData = await Population.findByIdAndRemove(id);

                if (!deletedPopulationData) {
                    return resp.status(404).json({ message: 'Population data not found' });
                }

                resp.status(200).json({ message: 'Population data deleted successfully' });
            } catch (e) {
                console.error(e);
                resp.status(500).send('Something Went Wrong');
            }
        });

        app.listen(8080, () => {
            console.log('App is listening on port 8080');
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

connectToDatabase();
