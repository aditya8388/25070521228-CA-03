const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  options: {
    type: [String],
    required: [true, 'At least 2 options are required'],
    validate: {
      validator: function(opts) {
        return opts && opts.length >= 2;
      },
      message: 'A question must have at least 2 options.'
    }
  },
  correctOption: {
    type: Number,
    required: [true, 'Correct option index is required'],
    min: 0
  },
  explanation: {
    type: String,
    default: ''
  }
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Programming', 'Computer Science', 'Aptitude', 'General Knowledge']
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    timeLimit: {
      type: Number, // in minutes
      required: true,
      default: 5,
      min: 1
    },
    questions: {
      type: [questionSchema],
      required: [true, 'At least one question is required'],
      validate: {
        validator: function(q) {
          return q && q.length > 0;
        },
        message: 'A quiz must contain at least one question.'
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
