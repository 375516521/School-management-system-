const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db.js");
const Routes = require("./routes/route.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON parsing
app.use(express.json({ limit: '10mb' }));

// Enable CORS specifically for your frontend
app.use(cors({
    origin: 'http://localhost:3000', //  React frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Connect to MongoDB
connectDB();

// API routes
app.use('/api', Routes);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
