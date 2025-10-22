# Deployment Guide - Digital Cosmos Portfolio

## Environment Variables Setup

This application requires the following environment variables to function properly:

### Required Variables:
- `GROQ_API_KEY` - Your Groq API key for the Tron AI Assistant
- `REACT_APP_API_URL` - Backend API URL (for production, use your deployed backend URL)

### Optional Variables:
- `OPENAI_API_KEY` - If you want to use OpenAI instead of Groq
- `FLASK_ENV` - Set to `production` for deployment
- `FLASK_DEBUG` - Set to `False` for production
- `PORT` - Port for backend server

## Deployment Options

### Option 1: Vercel (Frontend) + Render/Railway (Backend)

#### Frontend (Vercel):
1. Push your code to GitHub (without .env files)
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `REACT_APP_API_URL` = your backend URL (e.g., `https://your-backend.onrender.com`)
5. Deploy

#### Backend (Render/Railway):
1. Go to [Render](https://render.com) or [Railway](https://railway.app)
2. Create a new Web Service
3. Connect your GitHub repository
4. Add environment variables:
   - `GROQ_API_KEY` = your actual Groq API key
   - `FLASK_ENV` = production
   - `FLASK_DEBUG` = False
   - `PORT` = 5000
5. Deploy

### Option 2: Netlify (Frontend) + Backend Hosting

#### Frontend (Netlify):
1. Go to [Netlify](https://netlify.com)
2. Drag and drop your `frontend/build` folder OR connect GitHub
3. Add environment variables in Site settings > Environment variables:
   - `REACT_APP_API_URL` = your backend URL
4. Deploy

### Option 3: Full Stack on Railway/Render

Deploy both frontend and backend on the same platform:
1. Create two services (one for frontend, one for backend)
2. Set environment variables for each service
3. Update `REACT_APP_API_URL` to point to your backend service URL

## Important Security Notes

⚠️ **NEVER commit `.env` files to GitHub!**

✅ **DO:**
- Use environment variables in your deployment platform
- Keep API keys secure
- Use `.env.example` as a template
- Add `.env` to `.gitignore`

❌ **DON'T:**
- Commit actual API keys to git
- Share your `.env` file publicly
- Hardcode API keys in your code

## Getting Your API Keys

### Groq API Key:
1. Go to [Groq Console](https://console.groq.com)
2. Sign up/Login
3. Navigate to API Keys section
4. Create a new API key
5. Copy and save it securely

## Local Development

1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Fill in your actual API keys in `.env`

3. Start development:
   ```bash
   # Backend
   cd backend
   python app.py

   # Frontend
   cd frontend
   npm start
   ```

## Build for Production

### Frontend:
```bash
cd frontend
npm run build
```

The build folder will contain your production-ready files.

### Backend:
Make sure to set `FLASK_ENV=production` and `FLASK_DEBUG=False` in your deployment environment.
