import path from 'path';
import 'dotenv/config';
import express from 'express';
import { google} from 'googleapis';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import https from 'https';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_ATLAS_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

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
    "https://rapid-recall.online/api/google/oauth"
);

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
    res.redirect(`/?token=${token}`);
});

const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/rapid-recall.online/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/rapid-recall.online/fullchain.pem')}, app);

httpsServer.listen(443, ()=> {
    console.log('HTTPS Server running on port 443')
});