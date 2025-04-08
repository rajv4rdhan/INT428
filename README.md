# TuneLoom 🎵

TuneLoom is an intelligent music recommendation system powered by Google's Gemini AI, Langchain, and YouTube. It delivers personalized song and playlist recommendations based on your mood, genre preferences, and musical tastes.

## 🚀 Features

- **AI-Powered Music Recommendations**: Get song suggestions based on your mood, genre preferences, or any music-related query
- **Playlist Generation**: Create thematic playlists with a single request
- **YouTube Integration**: Recommendations include YouTube video links for immediate listening
- **User Authentication**: Secure JWT-based authentication system
- **Chat History**: Stores your previous recommendations for easy access
- **Modern UI**: Sleek React interface built with Vite and Tailwind CSS

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI
- **AI/ML**: Google Gemini 2.0 Flash, Langchain
- **Database**: MongoDB
- **Authentication**: JWT
- **External APIs**: YouTube Data API v3
- **Containerization**: Docker

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- Google API Key (for Gemini AI)
- YouTube API Key
- MongoDB connection

## 🔧 Installation

### Backend Setup

1. **Navigate to API directory**
   ```bash
   cd API
   ```

2. **Set up environment variables**
   Create a `.env` file with the following variables:
   ```
   GOOGLE_API_KEY=your_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Set up environment variables**
   Create a `.env` file in the root directory with:
   ```
   VITE_API_URL=http://localhost:8000
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the frontend development server**
   ```bash
   npm run dev
   ```

## 🐳 Docker Deployment

### Backend
```bash
cd API
docker build -t tuneloom-backend .
docker run -p 8000:8000 --env-file .env tuneloom-backend
```

### Frontend
```bash
docker build -t tuneloom-frontend .
docker run -p 3000:80 tuneloom-frontend
```

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - Create a new user account
- `POST /auth/login` - Log in and receive a JWT token
- `GET /auth/validate-token` - Validate JWT token

### Music Recommendations
- `POST /gemini/ask` - Request song or playlist recommendations
- `GET /gemini/history` - Retrieve your recommendation history

## 🔄 System Architecture

![System Architecture](https://raw.githubusercontent.com/rajv4rdhan/INT428/refs/heads/master/public/arc.png)

The system follows a ReAct (Reasoning and Acting) pattern where the Langchain agent:
1. Receives a user query through the React frontend
2. Processes the request via FastAPI backend
3. Analyzes the query using Gemini AI
4. Decides whether to recommend a single song or playlist
5. Generates appropriate music recommendations
6. Fetches corresponding YouTube videos
7. Returns structured JSON results to display in the UI


## 🔐 Security

- JWT token-based authentication
- Middleware protection for all routes except authentication endpoints
- Secure environment variable handling
- CORS protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.