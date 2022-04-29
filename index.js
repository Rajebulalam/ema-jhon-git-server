const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middle Ware
app.use(cors());
app.use(express.json());

// Server Home
app.get('/', async (req, res) => {
    res.send('Hello World ! This is server Home Page');
});

// Server Listen
app.listen(port, () => {
    console.log('Server is running', port);
})