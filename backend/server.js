const express = require('express');
const mysql = require('mysql2/promise'); 
const cors = require('cors');
const firebase = require('firebase-admin'); 
require('dotenv').config();

const app = express();
app.use(cors({
  orgin:process.env.Connect
}));
app.use(express.json());

// MySQL connection pool for better performance
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verify Firebase ID Token middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user info to the request
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(403).json({ error: 'Invalid token' });
  }
};

// MySQL connection
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL!');
    connection.release(); 
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
  }
};

testConnection(); 

// Route to register a new user
app.post('/register-user', async (req, res) => {
  const { uid, email, displayName } = req.body;
  const query = 'INSERT INTO users (firebase_uid, email, display_name) VALUES (?, ?, ?)';

  try {
    const [result] = await db.query(query, [uid, email, displayName]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error storing user:', err);
    res.status(500).json({ error: 'Failed to store user' });
  }
});

// get events of a specific user 
app.get('/events/:id', async (req, res) => {
  const userId = req.params.id; // Get userId from request parameters
  const query = 'SELECT * FROM events WHERE user_id = ?';

  try {
    const [results] = await db.query(query, [userId]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// add a new event
app.post('/events', async (req, res) => {
  const { userId,event_date, name, description } = req.body; 
  
  const query = 'INSERT INTO events (user_id, event_date, name, description) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await db.query(query, [userId,event_date, name, description]);
    res.status(201).json({ message: 'Event added successfully' });
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).json({ error:"Internal server error" });
  }
});

// delete an event
app.delete('/events/:id', async (req, res) => {
  const eventId = req.params.id; 
  const query = 'DELETE FROM events WHERE id = ?'; // Make sure to mention 'id' 

  try {
    const [result] = await db.query(query, [eventId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
