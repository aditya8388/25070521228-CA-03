import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import quizApi from '../api/quizApi';
import QuizCard from '../components/QuizCard';
import {
  IconCode,
  IconCpu,
  IconBrain,
  IconBookOpen,
  IconArrowRight,
  IconClock,
  IconTrophy,
  IconCheck
} from '../components/Icons';

const categories = [
  {
    name: 'Programming',
    title: 'Programming & Web',
    desc: 'Sharpen your skills in JavaScript, Python, OOPs, functions, and modern development standards.',
    icon: <IconCode size={26} />,
    colorClass: 'badge-programming',
    iconBg: '#eff6ff',
    iconColor: '#2563eb'
  },
  {
    name: 'Computer Science',
    title: 'Computer Science Core',
    desc: 'Master fundamental CSE subjects: Data Structures, Algorithms, Operating Systems, and DBMS.',
    icon: <IconCpu size={26} />,
    colorClass: 'badge-computer-science',
    iconBg: '#f5f3ff',
    iconColor: '#7c3aed'
  },
  {
    name: 'Aptitude',
    title: 'Quantitative & Logical',
    desc: 'Essential practice for competitive tests, campus placements, ratios, speed, and analytical logic.',
    icon: <IconBrain size={26} />,
    colorClass: 'badge-aptitude',
    iconBg: '#ecfdf5',
    iconColor: '#059669'
  },
  {
    name: 'General Knowledge',
    title: 'General & Tech Trivia',
    desc: 'Explore computing history, inventors, protocols, and science breakthroughs that shaped our world.',
    icon: <IconBookOpen size={26} />,
    colorClass: 'badge-general-knowledge',
    iconBg: '#fffbeb',
    iconColor: '#d97706'
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await quizApi.getQuizzes();
        if (response.success && response.data) {
          // Take top 3 for home page preview
          setFeaturedQuizzes(response.data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Could not load featured quizzes for home page:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="page-wrapper">
      {/* --------------------------------------------------------------------
          Hero Section
          -------------------------------------------------------------------- */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-pill">
            <span>✨</span>
            <span>B.Tech CSE 3rd Semester Project Showcase</span>
          </div>

          <h1 className="hero-title">
            Test Your Knowledge with <span className="hero-highlight">QuizMaster</span>
          </h1>

          <p className="hero-subtitle">
            A comprehensive, interactive online examination platform built for engineering students.
            Select your category, challenge yourself against the clock, and get instant server-calculated scores.
          </p>

          <div className="hero-actions">
            <Link to="/quizzes" className="btn btn-primary btn-lg">
              <span>Explore Quizzes</span>
              <IconArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg">
              <span>How It Works</span>
            </Link>
          </div>

          {/* Quick Stats Pill */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Core Domains</span>
            </div>
            <div className="hero-stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Server Evaluated</span>
            </div>
            <div className="hero-stat-item">
              <span className="stat-number">MERN</span>
              <span className="stat-label">Full Stack Stack</span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          Category Showcase
          -------------------------------------------------------------------- */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header-centered">
            <h2>Explore Quiz Categories</h2>
            <p className="section-subtitle">
              Choose from carefully curated questions tailored for engineering coursework and placement exams.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="card card-hover category-card"
                onClick={() => navigate(`/quizzes?category=${encodeURIComponent(cat.name)}`)}
              >
                <div
                  className="category-icon-box"
                  style={{ background: cat.iconBg, color: cat.iconColor }}
                >
                  {cat.icon}
                </div>

                <div>
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                </div>

                <div className="category-card-footer" style={{ color: cat.iconColor }}>
                  <span>View Quizzes</span>
                  <IconArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          Featured Quizzes from MongoDB
          -------------------------------------------------------------------- */}
      <section style={{ padding: '2.5rem 0 3.5rem' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Featured Quizzes</h2>
              <p className="section-subtitle">
                Live quizzes stored in MongoDB and served through our Express REST API.
              </p>
            </div>
            <Link to="/quizzes" className="btn btn-secondary btn-sm">
              <span>View All Quizzes</span>
              <IconArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p>Fetching quizzes from database...</p>
            </div>
          ) : (
            <div className="quizzes-grid">
              {featuredQuizzes.map((quiz) => (
                <QuizCard key={quiz._id} quiz={quiz} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------------------
          Platform Highlights / Viva Features
          -------------------------------------------------------------------- */}
      <section style={{ padding: '3rem 0', background: '#ffffff', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header-centered">
            <h2>Engineered For Academic Excellence</h2>
            <p className="section-subtitle">
              Key design and architectural highlights built into QuizMaster.
            </p>
          </div>

          <div className="categories-grid">
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <IconClock size={32} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Live Countdown Timer</h3>
              <p>
                Strict time management with automatic background submission when time runs out, preventing overtime answers.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>
                <IconTrophy size={32} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Server-Side Evaluation</h3>
              <p>
                Correct answer keys never leave the server during the quiz. Scores and percentages are computed securely in Node.js.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>
                <IconCheck size={32} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>MongoDB Persistence</h3>
              <p>
                Quiz metadata and student attempt results are permanently recorded in MongoDB Compass-compatible collections.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
