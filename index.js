const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middle Ware
app.use(cors());
app.use(express.json());

// Mongo DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uzijp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Main Function
async function run() {
    await client.connect();
    const userCollection = client.db("Shop").collection("Product");
    const orderCollection = client.db("Shop").collection("Order");

    try {
        // Data Received from Client Site and Send to The Server Site
        app.post('/orders', async (req, res) => {
            const booking = req.body;
            const result = await orderCollection.insertOne(booking);
            res.send(result);
            console.log('Data Send from Server to Database');
        })
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);


// Server Home
app.get('/', async (req, res) => {
    res.send('Hello World ! This is server Home Page');
});

// Server Listen
app.listen(port, () => {
    console.log('Server is running', port);
})
// Database User : rajebul-alam-khokan
// database Pass : p5bmdPNRKV4ZQRXT