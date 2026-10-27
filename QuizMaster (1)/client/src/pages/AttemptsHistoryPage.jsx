import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import quizApi from '../api/quizApi';
import { IconTrophy, IconClock, IconArrowRight, IconAlert } from '../components/Icons';

const AttemptsHistoryPage = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttempts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await quizApi.getAttempts();
      if (res.success) {
        setAttempts(res.data || []);
      } else {
        setError(res.message || 'Failed to fetch attempts');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '900px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2>Recent Quiz Attempts</h2>
          <p className="section-subtitle">
            All submitted quiz results saved in the MongoDB <code>attempts</code> collection.
          </p>
        </div>

        {error && (
          <div className="alert-box">
            <IconAlert size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Fetching records from MongoDB...</p>
          </div>
        ) : attempts.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <IconTrophy size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
            <h3>No attempts recorded yet</h3>
            <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Take a quiz to see your score and submission history recorded here!
            </p>
            <Link to="/quizzes" className="btn btn-primary">
              Take Your First Quiz
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {attempts.map((att) => {
              const formattedDate = new Date(att.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              const isPass = (att.percentage || 0) >= 60;

              return (
                <div
                  key={att._id}
                  className="card card-hover"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span className="badge badge-programming">{att.category}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formattedDate}</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: '0.2rem 0' }}>
                      {att.quizTitle}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Student: <strong>{att.studentName || 'Student'}</strong> • Time: {att.timeTakenSeconds || 0}s
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '800',
                          color: isPass ? '#059669' : '#dc2626'
                        }}
                      >
                        {att.percentage}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {att.score} / {att.totalQuestions} Points
                      </div>
                    </div>

                    <Link to={`/results/${att._id}`} className="btn btn-secondary btn-sm">
                      <span>Review</span>
                      <IconArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptsHistoryPage;
