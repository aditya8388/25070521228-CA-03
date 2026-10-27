import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QuizListPage from './pages/QuizListPage';
import QuizTakePage from './pages/QuizTakePage';
import ResultPage from './pages/ResultPage';
import CreateQuizPage from './pages/CreateQuizPage';
import AttemptsHistoryPage from './pages/AttemptsHistoryPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<QuizListPage />} />
        <Route path="/quiz/:id" element={<QuizTakePage />} />
        <Route path="/results/:attemptId" element={<ResultPage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/history" element={<AttemptsHistoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
