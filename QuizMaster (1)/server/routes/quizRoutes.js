const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');

// GET /api/quizzes - Get all available quizzes (metadata & question count only)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search && search.trim() !== '') {
      query.title = { $regex: search.trim(), $options: 'i' };
    }

    const quizzes = await Quiz.find(query).select('title description category difficulty timeLimit questions createdAt');

    // Transform to include question count without sending full questions array
    const quizSummaries = quizzes.map(q => ({
      _id: q._id,
      title: q.title,
      description: q.description,
      category: q.category,
      difficulty: q.difficulty,
      timeLimit: q.timeLimit,
      questionCount: q.questions.length,
      createdAt: q.createdAt
    }));

    res.json({ success: true, count: quizSummaries.length, data: quizSummaries });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ success: false, message: 'Server error fetching quizzes' });
  }
});

// GET /api/quizzes/:id - Get quiz questions WITHOUT correct answers (for taking the quiz)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    // CRITICAL: Strip out correctOption and explanation so client cannot inspect network tab for answers
    const sanitizedQuestions = quiz.questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options
    }));

    res.json({
      success: true,
      data: {
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        category: quiz.category,
        difficulty: quiz.difficulty,
        timeLimit: quiz.timeLimit,
        totalQuestions: sanitizedQuestions.length,
        questions: sanitizedQuestions
      }
    });
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    res.status(500).json({ success: false, message: 'Server error fetching quiz' });
  }
});

// POST /api/quizzes/:id/submit - Submit answers, calculate score server-side, save attempt to MongoDB
router.post('/:id/submit', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    const { studentName, answers = {}, timeTakenSeconds = 0 } = req.body;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const detailedAnswers = quiz.questions.map(question => {
      const qIdStr = question._id.toString();
      const userSelected = answers[qIdStr];

      const isAnswered = userSelected !== undefined && userSelected !== null && userSelected !== -1;
      let isCorrect = false;

      if (!isAnswered) {
        unansweredCount++;
      } else if (Number(userSelected) === question.correctOption) {
        correctCount++;
        isCorrect = true;
      } else {
        incorrectCount++;
      }

      return {
        questionId: qIdStr,
        questionText: question.questionText,
        options: question.options,
        selectedOption: isAnswered ? Number(userSelected) : null,
        correctOption: question.correctOption,
        isCorrect,
        explanation: question.explanation || ''
      };
    });

    const totalQuestions = quiz.questions.length;
    const score = correctCount;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Save attempt to MongoDB
    const attempt = new Attempt({
      quizId: quiz._id,
      quizTitle: quiz.title,
      category: quiz.category,
      studentName: studentName && studentName.trim() ? studentName.trim() : 'Guest Student',
      totalQuestions,
      score,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unansweredQuestions: unansweredCount,
      percentage,
      timeTakenSeconds,
      answers: detailedAnswers
    });

    const savedAttempt = await attempt.save();

    res.status(201).json({
      success: true,
      message: 'Quiz submitted and evaluated successfully',
      data: savedAttempt
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ success: false, message: 'Server error processing quiz submission' });
  }
});

// POST /api/quizzes - Create a new quiz (Feature 5: Quiz Management)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, difficulty, timeLimit, questions } = req.body;

    if (!title || !category || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Quiz title, valid category, and at least 1 question are required.'
      });
    }

    // Validate each question structure
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText || !Array.isArray(q.options) || q.options.length < 2) {
        return res.status(400).json({
          success: false,
          message: `Question #${i + 1} must have question text and at least 2 options.`
        });
      }
      if (typeof q.correctOption !== 'number' || q.correctOption < 0 || q.correctOption >= q.options.length) {
        return res.status(400).json({
          success: false,
          message: `Question #${i + 1} has an invalid correct option index.`
        });
      }
    }

    const newQuiz = new Quiz({
      title: title.trim(),
      description: description ? description.trim() : '',
      category,
      difficulty: difficulty || 'Medium',
      timeLimit: timeLimit ? Math.max(1, Number(timeLimit)) : 5,
      questions
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: {
        _id: savedQuiz._id,
        title: savedQuiz.title,
        category: savedQuiz.category,
        difficulty: savedQuiz.difficulty,
        timeLimit: savedQuiz.timeLimit,
        questionCount: savedQuiz.questions.length
      }
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error creating quiz' });
  }
});

// DELETE /api/quizzes/:id - Delete a quiz
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.json({ success: true, message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ success: false, message: 'Server error deleting quiz' });
  }
});

module.exports = router;
