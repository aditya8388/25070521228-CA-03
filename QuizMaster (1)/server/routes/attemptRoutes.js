const express = require('express');
const router = express.Router();
const Attempt = require('../models/Attempt');

// GET /api/attempts - Get recent attempts
router.get('/', async (req, res) => {
  try {
    const attempts = await Attempt.find()
      .select('quizTitle category studentName totalQuestions score percentage timeTakenSeconds createdAt')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ success: true, count: attempts.length, data: attempts });
  } catch (error) {
    console.error('Error fetching attempts:', error);
    res.status(500).json({ success: false, message: 'Server error fetching attempts' });
  }
});

// GET /api/attempts/:id - Get single attempt details (with answers review)
router.get('/:id', async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt record not found' });
    }

    res.json({ success: true, data: attempt });
  } catch (error) {
    console.error('Error fetching attempt details:', error);
    res.status(500).json({ success: false, message: 'Server error fetching attempt' });
  }
});

module.exports = router;
