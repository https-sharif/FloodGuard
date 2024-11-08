import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
const app = express();
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

client.connect(err => {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
        return;
    }
    console.log('Connected to MongoDB');
    const victimCollections = client.db("flood_guard").collection("victim-posts");

    app.post('/submit-victim', async (req, res) => {
        try {
            const victimData = req.body;
            const result = await victimCollections.insertOne(victimData);
            res.status(201).send(result);
        } catch (error) {
            console.error('Error inserting victim data', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/submit-victims', (req, res) => {
    const victimData = req.body;
    console.log(victimData);
    res.send('GET request received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
