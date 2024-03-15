const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Survey = require('./surveyModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Use the cors middleware with dynamic origin setting
app.use(cors({ origin: '*' }));

// MongoDB Atlas connection URI
const uri = "mongodb+srv://raadhayp:ssHBaUDyqZZ1K2Ph@cluster0.8dptugt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

// Call the run function to establish the MongoDB Atlas connection
run().catch(console.dir);

// Endpoint to handle submission of survey data
app.post('/surveys', async (req, res) => {
    const surveyData = req.body;
    console.log('Received survey data:', surveyData);
    
    try {
        // Create a new Survey document using the Mongoose model
        const survey = new Survey(surveyData);
        // Save the survey document to the database
        await survey.save();
        res.status(201).json({ message: 'Survey data received and stored successfully.' });
    } catch (error) {
        console.error('Error saving survey data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Endpoint to retrieve survey data (optional)
app.get('/surveys', async (req, res) => {
    try {
        // Retrieve all survey data from the database
        const surveys = await Survey.find();
        res.status(200).json({ message: 'Survey data retrieved successfully.', data: surveys });
    } catch (error) {
        console.error('Error retrieving survey data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
