import React from 'react';
import { Link } from 'react-router-dom';
import { IconClock, IconArrowRight, IconBookOpen } from './Icons';

const QuizCard = ({ quiz }) => {
  // Category badge class
  const getCategoryClass = (category) => {
    switch (category) {
      case 'Programming': return 'badge-programming';
      case 'Computer Science': return 'badge-computer-science';
      case 'Aptitude': return 'badge-aptitude';
      case 'General Knowledge': return 'badge-general-knowledge';
      default: return 'badge-programming';
    }
  };

  // Difficulty badge class
  const getDifficultyClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'badge-difficulty-easy';
      case 'medium': return 'badge-difficulty-medium';
      case 'hard': return 'badge-difficulty-hard';
      default: return 'badge-difficulty-medium';
    }
  };

  return (
    <div className="card card-hover quiz-card">
      <div>
        {/* Header Badges */}
        <div className="quiz-card-header">
          <span className={`badge ${getCategoryClass(quiz.category)}`}>
            {quiz.category}
          </span>
          <span className={`badge ${getDifficultyClass(quiz.difficulty)}`}>
            {quiz.difficulty || 'Medium'}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="quiz-card-title">{quiz.title}</h3>
        <p className="quiz-card-desc">
          {quiz.description || 'Comprehensive multiple-choice quiz designed to evaluate your domain knowledge.'}
        </p>
      </div>

      <div>
        {/* Meta info: Questions count & Time limit */}
        <div className="quiz-meta-row">
          <div className="meta-item">
            <IconBookOpen size={16} />
            <span>{quiz.questionCount || (quiz.questions ? quiz.questions.length : 0)} Questions</span>
          </div>
          <div className="meta-item">
            <IconClock size={16} />
            <span>{quiz.timeLimit || 5} mins</span>
          </div>
        </div>

        {/* Start Quiz Action */}
        <Link to={`/quiz/${quiz._id}`} className="btn btn-primary btn-block" style={{ width: '100%' }}>
          <span>Start Quiz</span>
          <IconArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
