const express = require('express');
const app = express();
const port = process.env.port || 3000;
require('dotenv').config();



app.get('/', (req, res) => {
    res.send("To Do is ready for you");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})