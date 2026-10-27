import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizApi from '../api/quizApi';
import Timer from '../components/Timer';
import QuestionPalette from '../components/QuestionPalette';
import { IconArrowLeft, IconArrowRight, IconCheck, IconAlert } from '../components/Icons';

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

const QuizTakePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [studentName, setStudentName] = useState('CSE Student');
  const [startTime] = useState(Date.now());
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isSubmittingRef = useRef(false);

  // Fetch quiz data (sanitized without answers from backend)
  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await quizApi.getQuizById(id);
        if (response.success && response.data) {
          setQuiz(response.data);
        } else {
          setError(response.message || 'Quiz could not be loaded');
        }
      } catch (err) {
        setError(err.message || 'Error connecting to QuizMaster backend');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // Option selection handler
  const handleSelectOption = (optionIndex) => {
    if (!quiz || !quiz.questions[currentIndex]) return;
    const currentQId = quiz.questions[currentIndex]._id;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQId]: optionIndex
    }));
  };

  // Previous & Next navigation
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (quiz && currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Submit quiz to backend
  const handleSubmitQuiz = async () => {
    if (isSubmittingRef.current || !quiz) return;
    isSubmittingRef.current = true;
    setSubmitting(true);
    setShowConfirmModal(false);

    try {
      const timeTakenSeconds = Math.round((Date.now() - startTime) / 1000);
      const payload = {
        studentName: studentName.trim() || 'Student',
        answers: userAnswers,
        timeTakenSeconds
      };

      const result = await quizApi.submitQuiz(quiz._id, payload);

      if (result.success && result.data) {
        // Navigate to results page passing the saved attempt record
        navigate(`/results/${result.data._id}`, { state: { attempt: result.data } });
      } else {
        alert(result.message || 'Failed to evaluate quiz submission');
        isSubmittingRef.current = false;
        setSubmitting(false);
      }
    } catch (err) {
      alert(`Submission error: ${err.message}`);
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  };

  // Handle countdown timer expiration: auto submit!
  const handleTimeUp = () => {
    if (!isSubmittingRef.current) {
      alert('Time is up! Your answers are being submitted automatically.');
      handleSubmitQuiz();
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Preparing quiz questions...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
          <div className="alert-box">
            <IconAlert size={24} />
            <div>{error || 'Quiz not found'}</div>
          </div>
          <button onClick={() => navigate('/quizzes')} className="btn btn-primary">
            Return to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const selectedOption = currentQuestion ? userAnswers[currentQuestion._id] : undefined;

  // Count answered questions
  const answeredCount = Object.keys(userAnswers).filter(
    (key) => userAnswers[key] !== undefined && userAnswers[key] !== null && userAnswers[key] !== -1
  ).length;

  return (
    <div className="page-wrapper">
      <div className="container quiz-take-wrapper">
        {/* Top Header: Title, Category Badge, Countdown Timer */}
        <div className="quiz-take-header">
          <div className="quiz-take-title-group">
            <h2>{quiz.title}</h2>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="badge badge-programming">{quiz.category}</span>
              <span className="badge badge-difficulty-medium">{quiz.difficulty}</span>
            </div>
          </div>

          <Timer initialMinutes={quiz.timeLimit || 5} onTimeUp={handleTimeUp} />
        </div>

        {/* Progress Bar & Counter */}
        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-info">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>{answeredCount} Answered</span>
          </div>
        </div>

        {/* Question & Options Card */}
        {currentQuestion && (
          <div className="question-box">
            <span className="question-number-badge">
              QUESTION {currentIndex + 1}
            </span>

            <h3 className="question-text">{currentQuestion.questionText}</h3>

            <div className="options-list">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    className={`option-button ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <div className="option-indicator">
                      {optionLetters[optIdx] || optIdx + 1}
                    </div>
                    <span style={{ flex: 1 }}>{optionText}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Controls: Previous, Next, Submit */}
        <div className="quiz-action-bar">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="btn btn-secondary"
          >
            <IconArrowLeft size={18} />
            <span>Previous</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {currentIndex < totalQuestions - 1 ? (
              <button onClick={handleNext} className="btn btn-primary">
                <span>Next</span>
                <IconArrowRight size={18} />
              </button>
            ) : null}

            <button
              onClick={() => {
                if (answeredCount < totalQuestions) {
                  setShowConfirmModal(true);
                } else {
                  handleSubmitQuiz();
                }
              }}
              disabled={submitting}
              className="btn btn-purple"
            >
              <IconCheck size={18} />
              <span>{submitting ? 'Submitting...' : 'Submit Quiz'}</span>
            </button>
          </div>
        </div>

        {/* Question Palette Navigation */}
        <QuestionPalette
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          answers={quiz.questions.map((q) => userAnswers[q._id])}
          onSelectQuestion={(idx) => setCurrentIndex(idx)}
        />
      </div>

      {/* Confirmation Modal when unanswered questions remain */}
      {showConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem'
          }}
        >
          <div className="card" style={{ maxWidth: '460px', width: '100%', padding: '2rem' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Confirm Quiz Submission</h3>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>
              You have answered <strong>{answeredCount}</strong> out of{' '}
              <strong>{totalQuestions}</strong> questions.{' '}
              {totalQuestions - answeredCount} question(s) will be marked as unanswered.
              Are you sure you want to submit now?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary btn-sm"
              >
                Keep Answering
              </button>
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="btn btn-purple btn-sm"
              >
                {submitting ? 'Submitting...' : 'Yes, Submit Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTakePage;
