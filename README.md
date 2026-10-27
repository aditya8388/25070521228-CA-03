# QuizMaster — Online Quiz Platform
**Academic Project: B.Tech Computer Science & Engineering (3rd Semester)**

[![Technology: React + Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb.svg)](https://react.dev/)
[![Backend: Node.js + Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-68a063.svg)](https://expressjs.com/)
[![Database: MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47a248.svg)](https://www.mongodb.com/)
[![Deployment: Render](https://img.shields.io/badge/Deployment-Render-46e3b7.svg)](https://render.com/)

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Mandatory Tech Stack](#mandatory-tech-stack)
3. [Key Features](#key-features)
4. [Project Structure](#project-structure)
5. [Local Setup & Installation](#local-setup--installation)
6. [Database Inspection with MongoDB Compass](#database-inspection-with-mongodb-compass)
7. [Render Deployment Guide](#render-deployment-guide)
8. [GitHub Upload Instructions](#github-upload-instructions)
9. [Student Viva / Evaluation Q&A Guide](#student-viva--evaluation-qa-guide)

---

## 🎯 1. Project Overview
**QuizMaster** is an interactive, full-stack online quiz and examination platform designed for academic coursework and engineering evaluations. Built following standard modular client-server architecture, it allows students to take timed multiple-choice assessments across four core domains:
- 💻 **Programming** (JavaScript, Python, OOPs, functions)
- 🖥️ **Computer Science Core** (Data Structures, Algorithms, OS, DBMS)
- 🧠 **Aptitude** (Quantitative, Logical Reasoning, Speed & Distance)
- 📚 **General Knowledge** (Computer History, Science & Tech Pioneers)

### Why QuizMaster is Evaluation-Ready:
- **Server-Side Evaluation**: Correct answer keys never reach the frontend prior to submission, preventing network tab tampering.
- **Embedded MongoDB & Compass Ready**: Works with local MongoDB, MongoDB Atlas, or automatically boots an embedded database for zero-config evaluation.
- **Clean Responsive UI**: Designed with light backgrounds, deep indigo primary accents, smooth micro-interactions, and clear typography.

---

## 🛠️ 2. Mandatory Tech Stack
| Component | Technology | Version / Tool |
|---|---|---|
| **Frontend** | React.js with Vite | React 19, React Router DOM 7 |
| **Styling** | Vanilla Modular CSS | Custom Indigo/Purple Design System |
| **Backend** | Node.js with Express.js | Express 4.x / 5.x REST API |
| **Database** | MongoDB with Mongoose | Mongoose 8.x ODM |
| **GUI Tool** | MongoDB Compass | Database & Collection Inspection |
| **Deployment** | Render | Web Service & Static Site |

---

## ✨ 3. Key Features

### Feature 1: Home Page
- QuizMaster branding with custom SVG icon badge.
- Sticky navigation bar with active route highlighting.
- High-impact hero section with short introduction and prominent **"Explore Quizzes"** CTA.
- Category preview cards for Programming, Computer Science, Aptitude, and General Knowledge.
- Live featured quizzes dynamically loaded from MongoDB.

### Feature 2: Quiz Listing Page
- Category filter tabs (**All**, **Programming**, **Computer Science**, **Aptitude**, **General Knowledge**).
- Real-time search bar to search quizzes by title or keyword.
- Quiz cards showing category badges, difficulty ratings (Easy/Medium/Hard), question counts, and time limits.

### Feature 3: Take a Quiz Interface
- Clean, focused interface displaying **one MCQ at a time**.
- 4 clear answer choices (A, B, C, D) with interactive hover and selected states.
- **Live Countdown Timer** with visual low-time warning and automatic submission upon expiration.
- **Question Palette & Progress Bar**: Visual navigator showing answered/unanswered states with instant jump capability.
- Next / Previous buttons and a submission confirmation modal.
- Correct answers remain secure on the server until submission.

### Feature 4: Results & Score Breakdown
- Server calculates score, correct count, incorrect count, and percentage.
- Circular percentage badge with dynamic performance grade (e.g. *Outstanding*, *Good Job*).
- Question-by-question review highlighting:
  - Your selected choice vs. the verified correct answer.
  - Clear educational explanations for each question.
- Action buttons to **"Try Another Quiz"** or **"Return to Home"**.

### Feature 5: Quiz Management (Create Quiz)
- Minimal form to create new quizzes without a complicated admin panel.
- Dynamic question creator allowing custom questions, 4 options, radio-based correct answer selection, and explanations.
- Saves directly to MongoDB through validated REST endpoints.

### Feature 6: Recent Attempts & History
- Real-time leaderboard/history view reading from the MongoDB `attempts` collection.
- Allows students and evaluators to review previous submissions anytime.

---

## 📁 4. Project Structure
```
QuizMaster/
├── client/                     # Frontend React (Vite) Application
│   ├── public/
│   │   └── favicon.svg         # Platform branding icon
│   ├── src/
│   │   ├── api/
│   │   │   └── quizApi.js      # Centralized API service with VITE_API_URL
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   ├── Footer.jsx      # Academic project footer
│   │   │   ├── QuizCard.jsx    # Reusable quiz card component
│   │   │   ├── Timer.jsx       # Countdown timer with auto-submit
│   │   │   ├── QuestionPalette.jsx # Question navigation grid
│   │   │   └── Icons.jsx       # Pure SVG icons
│   │   ├── pages/
│   │   │   ├── HomePage.jsx    # Hero, categories, featured quizzes
│   │   │   ├── QuizListPage.jsx # Category filters & search
│   │   │   ├── QuizTakePage.jsx # One-at-a-time MCQ interface
│   │   │   ├── ResultPage.jsx  # Score breakdown & answer review
│   │   │   ├── CreateQuizPage.jsx # Quiz creation form
│   │   │   ├── AttemptsHistoryPage.jsx # Recent attempts list
│   │   │   └── AboutPage.jsx   # Project docs & Viva Q&A
│   │   ├── App.jsx             # React Router routing
│   │   ├── App.css             # Component-specific styles
│   │   ├── index.css           # Design tokens, variables, & utility classes
│   │   └── main.jsx            # React root mount
│   ├── .env.example            # Client environment variable template
│   ├── index.html              # HTML entry with Inter/Outfit fonts
│   ├── package.json            # Client dependencies
│   └── vite.config.js          # Vite config (runs on port 3000)
│
├── server/                     # Backend Node.js & Express API
│   ├── config/
│   │   └── db.js               # Mongoose connection & embedded fallback
│   ├── models/
│   │   ├── Quiz.js             # Mongoose Quiz & Question schema
│   │   └── Attempt.js          # Mongoose Attempt & Result schema
│   ├── routes/
│   │   ├── quizRoutes.js       # Quiz REST endpoints (GET, POST, DELETE)
│   │   └── attemptRoutes.js    # Attempt history endpoints
│   ├── seed/
│   │   ├── seedData.js         # Preloaded CSE academic quizzes
│   │   └── seed.js             # Database seeder script
│   ├── .env.example            # Server environment variable template
│   ├── package.json            # Server dependencies
│   └── server.js               # Express server entry point (port 5000)
│
├── .gitignore                  # Prevents node_modules & .env from git
└── README.md                   # Comprehensive project documentation
```

---

## 🚀 5. Local Setup & Installation

### Prerequisites
- **Node.js**: v18 or higher (`node -v`)
- **npm**: v9 or higher (`npm -v`)
- **MongoDB**: Local MongoDB Community Server OR MongoDB Atlas connection string (or use the automatic built-in embedded database).

---

### Step 1: Start the Backend Server
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows PowerShell: `Copy-Item .env.example .env`)*

   Default contents of `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/quizmaster
   NODE_ENV=development
   ```

4. *(Optional)* Seed the database with sample quizzes:
   ```bash
   npm run seed
   ```
   *(Note: The server also auto-seeds these quizzes on first start if the database is empty!)*

5. Start the backend:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```
   You should see:
   ```
   🚀 QuizMaster Backend running on port 5000
   📡 API Base: http://localhost:5000/api
   🩺 Health:   http://localhost:5000/api/health
   ```

---

### Step 2: Start the Frontend React Client
1. Open a **second terminal** and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Default: `VITE_API_URL=http://localhost:5000/api`)*

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## 🍃 6. Database Inspection with MongoDB Compass

MongoDB Compass is the official graphical user interface (GUI) for MongoDB.

### Step-by-Step Compass Guide for Evaluation:
1. Open **MongoDB Compass**.
2. In the **New Connection** screen, paste the connection URI:
   ```
   mongodb://localhost:27017
   ```
   *(If using MongoDB Atlas, paste your Atlas connection URI: `mongodb+srv://<username>:<password>@cluster.mongodb.net/quizmaster`)*.
3. Click **Connect**.
4. In the left sidebar, locate the **`quizmaster`** database.
5. Click on the collections:
   - **`quizzes`**: Holds each quiz with its category, title, time limit, and array of questions containing `options` and `correctOption`.
   - **`attempts`**: Holds student submissions. Each document contains:
     - `quizTitle`
     - `studentName`
     - `score` & `percentage`
     - `correctAnswers`, `incorrectAnswers`, `unansweredQuestions`
     - `timeTakenSeconds`
     - `answers` (full question-by-question breakdown)
     - `createdAt` (timestamp)
6. During evaluation, take a quiz on `http://localhost:3000`, submit it, and click the **Refresh** button in MongoDB Compass to show the professor the newly inserted attempt document!

---

## ☁️ 7. Render Deployment Guide

QuizMaster is configured to deploy directly to **Render** (no Vercel required).

### Part A: Deploying Backend on Render
1. Push your repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com/), click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Name**: `quizmaster-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB Atlas connection string (e.g. `mongodb+srv://admin:password@cluster.mongodb.net/quizmaster?retryWrites=true&w=majority`)
   - `NODE_ENV`: `production`
6. Click **Create Web Service**. Note your Render URL (e.g. `https://quizmaster-backend.onrender.com`).

---

### Part B: Deploying Frontend on Render
1. In Render Dashboard, click **New +** → **Static Site**.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Name**: `quizmaster-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://quizmaster-backend.onrender.com/api`
5. Under **Redirects/Rewrites**, add a rewrite rule so React Router works on page refreshes:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Click **Create Static Site**.

---

## 🐙 8. GitHub Upload Instructions

If you wish to upload this project to your own GitHub repository:

1. In the project root, verify that `node_modules` and `.env` are ignored:
   ```bash
   git status
   ```
2. Stage and commit your files:
   ```bash
   git add .
   git commit -m "Initial commit: QuizMaster full-stack platform"
   ```
3. Create a new repository on your GitHub account (e.g., `QuizMaster-Online-Quiz-Platform`).
4. Link and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

## 🎓 9. Student Viva / Evaluation Q&A Guide

Prepare for your 3rd-semester B.Tech CSE evaluation with these common questions:

### 1. What is the architecture of QuizMaster?
> *"QuizMaster follows a decoupled 3-tier MERN client-server architecture. The frontend is built in React 19 with Vite, routing via React Router DOM. The backend is a modular Express.js REST API that handles business logic and security. The database layer uses MongoDB managed with Mongoose ODM."*

### 2. Why is score calculation done on the server rather than the client?
> *"Client-side score calculation is insecure. If the answers or answer key are sent to the frontend before the quiz is submitted, anyone can open the browser Developer Tools (Console or Network tab) and read the answers. By withholding `correctOption` in `GET /api/quizzes/:id` and calculating scores on `POST /api/quizzes/:id/submit`, the evaluation is completely tamper-proof."*

### 3. How does the countdown timer work?
> *"The `Timer` component uses React's `useEffect` and `setInterval` to decrement remaining seconds every 1000ms. When remaining time reaches 0, it calls an `onTimeUp` callback function that automatically triggers `handleSubmitQuiz()`, packaging the student's selections and submitting them to the backend."*

### 4. How does the frontend communicate with the backend?
> *"We built a centralized API client (`client/src/api/quizApi.js`) that uses native `fetch` requests. It reads `import.meta.env.VITE_API_URL`, which defaults to `http://localhost:5000/api` locally, but can be switched to the production Render URL with a single environment variable change."*

### 5. How are quiz attempts saved in MongoDB?
> *"We defined an `Attempt` Mongoose schema. Upon submission, the server computes `score`, `correctAnswers`, `incorrectAnswers`, `unansweredQuestions`, `percentage`, and builds an `answers` array with question text, student's selected option, the correct option, and an explanation. This document is saved using `await attempt.save()` and can be reviewed in MongoDB Compass."*

---

## 👨‍💻 Project Evaluation Credits
- **Project Name**: QuizMaster — Online Quiz Platform
- **Course**: B.Tech CSE (3rd Semester)
- **Academic Year**: 2024–2025 / 2026
