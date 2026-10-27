import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconLogo, IconPlus } from './Icons';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-wrapper">
            <IconLogo size={22} />
          </div>
          <span>QuizMaster</span>
          <span className="brand-badge">CSE Project</span>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="navbar-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/quizzes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Explore Quizzes
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Recent Attempts
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                About Project
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-quiz" className="btn btn-primary btn-sm nav-cta">
                <IconPlus size={16} />
                <span>Create Quiz</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
