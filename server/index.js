const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("./userSchema")

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/employee', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');

        app.use(express.json());
        app.use(cors());

        app.get('/', (req, resp) => {
            resp.send('App is Working');
        });

        app.post('/register', async (req, res) => {
            try {
                const user = new User(req.body);
                let result = await user.save();
                result = result.toObject();
                if (result) {
                    delete result.password;
                    res.send(req.body);
                    console.log(result);
                } else {
                    console.log('User already registered');
                }
            } catch (e) {
                console.error(e);
                res.status(500).send('Something Went Wrong');
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
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

               
                const token = jwt.sign({ user }, 'your-secret-key', { expiresIn: '1h' });
                res.json({ token });
                
            } catch (error) {
                console.error(error);
                res.status(500).send('Something Went Wrong');
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
