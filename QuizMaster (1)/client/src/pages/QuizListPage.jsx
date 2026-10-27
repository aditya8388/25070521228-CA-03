import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import quizApi from '../api/quizApi';
import QuizCard from '../components/QuizCard';
import { IconSearch, IconAlert } from '../components/Icons';

const categories = ['All', 'Programming', 'Computer Science', 'Aptitude', 'General Knowledge'];

const QuizListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync category state when URL search param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Fetch quizzes from Express backend & MongoDB
  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await quizApi.getQuizzes({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        search: searchQuery.trim() || undefined
      });
      if (response.success) {
        setQuizzes(response.data || []);
      } else {
        setError(response.message || 'Failed to load quizzes');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to QuizMaster backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [selectedCategory]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchQuizzes();
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2>Available Quizzes</h2>
          <p className="section-subtitle">
            Explore and take online quizzes across Programming, Computer Science, Aptitude, and General Knowledge.
          </p>
        </div>

        {/* Filter Bar with Category Tabs and Search Input */}
        <div className="filter-bar">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="search-box">
            <IconSearch size={18} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search quizzes..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Error Alert with Retry */}
        {error && (
          <div className="alert-box">
            <IconAlert size={22} />
            <div style={{ flex: 1 }}>
              <strong>Connection Error:</strong> {error}
            </div>
            <button onClick={fetchQuizzes} className="btn btn-secondary btn-sm">
              Retry
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading quizzes from MongoDB...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <h3>No quizzes found</h3>
            <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              No quizzes matched the selected category or search filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizListPage;
