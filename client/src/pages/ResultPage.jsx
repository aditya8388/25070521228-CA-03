import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import quizApi from '../api/quizApi';
import {
  IconTrophy,
  IconCheck,
  IconX,
  IconMinus,
  IconArrowRight,
  IconClock,
  IconAlert
} from '../components/Icons';

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

const ResultPage = () => {
  const { attemptId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(location.state?.attempt || null);
  const [loading, setLoading] = useState(!location.state?.attempt);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If not passed via state (e.g. user refreshed the page or shared link), fetch from MongoDB API
    if (!attempt && attemptId) {
      const fetchAttempt = async () => {
        try {
          const res = await quizApi.getAttemptById(attemptId);
          if (res.success && res.data) {
            setAttempt(res.data);
          } else {
            setError(res.message || 'Attempt record not found');
          }
        } catch (err) {
          setError(err.message || 'Error loading attempt record');
        } finally {
          setLoading(false);
        }
      };
      fetchAttempt();
    }
  }, [attemptId, attempt]);

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Calculating score and loading results from MongoDB...</p>
        </div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
          <div className="alert-box">
            <IconAlert size={24} />
            <div>{error || 'Result details could not be retrieved'}</div>
          </div>
          <Link to="/quizzes" className="btn btn-primary">
            Explore Quizzes
          </Link>
        </div>
      </div>
    );
  }

  // Performance status logic
  const percentage = attempt.percentage ?? Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100);
  let statusTitle = 'Quiz Completed!';
  let statusColor = 'var(--primary)';

  if (percentage >= 80) {
    statusTitle = 'Outstanding Performance! 🏆';
    statusColor = '#059669';
  } else if (percentage >= 60) {
    statusTitle = 'Good Job! 👍';
    statusColor = '#2563eb';
  } else if (percentage >= 40) {
    statusTitle = 'Satisfactory Effort! 📚';
    statusColor = '#d97706';
  } else {
    statusTitle = 'Needs Improvement! 💪';
    statusColor = '#dc2626';
  }

  return (
    <div className="page-wrapper">
      <div className="container result-container">
        {/* Hero Score Card */}
        <div className="result-hero-card">
          {/* Circular Percentage Ring */}
          <div className="score-badge-circle" style={{ borderColor: statusColor }}>
            <span className="score-percentage-text" style={{ color: statusColor }}>
              {percentage}%
            </span>
            <span className="score-fraction-text">
              {attempt.score} / {attempt.totalQuestions} Points
            </span>
          </div>

          <h2 className="result-status-title" style={{ color: statusColor }}>
            {statusTitle}
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            Quiz: <strong>{attempt.quizTitle}</strong> ({attempt.category})
          </p>

          {/* 4 Metrics Grid */}
          <div className="result-summary-grid">
            <div className="result-summary-box">
              <div className="result-summary-val" style={{ color: 'var(--text-main)' }}>
                {attempt.totalQuestions}
              </div>
              <div className="result-summary-label">Total Questions</div>
            </div>

            <div className="result-summary-box" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
              <div className="result-summary-val" style={{ color: '#059669' }}>
                {attempt.correctAnswers}
              </div>
              <div className="result-summary-label" style={{ color: '#059669' }}>Correct Answers</div>
            </div>

            <div className="result-summary-box" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
              <div className="result-summary-val" style={{ color: '#dc2626' }}>
                {attempt.incorrectAnswers}
              </div>
              <div className="result-summary-label" style={{ color: '#dc2626' }}>Incorrect Answers</div>
            </div>

            <div className="result-summary-box" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
              <div className="result-summary-val" style={{ color: '#d97706' }}>
                {attempt.unansweredQuestions}
              </div>
              <div className="result-summary-label" style={{ color: '#d97706' }}>Unanswered</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link to="/quizzes" className="btn btn-primary btn-lg">
              <span>Try Another Quiz</span>
              <IconArrowRight size={18} />
            </Link>
            <Link to="/" className="btn btn-secondary btn-lg">
              <span>Return to Home</span>
            </Link>
          </div>
        </div>

        {/* Detailed Answer Review Section */}
        {attempt.answers && attempt.answers.length > 0 && (
          <div className="answers-review-section">
            <div className="section-header">
              <div>
                <h2>Question-by-Question Review</h2>
                <p className="section-subtitle">
                  Inspect your answers, see correct solutions, and read explanations.
                </p>
              </div>
            </div>

            {attempt.answers.map((ans, idx) => {
              const isAnswered = ans.selectedOption !== null && ans.selectedOption !== undefined && ans.selectedOption !== -1;
              const cardClass = !isAnswered ? 'unanswered' : ans.isCorrect ? 'correct' : 'incorrect';

              return (
                <div key={idx} className={`answer-card ${cardClass}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                      QUESTION {idx + 1}
                    </span>

                    {/* Status Pill */}
                    {ans.isCorrect ? (
                      <span className="badge" style={{ background: '#ecfdf5', color: '#059669' }}>
                        <IconCheck size={14} /> Correct (+1)
                      </span>
                    ) : isAnswered ? (
                      <span className="badge" style={{ background: '#fef2f2', color: '#dc2626' }}>
                        <IconX size={14} /> Incorrect (0)
                      </span>
                    ) : (
                      <span className="badge" style={{ background: '#fffbeb', color: '#d97706' }}>
                        <IconMinus size={14} /> Unanswered (0)
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                    {ans.questionText}
                  </h4>

                  {/* Options review list */}
                  {ans.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {ans.options.map((optText, optIdx) => {
                        const isCorrectOption = optIdx === ans.correctOption;
                        const isUserChoice = optIdx === ans.selectedOption;

                        let optStyle = {
                          padding: '0.65rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          background: '#ffffff'
                        };

                        if (isCorrectOption) {
                          optStyle.background = '#ecfdf5';
                          optStyle.borderColor = '#10b981';
                          optStyle.color = '#065f46';
                          optStyle.fontWeight = '600';
                        } else if (isUserChoice && !ans.isCorrect) {
                          optStyle.background = '#fef2f2';
                          optStyle.borderColor = '#ef4444';
                          optStyle.color = '#991b1b';
                          optStyle.fontWeight = '600';
                        }

                        return (
                          <div key={optIdx} style={optStyle}>
                            <span style={{ fontWeight: '700', minWidth: '22px' }}>
                              {optionLetters[optIdx]}.
                            </span>
                            <span style={{ flex: 1 }}>{optText}</span>
                            {isCorrectOption && (
                              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>
                                ✓ Correct Answer
                              </span>
                            )}
                            {isUserChoice && !isCorrectOption && (
                              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#dc2626' }}>
                                ✗ Your Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation Note */}
                  {ans.explanation && (
                    <div className="answer-explanation-box">
                      <strong>💡 Explanation: </strong>
                      {ans.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
