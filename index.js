const express = require('express');
const firebaseAdmin = require('firebase-admin');
const { PubSub } = require('@google-cloud/pubsub');
const rateLimit = require('express-rate-limit');

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault(),
});

const db = firebaseAdmin.firestore();
const pubsub = new PubSub();
const app = express();
const port = process.env.PORT || 8080;

// In-memory rate limiter for each button (can be replaced with Redis)
const rateLimitMemory = {
    blue: { count: 0, timestamp: Date.now() },
    red: { count: 0, timestamp: Date.now() },
};

// Rate limit configuration
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit each button click to 10 per minute
    message: 'Rate limit exceeded. Try again later.',
});

app.use(limiter);

// Route for clicking a button (blue/red)
app.post('/click/:buttonColor', async (req, res) => {
    const buttonColor = req.params.buttonColor;
    const userIP = req.ip;
    const timestamp = new Date().toISOString();

    // Rate-limiting logic (using in-memory here for simplicity)
    const currentTime = Date.now();
    const limit = 10;

    if (rateLimitMemory[buttonColor]) {
        const lastClickTime = rateLimitMemory[buttonColor].timestamp;
        const timeDifference = currentTime - lastClickTime;

        if (timeDifference < 60 * 1000) {
            // Rate limit exceeded, send notification via Pub/Sub
            if (rateLimitMemory[buttonColor].count >= limit) {
                const message = {
                    buttonColor,
                    timestamp,
                    userIP,
                };

                await publishRateLimitExceededMessage(message);
                return res.status(429).send('Rate limit exceeded for this button');
            }
        } else {
            // Reset the count if it's more than a minute ago
            rateLimitMemory[buttonColor].count = 0;
            rateLimitMemory[buttonColor].timestamp = currentTime;
        }

        // Log the click in Firestore
        try {
            await db.collection('buttonClicks').add({
                buttonColor,
                timestamp,
                userIP,
            });
            rateLimitMemory[buttonColor].count += 1; // Increment the click count
            res.status(200).send('Click logged successfully');
        } catch (error) {
            res.status(500).send('Error logging click: ' + error.message);
        }
    } else {
        return res.status(400).send('Invalid button color');
    }
});

// Publish a message to Google Cloud Pub/Sub when rate limit is exceeded
async function publishRateLimitExceededMessage(message) {
    const topicName = 'rate-limit-notifications'; // The name of your Pub/Sub topic
    const dataBuffer = Buffer.from(JSON.stringify(message));

    try {
        await pubsub.topic(topicName).publish(dataBuffer);
        console.log('Published message to Pub/Sub:', message);
    } catch (error) {
        console.error('Error publishing to Pub/Sub:', error);
    }
}

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
