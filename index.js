const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const { ObjectId } = require("mongodb");

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

        //Task get api
        app.get("/tasks", async (req, res) => {
            const result = await taskCollection.find().toArray();
            res.send(result);
        });

        // Get task by email API
        app.get("/task/:email", async (req, res) => {
            const email = req.params.email;

            try {
                const result = await taskCollection
                    .find({ email: email })
                    .toArray();
                if (result.length === 0) {
                    return res
                        .status(404)
                        .send([]);
                }
                res.status(200).send(result);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                res.status(500).send({ message: "Error fetching tasks." });
            }
        });

        //Put task api
        app.put("/task/:id", async (req, res) => {
            const { id } = req.params;
            const { category } = req.body;

            try {
                const result = await taskCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { category: category } }
                );

                if (result.modifiedCount === 0) {
                    return res
                        .status(404)
                        .json({ message: "Task not found or already updated" });
                }

                res.status(200).json({ message: "Task updated successfully" });
            } catch (error) {
                console.error("Error updating task:", error);
                res.status(500).json({ message: "Error updating task", error });
            }
        });

        //Delete task api
        app.delete("/task/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const result = await taskCollection.deleteOne({
                    _id: new ObjectId(id),
                });

                if (result.deletedCount === 1) {
                    res.send({
                        success: true,
                        message: "Task deleted successfully!",
                    });
                } else {
                    res.status(404).send({
                        success: false,
                        message: "Task not found!",
                    });
                }
            } catch (error) {
                console.error("Error deleting task:", error);
                res.status(500).send({
                    success: false,
                    message: "Internal server error",
                });
            }
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
