import React from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconCode, IconCpu, IconTrophy } from '../components/Icons';

const AboutPage = () => {
  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '850px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="hero-pill" style={{ marginBottom: '1rem' }}>
            <span>🎓</span>
            <span>Academic Project Documentation</span>
          </div>
          <h2>About QuizMaster</h2>
          <p className="section-subtitle">
            Online Quiz Platform built for B.Tech Computer Science & Engineering (3rd Semester) Academic Project Evaluation.
          </p>
        </div>

        {/* Project Overview Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>1. Project Overview</h3>
          <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
            <strong>QuizMaster</strong> is a full-stack web application developed following modern MERN principles (React, Express, Node.js, and MongoDB). It provides students with timed assessments in Programming, Core Computer Science, Aptitude, and General Knowledge with instantaneous, tamper-proof server-side evaluation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: '8px' }}>
              <strong>Frontend:</strong> React 19, Vite, React Router 7, Vanilla CSS
            </div>
            <div style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: '8px' }}>
              <strong>Backend:</strong> Node.js, Express.js REST API
            </div>
            <div style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: '8px' }}>
              <strong>Database:</strong> MongoDB with Mongoose ODM
            </div>
            <div style={{ background: 'var(--bg-muted)', padding: '1rem', borderRadius: '8px' }}>
              <strong>GUI Tool:</strong> MongoDB Compass
            </div>
          </div>
        </div>

        {/* Architectural Flow Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--accent-purple)' }}>2. Technical Architecture & Security Flow</h3>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', lineHeight: '1.6' }}>
            <li>
              <strong>Sanitized Question Delivery:</strong> When a student requests a quiz via <code>GET /api/quizzes/:id</code>, the Express server strips away <code>correctOption</code> and <code>explanation</code> fields before dispatching JSON. This ensures the student cannot inspect network tabs or client memory to cheat.
            </li>
            <li>
              <strong>Server-Side Score Calculation:</strong> Answers are sent via <code>POST /api/quizzes/:id/submit</code>. The server cross-verifies answers against the authentic answer key stored in MongoDB and calculates correct, incorrect, and unanswered totals.
            </li>
            <li>
              <strong>Persistent MongoDB Attempt Records:</strong> Each completed quiz attempt is saved in the <code>attempts</code> collection with timestamps, score percentages, and question breakdowns for review.
            </li>
            <li>
              <strong>Configurable Deployment:</strong> All frontend API calls use <code>VITE_API_URL</code>, allowing seamless one-line migration from local development to Render hosting.
            </li>
          </ul>
        </div>

        {/* Student Viva / Evaluation Preparation Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--cat-apt)' }}>3. Student Project Evaluation & Viva Q&A</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>Q: Why is score evaluation performed on the backend instead of the React frontend?</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong>A:</strong> Security and integrity. If answer keys were sent to the client, any student could open browser Developer Tools (Console/Network) and find the answers beforehand. Calculating on the server guarantees academic fairness.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>Q: How do you verify database entries in MongoDB Compass?</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong>A:</strong> Open MongoDB Compass, connect to <code>mongodb://localhost:27017</code>, locate the <code>quizmaster</code> database, and inspect the <code>quizzes</code> and <code>attempts</code> collections where each document is stored with an <code>_id</code> ObjectId.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>Q: How does the countdown timer handle automatic submission?</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong>A:</strong> The <code>Timer</code> component maintains state with a 1-second <code>setInterval</code>. When remaining seconds reach 0, an <code>onTimeUp</code> callback triggers <code>handleSubmitQuiz()</code>, packaging user answers and posting them to the Express backend.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link to="/quizzes" className="btn btn-primary btn-lg">
            <span>Start Exploring Quizzes</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
