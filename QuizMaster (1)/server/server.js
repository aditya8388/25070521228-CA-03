require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const Quiz = require('./models/Quiz');
const sampleQuizzes = require('./seed/seedData');
const quizRoutes = require('./routes/quizRoutes');
const attemptRoutes = require('./routes/attemptRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing for React frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);

// Health check endpoint (for Render / monitoring)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'QuizMaster — Online Quiz Platform',
    semester: 'B.Tech CSE 3rd Semester Project',
    timestamp: new Date().toISOString()
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to QuizMaster Backend API',
    endpoints: {
      quizzes: '/api/quizzes',
      quizById: '/api/quizzes/:id',
      submitQuiz: '/api/quizzes/:id/submit',
      attempts: '/api/attempts',
      health: '/api/health'
    }
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server and Database
const startServer = async () => {
  const connected = await connectDB();
  if (connected) {
    // If the database has no quizzes yet, auto-seed sample questions
    try {
      const count = await Quiz.countDocuments();
      if (count === 0) {
        console.log('[Server] No quizzes detected in MongoDB. Auto-seeding initial academic quizzes...');
        await Quiz.insertMany(sampleQuizzes);
        console.log(`[Server] Auto-seeded ${sampleQuizzes.length} quizzes successfully.`);
      } else {
        console.log(`[Server] Database ready with ${count} existing quizzes.`);
      }
    } catch (seedErr) {
      console.warn('[Server] Auto-seed check notice:', seedErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 QuizMaster Backend running on port ${PORT}`);
    console.log(`📡 API Base: http://localhost:${PORT}/api`);
    console.log(`🩺 Health:   http://localhost:${PORT}/api/health`);
    console.log(`===============================================`);
  });
};

startServer();
