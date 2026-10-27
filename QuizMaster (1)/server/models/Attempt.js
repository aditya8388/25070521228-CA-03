const mongoose = require('mongoose');

const attemptAnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  selectedOption: {
    type: Number, // 0..3 or null/-1 if skipped
    default: null
  },
  correctOption: {
    type: Number,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
});

const attemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    quizTitle: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    studentName: {
      type: String,
      default: 'Student'
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    correctAnswers: {
      type: Number,
      required: true
    },
    incorrectAnswers: {
      type: Number,
      required: true
    },
    unansweredQuestions: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    timeTakenSeconds: {
      type: Number,
      default: 0
    },
    answers: [attemptAnswerSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Attempt', attemptSchema);
