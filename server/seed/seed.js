require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
const sampleQuizzes = require('./seedData');
const { connectDB, disconnectDB } = require('../config/db');

const seedDatabase = async () => {
  try {
    console.log('[Seeder] Connecting to database...');
    await connectDB();

    console.log('[Seeder] Clearing existing quizzes and attempts...');
    await Quiz.deleteMany({});
    await Attempt.deleteMany({});

    console.log(`[Seeder] Inserting ${sampleQuizzes.length} rich sample quizzes...`);
    const inserted = await Quiz.insertMany(sampleQuizzes);

    console.log(`[Seeder] Successfully seeded ${inserted.length} quizzes into MongoDB!`);
    inserted.forEach((q, idx) => {
      console.log(`  ${idx + 1}. [${q.category}] ${q.title} (${q.questions.length} questions, ${q.timeLimit} mins)`);
    });

    if (require.main === module) {
      await disconnectDB();
      console.log('[Seeder] Database connection closed. Done!');
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seeder Error] Failed to seed database:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
