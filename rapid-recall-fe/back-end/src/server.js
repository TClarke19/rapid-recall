require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const app = express();

// Google OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3001/api/google/oauth"
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

    // Create JWT with user info
    const token = jwt.sign({
        user: {
            email: userInfo.data.email,
            name: userInfo.data.name,
            picture: userInfo.data.picture
        }
    }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Create JWT with user info
    //const token = jwt.sign({ user: userInfo.data }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Create JWT
    //const token = jwt.sign(tokens, process.env.JWT_SECRET);

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/?token=${token}`);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});