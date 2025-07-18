require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./models/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// ✅ UPDATED CORS CONFIGURATION
// For development and testing, allow all origins.
// In production, you should restrict this to your actual frontend URL(s).
app.use(cors({
  origin: ['http://localhost:3000', 'https://cosmi5finalfront.vercel.app/'], // Explicitly list allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow all common methods including OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'], // Crucial for sending JSON and JWT tokens
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
});
