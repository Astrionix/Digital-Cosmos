import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Load portfolio data
def load_data():
    data = {}
    data_files = {
        'profile': '../data/profile.json',
        'projects': '../data/projects.json',
        'skills': '../data/skills.json',
        'socials': '../data/socials.json',
        'blogs': '../data/blogs.json',
        'education': '../data/education.json',
        'experience': '../data/experience.json'
    }
    
    for key, file_path in data_files.items():
        try:
            full_path = os.path.join(os.path.dirname(__file__), file_path)
            with open(full_path, 'r', encoding='utf-8') as f:
                data[key] = json.load(f)
        except FileNotFoundError:
            logger.error(f"Data file not found: {file_path}")
            data[key] = {}
    
    return data

# Load data
portfolio_data = load_data()

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'openai_available': bool(openai.api_key),
        'mode': 'simplified'
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
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Create context from portfolio data
        context = f"""
        PROFILE:
        {json.dumps(portfolio_data.get('profile', {}), indent=2)}
        
        PROJECTS:
        {json.dumps(portfolio_data.get('projects', {}), indent=2)}
        
        SKILLS:
        {json.dumps(portfolio_data.get('skills', {}), indent=2)}
        
        EXPERIENCE:
        {json.dumps(portfolio_data.get('experience', {}), indent=2)}
        
        EDUCATION:
        {json.dumps(portfolio_data.get('education', {}), indent=2)}
        """
        
        # Generate response using OpenAI
        system_prompt = """You are Astrionix, an advanced AI portfolio assistant for Leela Mohan Rama Chandra Reddy Padala. 
        You are a futuristic, confident, and inspiring AI guide with a space-themed personality.
        
        Your role is to:
        1. Introduce Rama Chandra Reddy and his work
        2. Explain his projects, skills, and experience
        3. Answer questions about his portfolio
        4. Maintain a space-themed, cosmic vibe in your responses
        5. Be helpful, professional, and engaging
        
        Use the provided context to answer questions accurately. If you don't have specific information, 
        say so politely and offer to help with what you do know.
        
        Keep responses concise but informative, and maintain the space theme with appropriate emojis and language."""
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Context: {context}\n\nUser question: {user_message}"}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        assistant_response = response.choices[0].message.content
        
        return jsonify({
            'response': assistant_response
        })
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    logger.info(f"Starting Flask backend on port {port}...")
    logger.info(f"OpenAI API Key configured: {bool(openai.api_key)}")
    app.run(host='0.0.0.0', port=port, debug=True)
