/**
 * QuizMaster Centralized API Client
 * Single place to configure the backend URL for both local dev and Render deployment.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch requests and throw descriptive errors
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = (data && data.message) || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Could not connect to QuizMaster backend. Ensure the server is running on port 5000.');
    }
    throw err;
  }
};

export const quizApi = {
  // Fetch all quizzes with optional category and search filters
  getQuizzes: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') {
      query.append('category', params.category);
    }
    if (params.search) {
      query.append('search', params.search);
    }
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/quizzes${queryString}`);
  },

  // Fetch single quiz questions without answers (for quiz taking)
  getQuizById: async (id) => {
    return request(`/quizzes/${id}`);
  },

  // Submit answers to server for calculation & MongoDB persistence
  submitQuiz: async (id, payload) => {
    return request(`/quizzes/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Create new quiz (Basic Quiz Management)
  createQuiz: async (quizData) => {
    return request('/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData)
    });
  },

  // Get recent quiz attempts / leaderboard
  getAttempts: async () => {
    return request('/attempts');
  },

  // Get specific attempt result by ID
  getAttemptById: async (id) => {
    return request(`/attempts/${id}`);
  },

  // Health check to verify backend connectivity
  checkHealth: async () => {
    return request('/health');
  }
};

export default quizApi;
