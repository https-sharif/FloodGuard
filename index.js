import express from 'express';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';

dotenv.config();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    const db = client.db('flood_guard');
    const victimsCollection = db.collection('victims');
    const volunteersCollection = db.collection('volunteers');
    const imageDbCollection = db.collection('imageDb')

    app.post('/submit-victim', async (req, res) => {
      try {
        const victimData = req.body;
        console.log('Received victim data:', victimData); 
        const insertResult = await victimsCollection.insertOne(victimData);
        res.status(200).json({ message: 'Victim data stored successfully', data: insertResult });
      } catch (err) {
        console.error('Error storing victim data:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
    });


    app.get('/get-victims', async (req, res) => {
      try {
        const victims = await victimsCollection.find().toArray();
        res.status(200).json({ data: victims });
      } catch (err) {
        console.error('Error fetching victims:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
    });


    app.post('/delete-victim', async (req, res) => {
      try {
        const { id } = req.body;
        const deleteResult = await victimsCollection.deleteOne({ _id: new ObjectId(id) });
        if (deleteResult.deletedCount === 1) {
          res.status(200).json({ message: 'Victim data deleted successfully' });
        } else {
          res.status(404).json({ message: 'Victim not found' });
        }
      } catch (err) {
        console.error('Error deleting victim data:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
    });


    app.post('/submit-volunteer', upload.single('image'), async (req, res) => {
      try {
        const volunteerData = req.body;
        console.log('Received volunteer data:', volunteerData);
        
        let imageId = null;
        if (req.file) {
          const imageData = req.file.buffer.toString('base64'); 
          const imageInsertResult = await imageDbCollection.insertOne({
            data: imageData,
            contentType: req.file.mimetype,
            filename: req.file.originalname,
          });
          imageId = imageInsertResult.insertedId;
        }

        
        const volunteerWithImage = { ...volunteerData, imageId };

        
        const insertResult = await volunteersCollection.insertOne(volunteerWithImage);
        res.status(200).json({ message: 'Volunteer data stored successfully', data: insertResult });
      } catch (err) {
        console.error('Error storing volunteer data:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
    });

    
    app.get('/get-volunteer', async (req, res) => {
      try {
        const volunteers = await volunteersCollection.aggregate([
          {
            $lookup: {
              from: 'imageDb',
              localField: 'imageId',
              foreignField: '_id',
              as: 'image',
            }
          }
        ]).toArray();
        
        
        const formattedVolunteers = volunteers.map(v => ({
          ...v,
          image: v.image.length ? v.image[0] : null
        }));
        
        res.status(200).json({ data: formattedVolunteers });
      } catch (err) {
        console.error('Error fetching volunteers:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
    });

    
    app.post('/delete-volunteer', async (req, res) => {
      try {
        const { id } = req.body;
        const deleteResult = await volunteersCollection.deleteOne({ _id: ObjectId(id) });
        if (deleteResult.deletedCount === 1) {
          res.status(200).json({ message: 'Volunteer data deleted successfully' });
        } else {
          res.status(404).json({ message: 'Volunteer not found' });
        }
      } catch (err) {
        console.error('Error deleting volunteer data:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }
    });

  } finally {
    process.on('SIGINT', async () => {
      await client.close();
      console.log("MongoDB connection closed.");
      process.exit();
    });
  }
}


run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on http: ${port}`);
});