# Astrionix - AI Portfolio Assistant 🚀

Astrionix is an advanced AI portfolio assistant for Leela Mohan Rama Chandra Reddy Padala, featuring a space-themed interface with intelligent voice interaction and comprehensive portfolio showcase.

## ✨ Features

- **AI Assistant**: Intelligent conversational AI powered by OpenAI GPT
- **Voice Interaction**: Advanced text-to-speech using NeuTTS Air
- **Space Theme**: Immersive cosmic interface with animations
- **Portfolio Showcase**: Complete professional portfolio display
- **Real-time Chat**: Interactive AI assistant with context awareness
- **Responsive Design**: Mobile-first responsive design
- **Modern Tech Stack**: React, Flask, Tailwind CSS, Framer Motion

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **Flask** - Python web framework
- **OpenAI API** - AI conversation
- **NeuTTS Air** - Advanced text-to-speech
- **Sentence Transformers** - Semantic search
- **Flask-CORS** - Cross-origin resource sharing

### AI & Voice
- **NeuTTS Air** - On-device TTS with voice cloning
- **OpenAI GPT-3.5** - Conversational AI
- **Web Speech API** - Speech recognition
- **Semantic Search** - Context-aware responses

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.11+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd astrionix-portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   
   # Or install separately
   npm install
   cd frontend && npm install
   cd ../backend && pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your OpenAI API key
   ```

4. **Install NeuTTS Air dependencies**
   ```bash
   # For Windows (PowerShell)
   $env:PHONEMIZER_ESPEAK_LIBRARY = "c:\Program Files\eSpeak NG\libespeak-ng.dll"
   $env:PHONEMIZER_ESPEAK_PATH = "c:\Program Files\eSpeak NG"
   
   # For macOS
   brew install espeak
   
   # For Ubuntu/Debian
   sudo apt install espeak
   ```

5. **Run the application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start separately
   npm run dev:frontend  # Frontend on http://localhost:3000
   npm run dev:backend   # Backend on http://localhost:5000
   ```

## 📁 Project Structure

```
astrionix-portfolio/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom hooks
│   │   └── App.js          # Main app component
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Flask backend
│   ├── app.py              # Main Flask app
│   └── requirements.txt    # Python dependencies
├── data/                   # Portfolio data
│   ├── profile.json        # Personal information
│   ├── projects.json       # Project details
│   ├── skills.json         # Skills and technologies
│   ├── socials.json        # Contact information
│   ├── blogs.json          # Blog articles
│   ├── education.json      # Educational background
│   └── experience.json     # Work experience
├── neutts-air/             # NeuTTS Air integration
└── README.md
```

## 🎯 Key Components

### Astrionix AI Assistant
- **Context-aware responses** using semantic search
- **Voice synthesis** with NeuTTS Air
- **Real-time conversation** with memory
- **Portfolio-specific knowledge** base

### Portfolio Sections
- **Hero**: Space-themed introduction
- **About**: Personal information and vision
- **Projects**: Showcase of work and projects
- **Skills**: Technical skills constellation
- **Experience**: Professional journey timeline
- **Education**: Academic background
- **Blogs**: Articles and insights
- **Contact**: Contact form and information

### Space Theme Features
- **Star field background** with animated particles
- **Cosmic color palette** (neon blue, purple, pink, gold)
- **Holographic effects** and glass morphism
- **Smooth animations** with Framer Motion
- **Responsive design** for all devices

## 🔧 Configuration

### Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_API_URL=http://localhost:5000
NEUTTS_BACKBONE_REPO=neuphonic/neutts-air
NEUTTS_CODEC_REPO=neuphonic/neucodec
```

### NeuTTS Air Setup
The application uses NeuTTS Air for advanced text-to-speech capabilities:
- **Voice cloning** with reference audio
- **Real-time synthesis** for responsive interaction
- **High-quality output** with natural speech patterns

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)
```bash
cd backend
# Deploy to Render or Railway
# Make sure to set environment variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 About

**Leela Mohan Rama Chandra Reddy Padala**
- Machine Learning Enthusiast & Full-Stack Developer
- Currently pursuing Masters in Computer Applications at Atria University
- Passionate about AI, web development, and innovative solutions

## 🌟 Acknowledgments

- **NeuTTS Air** by Neuphonic for advanced TTS capabilities
- **OpenAI** for conversational AI
- **React** and **Flask** communities for excellent frameworks
- **Tailwind CSS** and **Framer Motion** for beautiful UI/UX

---

*Built with ❤️ and powered by AI*

