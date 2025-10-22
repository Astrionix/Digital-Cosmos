import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Groq client
groq_client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# Load portfolio data
def load_data():
    data = {}
    # Point to the shared frontend data directory to keep a single source of truth
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'data')
    
    data_files = {
        'profile': 'profile.json',
        'projects': 'projects.json',
        'skills': 'skills.json',
        'socials': 'socials.json',
        'blogs': 'blogs.json',
        'education': 'education.json',
        'experience': 'experience.json'
    }
    
    for key, filename in data_files.items():
        filepath = os.path.join(data_dir, filename)
        try:
            with open(filepath, 'r') as f:
                data[key] = json.load(f)
        except FileNotFoundError:
            logger.warning(f"File not found: {filepath}")
            data[key] = {}
        except json.JSONDecodeError:
            logger.error(f"Invalid JSON in file: {filepath}")
            data[key] = {}
    
    return data

# Load data on startup
portfolio_data = load_data()

@app.route('/')
def home():
    return jsonify({
        'message': 'Digital Cosmos API',
        'status': 'running',
        'endpoints': {
            '/api/profile': 'GET - Profile information',
            '/api/projects': 'GET - Projects list',
            '/api/skills': 'GET - Skills information',
            '/api/socials': 'GET - Social links',
            '/api/blogs': 'GET - Blog posts',
            '/api/education': 'GET - Education details',
            '/api/experience': 'GET - Work experience',
            '/api/chat': 'POST - Chat with Tron AI'
        }
    })

@app.route('/api/profile', methods=['GET'])
def get_profile():
    return jsonify(portfolio_data.get('profile', {}))

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify(portfolio_data.get('projects', {}))

@app.route('/api/skills', methods=['GET'])
def get_skills():
    return jsonify(portfolio_data.get('skills', {}))

@app.route('/api/socials', methods=['GET'])
def get_socials():
    return jsonify(portfolio_data.get('socials', {}))

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    return jsonify(portfolio_data.get('blogs', {}))

@app.route('/api/education', methods=['GET'])
def get_education():
    return jsonify(portfolio_data.get('education', {}))

@app.route('/api/experience', methods=['GET'])
def get_experience():
    return jsonify(portfolio_data.get('experience', {}))

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        context = data.get('context', {})
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Create context string from portfolio data
        profile = portfolio_data.get('profile', {})
        projects = portfolio_data.get('projects', {}).get('projects', [])
        skills = portfolio_data.get('skills', {})
        education = portfolio_data.get('education', {}).get('education', [])
        experience = portfolio_data.get('experience', {}).get('experiences', [])
        
        context_str = f"""You are Tron, an AI assistant for {profile.get('name', 'Ramachandra Reddy')}'s portfolio.

Profile: {profile.get('bio', '')}
Location: {profile.get('location', '')}
Title: {profile.get('title', '')}

Skills: {', '.join([cat for cat in skills.get('categories', {}).keys()])}

Recent Projects: {', '.join([p.get('title', '') for p in projects[:3]])}

Education: {', '.join([e.get('degree', '') + ' from ' + e.get('institution', '') for e in education])}

Experience: {', '.join([e.get('title', '') + ' at ' + e.get('company', '') for e in experience])}

Answer questions about Ramachandra's background, skills, projects, and experience. Be helpful, friendly, and professional."""

        # Call Groq API
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": context_str
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1024,
        )
        
        response = chat_completion.choices[0].message.content
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        return jsonify({
            'error': 'Failed to process chat request',
            'details': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('FLASK_DEBUG', 'False') == 'True')
