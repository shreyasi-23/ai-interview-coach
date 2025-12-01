# AI Interview Coach

An AI-powered interview preparation platform that helps users practice technical interviews with real-time feedback and personalized improvement suggestions.

## Overview

AI Interview Coach is a full-stack web application that simulates technical interviews using Google's Gemini AI. The platform provides:
- Real-time conversational AI interview practice
- Live feedback and improvement suggestions
- Interview session tracking with timestamps
- User authentication and session management
- Multiple interview categories (Frontend, Backend, Data Science)

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Firebase Authentication** for user management
- **Axios** for API requests

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Google Gemini AI** (gemini-2.5-flash model)
- **CORS** enabled for cross-origin requests

## Project Structure

```
ai-interview-coach/
├── ai-interview-coach/          # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   └── Navbar.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── Interview.tsx
│   │   │   └── LoginPage.tsx
│   │   ├── firebase/           # Firebase configuration
│   │   │   └── config.ts
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Entry point
│   └── package.json
├── backend/                     # Express API server
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   └── gemini.ts
│   │   ├── routes/             # API route handlers
│   │   │   └── coachRoutes.ts
│   │   ├── services/           # Business logic
│   │   │   └── geminiService.ts
│   │   └── index.ts            # Server entry point
│   ├── .env                    # Environment variables
│   └── package.json
└── shared/                      # Shared TypeScript types
    └── types/
        └── message.ts
```

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-interview-coach
```

### 2. Install Frontend Dependencies

```bash
cd ai-interview-coach
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:3000`

### Start Frontend Development Server

In a new terminal:

```bash
cd ai-interview-coach
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is occupied)

### Access the Application

Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Features

### Authentication
- **Sign Up**: Create a new account with email and password
- **Login**: Access existing account
- **Forgot Password**: Reset password via email
- **Logout**: Secure session termination

### Interview Practice
- **AI-Powered Conversations**: Natural dialogue with Gemini AI coach
- **Real-time Feedback**: Live improvement suggestions during the interview
- **Session Timer**: Track interview duration
- **Message History**: View full conversation transcript
- **End Interview**: Manual or AI-initiated interview conclusion

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Navigation**: Intuitive navbar with menu and account dropdowns
- **Custom Styling**: Professional brown/beige color scheme
- **Loading States**: Clear feedback during async operations

## Known Issues & Limitations

1. **No Data Persistence**: Interview history is not saved to a database (only exists during session)
2. **No Interview Categories**: Menu options (Frontend/Backend/Data Science) are placeholders
3. **Limited Error Handling**: Some edge cases may not have user-friendly error messages
4. **No Mobile Optimization**: UI may need adjustments for smaller screens

## Future Enhancements

- [ ] Add Firestore database for interview history persistence
- [ ] Implement interview category selection
- [ ] Add user profile management
- [ ] Create interview analytics and scoring system
- [ ] Export interview transcripts
- [ ] Add voice interview capability

## Authors

- **Shreyasi Poddar**
- **Nailat Taiyabah**

## Acknowledgments

- Google Gemini AI for powering the interview coach
- Firebase for authentication services
- React and Vite communities for excellent documentation
