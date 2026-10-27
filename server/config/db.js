const mongoose = require('mongoose');

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quizmaster';

  try {
    // Attempt connecting to the configured URI (Compass / local mongod / MongoDB Atlas)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000 // Quick timeout so we don't hang if local mongod is offline
    });
    console.log(`[MongoDB] Connected successfully to: ${mongoose.connection.host}/${mongoose.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Could not connect to primary URI (${uri}): ${error.message}`);
    console.log('[MongoDB] Starting embedded MongoDB memory server for seamless local testing...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbName: 'quizmaster'
        }
      });
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[MongoDB Embedded] Connected successfully to in-memory MongoDB at: ${memoryUri}`);
      console.log('[MongoDB Compass] You can connect MongoDB Compass to this URI while the server is running!');
      return true;
    } catch (memError) {
      // If port 27017 was taken or another error, try with dynamic port
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoMemoryServer = await MongoMemoryServer.create();
        const fallbackUri = mongoMemoryServer.getUri();
        await mongoose.connect(fallbackUri);
        console.log(`[MongoDB Embedded] Connected to in-memory MongoDB at: ${fallbackUri}`);
        return true;
      } catch (finalError) {
        console.error('[MongoDB Error] Failed to initialize any database connection:', finalError.message);
        return false;
      }
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
  } catch (err) {
    console.error('Error disconnecting DB:', err.message);
  }
};

module.exports = { connectDB, disconnectDB };
