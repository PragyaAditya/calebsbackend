 const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userroutes');
const placeRoutes = require('./routes/placeroutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);


app.use('/api/places', placeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
