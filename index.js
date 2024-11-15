import express from "express";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");

        const db = client.db("flood_guard");
        const victimsCollection = db.collection("victims");
        const volunteersCollection = db.collection("volunteers");
        const coordinatesCollection = db.collection("coordinates");

        app.post("/submit-victim", async (req, res) => {
            try {
                const victimData = req.body;
                console.log("Received victim data:", victimData);
                const insertResult = await victimsCollection.insertOne(
                    victimData
                );
                res.status(200).json({
                    message: "Victim data stored successfully",
                    data: insertResult,
                });
            } catch (err) {
                console.error("Error storing victim data:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });

        app.get("/get-victim", async (req, res) => {
            try {
                const victims = await victimsCollection.find().toArray();
                console.log("Victims data:", victims);
                res.status(200).json({ data: victims });
            } catch (err) {
                console.error("Error fetching victims:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });

        app.post("/delete-victim", async (req, res) => {
            try {
                const { id } = req.body;
                const deleteResult = await victimsCollection.deleteOne({
                    _id: new ObjectId(id),
                });
                if (deleteResult.deletedCount === 1) {
                    res.status(200).json({
                        message: "Victim data deleted successfully",
                    });
                } else {
                    res.status(404).json({ message: "Victim not found" });
                }
            } catch (err) {
                console.error("Error deleting victim data:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });

        app.post("/submit-volunteer", async (req, res) => {
            try {
                const volunteerData = req.body;
                console.log("Received volunteer data:", volunteerData);
                const insertResult = await volunteersCollection.insertOne(
                    volunteerData
                );
                res.status(200).json({
                    message: "Volunteer data stored successfully",
                    data: insertResult,
                });
            } catch (err) {
                console.error("Error storing volunteer data:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });

        app.get("/get-volunteer", async (req, res) => {
            try {
                const volunteers = await volunteersCollection.find().toArray();
                res.status(200).json({ data: volunteers });
            } catch (err) {
                console.error("Error fetching volunteer:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });

        app.get("/display-volunteer", async (req, res) => {
            try {
                const dataToDisplay = await volunteersCollection
                    .find()
                    .toArray();

                const processedData = dataToDisplay.map((item) => ({
                    name: item.name,
                    age: item.age,
                    location: item.location,
                }));

                res.status(200).json({ data: processedData });
            } catch (err) {
                console.error("Error displaying collected data:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });

        app.post("/delete-volunteer", async (req, res) => {
            try {
                const { id } = req.body;
                const deleteResult = await volunteersCollection.deleteOne({
                    _id: new ObjectId(id),
                });
                if (deleteResult.deletedCount === 1) {
                    res.status(200).json({
                        message: "Volunteer data deleted successfully",
                    });
                } else {
                    res.status(404).json({ message: "Volunteer not found" });
                }
            } catch (err) {
                console.error("Error deleting volunteer data:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });

        app.post("/coordinate", async (req, res) => {
            try {
                const { coordinates, type } = req.body;
                const updateResult = await coordinatesCollection.insertOne({
                    coordinates,
                    type,
                });

                res.status(200).json({
                    message: "Coordinates stored successfully",
                    data: updateResult,
                });
            } catch (err) {
                console.error("Error updating coordinates:", err);
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
        });
    } finally {
        process.on("SIGINT", async () => {
            await client.close();
            console.log("MongoDB connection closed.");
            process.exit();
        });
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
