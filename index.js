const express = require("express");
const app = express();
const port = process.env.port || 3000;
const cors = require("cors");
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(cors());

//Mongodb Connection

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8eefy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        //collections
        const database = client.db("todoTask");

        const userCollection = database.collection("users");
        const taskCollection = database.collection("tasks");

        //User post api
        app.post("/user", async (req, res) => {
            const user = req.body;

            const existingUser = await userCollection.findOne({
                email: user.email,
            });
            if (existingUser) {
                res.send("User already exists");
                return;
            }

            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        //Task post api
        app.post("/task", async (req, res) => {
            const task = req.body;

            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("To Do is ready for you");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
