const client = require('./database/rapid-recall-db')
require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Connect to MongoDB Compass
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define the User model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

// Define the Project model
const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Project = mongoose.model('Project', projectSchema);

// Define the Flashcard model
const flashcardSchema = new mongoose.Schema({
    front: String,
    back: String,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// Google OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3001/api/google/oauth"
);

/*app.get('/api/test', async (req, res) => {
    try {
        const collection = client.db().collection("grades")
        const documents = await collection.find({}).toArray();
        console.log(documents);
        res.json(documents);
    } catch (error) {
        console.error('Error fetching data from database: ', error);
        res.status(500).send('Internal Server Error');
    } 
});*/

// Redirect to Google Authentication URL
app.get('/api/google/login', (req, res) => {
    console.log('Redirecting to Google Authentication URL');
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
    });
    console.log('Google Auth URL:', url);  // Log the URL
    res.redirect(url);
});

// Google OAuth callback
app.get('/api/google/oauth', async (req, res) => {
    console.log('Received callback from Google', req.query);
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    // Get user info from Google
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    let user = await User.findOne({ email: userInfo.data.email });

    if (!user) {
        // Create a new user if not found
        user = new User({
            email: userInfo.data.email
        });
        await user.save();
    }

    // Create JWT with user info and MongoDB user ID
    const token = jwt.sign({
        user: {
            _id: user._id,
            email: user.email,
            name: userInfo.data.name,
            picture: userInfo.data.picture
        }
    }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Create a new project
    app.post('/api/projects', async (req, res) => {
        try {
            const { name, description } = req.body;
            const token = req.headers.authorization.split(' ')[1]; // Assumes Bearer token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const project = new Project({
                name,
                description,
                user: decoded.user._id
            });

            await project.save();
            res.status(201).json(project);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // Get projects for a user
    app.get('/api/projects', async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const projects = await Project.find({ user: decoded.user._id });
            res.json(projects);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // Delete a project
    app.delete('/api/projects/:id', async (req, res) => {
        try {
            await Project.findByIdAndDelete(req.params.id);
            res.status(200).send('Project deleted');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // POST endpoint to create a flashcard
    app.post('/api/flashcards', async (req, res) => {
        try {
            const { front, back, projectId } = req.body;
            const flashcard = new Flashcard({ front, back, projectId });
            await flashcard.save();
            res.status(201).json(flashcard);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

// Endpoint to get flashcards for a specific project
    app.get('/api/flashcards/:projectId', async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const flashcards = await Flashcard.find({ projectId: projectId });
            res.json(flashcards);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // Delete a flashcard
    app.delete('/api/flashcards/:id', async (req, res) => {
        try {
            await Flashcard.findByIdAndDelete(req.params.id);
            res.status(200).send('Flashcard deleted');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/?token=${token}`);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});