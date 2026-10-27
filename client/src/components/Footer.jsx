import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h4>QuizMaster</h4>
            <p>
              An interactive, full-stack online quiz platform engineered for continuous learning, assessment, and academic evaluation.
            </p>
            <span className="footer-academic-badge">
              B.Tech Computer Science & Engineering • 3rd Semester Project
            </span>
          </div>

          <div className="footer-links">
            <h5>Platform</h5>
            <ul>
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/quizzes">Explore Quizzes</Link></li>
              <li><Link to="/create-quiz">Create New Quiz</Link></li>
              <li><Link to="/history">Recent Attempts</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>Categories</h5>
            <ul>
              <li><Link to="/quizzes?category=Programming">Programming</Link></li>
              <li><Link to="/quizzes?category=Computer Science">Computer Science</Link></li>
              <li><Link to="/quizzes?category=Aptitude">Aptitude & Logic</Link></li>
              <li><Link to="/quizzes?category=General Knowledge">General Knowledge</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h5>Architecture</h5>
            <ul>
              <li><Link to="/about">System Architecture</Link></li>
              <li><Link to="/about">Database Schema</Link></li>
              <li><Link to="/about">Evaluation Viva Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} QuizMaster Platform. Built for academic evaluation.</p>
          <div className="footer-tech-stack">
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">Express.js</span>
            <span className="tech-tag">MongoDB</span>
            <span className="tech-tag">Mongoose</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
