import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizApi from '../api/quizApi';
import { IconPlus, IconTrash, IconCheck, IconAlert } from '../components/Icons';

const categories = ['Programming', 'Computer Science', 'Aptitude', 'General Knowledge'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const initialQuestion = () => ({
  questionText: '',
  options: ['', '', '', ''],
  correctOption: 0,
  explanation: ''
});

const CreateQuizPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Programming');
  const [difficulty, setDifficulty] = useState('Medium');
  const [timeLimit, setTimeLimit] = useState(5);
  const [questions, setQuestions] = useState([initialQuestion(), initialQuestion()]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle question text change
  const handleQuestionTextChange = (qIndex, text) => {
    const updated = [...questions];
    updated[qIndex].questionText = text;
    setQuestions(updated);
  };

  // Handle option text change
  const handleOptionTextChange = (qIndex, optIndex, text) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = text;
    setQuestions(updated);
  };

  // Handle correct option selection
  const handleCorrectOptionChange = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].correctOption = optIndex;
    setQuestions(updated);
  };

  // Handle explanation change
  const handleExplanationChange = (qIndex, text) => {
    const updated = [...questions];
    updated[qIndex].explanation = text;
    setQuestions(updated);
  };

  // Add question
  const handleAddQuestion = () => {
    setQuestions([...questions, initialQuestion()]);
  };

  // Remove question
  const handleRemoveQuestion = (qIndex) => {
    if (questions.length <= 1) {
      alert('A quiz must have at least one question.');
      return;
    }
    setQuestions(questions.filter((_, idx) => idx !== qIndex));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Please provide a quiz title.');
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        setErrorMessage(`Question #${i + 1} is missing question text.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setErrorMessage(`Question #${i + 1}, Option ${String.fromCharCode(65 + j)} cannot be empty.`);
          return;
        }
      }
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        difficulty,
        timeLimit: Number(timeLimit),
        questions: questions.map((q) => ({
          questionText: q.questionText.trim(),
          options: q.options.map((opt) => opt.trim()),
          correctOption: Number(q.correctOption),
          explanation: q.explanation.trim()
        }))
      };

      const res = await quizApi.createQuiz(payload);

      if (res.success) {
        alert('Quiz created successfully and stored in MongoDB!');
        navigate('/quizzes');
      } else {
        setErrorMessage(res.message || 'Failed to create quiz.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error communicating with server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="form-container">
          <div style={{ marginBottom: '2rem' }}>
            <h2>Create New Quiz</h2>
            <p className="section-subtitle">
              Add a new custom MCQ quiz to the QuizMaster database.
            </p>
          </div>

          {errorMessage && (
            <div className="alert-box">
              <IconAlert size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Quiz Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Object-Oriented Programming in C++"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Brief summary of quiz topics covered..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Row: Category, Difficulty, Time Limit */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select
                  className="form-control"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Time Limit (Minutes) *</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  className="form-control"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Questions Section */}
            <div style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Quiz Questions ({questions.length})</h3>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="btn btn-secondary btn-sm"
                >
                  <IconPlus size={16} />
                  <span>Add Another Question</span>
                </button>
              </div>

              {questions.map((q, qIdx) => (
                <div key={qIdx} className="question-creator-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>
                      QUESTION #{qIdx + 1}
                    </span>

                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIdx)}
                        style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}
                      >
                        <IconTrash size={16} />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter question text here..."
                      value={q.questionText}
                      onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                      required
                    />
                  </div>

                  {/* 4 Options with Radio to mark correct answer */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>
                      Options & Correct Answer (Select the radio of the correct choice):
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input
                            type="radio"
                            name={`correct-${qIdx}`}
                            checked={q.correctOption === optIdx}
                            onChange={() => handleCorrectOptionChange(qIdx, optIdx)}
                            title="Mark as correct answer"
                            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                          />
                          <span style={{ fontWeight: '700', fontSize: '0.9rem', minWidth: '18px' }}>
                            {String.fromCharCode(65 + optIdx)}:
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            style={{ padding: '0.5rem 0.75rem' }}
                            placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                            value={opt}
                            onChange={(e) => handleOptionTextChange(qIdx, optIdx, e.target.value)}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <input
                      type="text"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                      placeholder="Optional explanation shown in results (e.g. Why this is the correct answer)..."
                      value={q.explanation}
                      onChange={(e) => handleExplanationChange(qIdx, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => navigate('/quizzes')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                <IconCheck size={18} />
                <span>{loading ? 'Saving to Database...' : 'Save & Publish Quiz'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
