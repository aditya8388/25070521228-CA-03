import React from 'react';

const QuestionPalette = ({ totalQuestions, currentIndex, answers, onSelectQuestion }) => {
  const answeredCount = Object.keys(answers).filter(
    (key) => answers[key] !== undefined && answers[key] !== null && answers[key] !== -1
  ).length;

  return (
    <div className="palette-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span className="palette-title">Question Navigator</span>
        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)' }}>
          {answeredCount} / {totalQuestions} Answered
        </span>
      </div>

      <div className="palette-grid">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = answers[index] !== undefined && answers[index] !== null && answers[index] !== -1;

          let btnClass = 'palette-btn';
          if (isCurrent) btnClass += ' current';
          if (isAnswered) btnClass += ' answered';

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => onSelectQuestion(index)}
              title={`Jump to Question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPalette;
