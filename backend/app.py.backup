import os
import json
import base64
import io
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
import numpy as np
import soundfile as sf
from neuttsair.neutts import NeuTTSAir
import openai
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
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

# Initialize sentence transformer for semantic search
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize NeuTTS Air
try:
    neutts = NeuTTSAir(
        backbone_repo="neuphonic/neutts-air",
        backbone_device="cpu",
        codec_repo="neuphonic/neucodec",
        codec_device="cpu"
    )
    logger.info("NeuTTS Air initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize NeuTTS Air: {e}")
    neutts = None

# Load portfolio data
def load_data():
    data = {}
    data_files = {
        'profile': 'data/profile.json',
        'projects': 'data/projects.json',
        'skills': 'data/skills.json',
        'socials': 'data/socials.json',
        'blogs': 'data/blogs.json',
        'education': 'data/education.json',
        'experience': 'data/experience.json'
    }
    
    for key, file_path in data_files.items():
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data[key] = json.load(f)
        except FileNotFoundError:
            logger.error(f"Data file not found: {file_path}")
            data[key] = {}
    
    return data

# Load data
portfolio_data = load_data()

# Create embeddings for semantic search
def create_embeddings():
    embeddings = {}
    
    # Create embeddings for different sections
    sections = ['profile', 'projects', 'skills', 'blogs', 'education', 'experience']
    
    for section in sections:
        if section in portfolio_data:
            section_data = portfolio_data[section]
            text_content = json.dumps(section_data, ensure_ascii=False)
            embedding = sentence_model.encode(text_content)
            embeddings[section] = {
                'embedding': embedding.tolist(),
                'data': section_data
            }
    
    return embeddings

# Create embeddings
embeddings = create_embeddings()

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'neutts_available': neutts is not None,
        'openai_available': bool(openai.api_key)
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
        
        # Semantic search for relevant information
        query_embedding = sentence_model.encode(user_message)
        relevant_sections = []
        
        for section, section_data in embeddings.items():
            similarity = cosine_similarity(
                [query_embedding], 
                [section_data['embedding']]
            )[0][0]
            
            if similarity > 0.3:  # Threshold for relevance
                relevant_sections.append({
                    'section': section,
                    'similarity': similarity,
                    'data': section_data['data']
                })
        
        # Sort by similarity
        relevant_sections.sort(key=lambda x: x['similarity'], reverse=True)
        
        # Create context from relevant sections
        context = ""
        for section in relevant_sections[:3]:  # Top 3 most relevant sections
            context += f"\n{section['section'].upper()}:\n"
            context += json.dumps(section['data'], indent=2, ensure_ascii=False)
        
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
            'response': assistant_response,
            'relevant_sections': [s['section'] for s in relevant_sections[:3]]
        })
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/synthesize', methods=['POST'])
def synthesize_speech():
    try:
        if not neutts:
            return jsonify({'error': 'NeuTTS Air not available'}), 503
        
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Use default reference audio and text
        ref_audio_path = "neutts-air/samples/dave.wav"
        ref_text_path = "neutts-air/samples/dave.txt"
        
        # Read reference text
        with open(ref_text_path, "r") as f:
            ref_text = f.read().strip()
        
        # Encode reference audio
        ref_codes = neutts.encode_reference(ref_audio_path)
        
        # Synthesize speech
        wav = neutts.infer(text, ref_codes, ref_text)
        
        # Convert to bytes
        buffer = io.BytesIO()
        sf.write(buffer, wav, 24000, format='WAV')
        buffer.seek(0)
        
        # Encode as base64
        audio_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        return jsonify({
            'audio': audio_base64,
            'sample_rate': 24000,
            'format': 'wav'
        })
        
    except Exception as e:
        logger.error(f"Error in synthesize endpoint: {e}")
        return jsonify({'error': 'Speech synthesis failed'}), 500

@app.route('/api/upload-reference', methods=['POST'])
def upload_reference():
    try:
        if not neutts:
            return jsonify({'error': 'NeuTTS Air not available'}), 503
        
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        audio_file = request.files['audio']
        ref_text = request.form.get('text', '')
        
        if not ref_text:
            return jsonify({'error': 'No reference text provided'}), 400
        
        # Save uploaded file temporarily
        temp_path = f"temp_ref_{hash(audio_file.filename)}.wav"
        audio_file.save(temp_path)
        
        # Encode reference
        ref_codes = neutts.encode_reference(temp_path)
        
        # Save reference codes
        ref_codes_path = f"temp_ref_codes_{hash(audio_file.filename)}.pt"
        import torch
        torch.save(ref_codes, ref_codes_path)
        
        # Clean up temp file
        os.remove(temp_path)
        
        return jsonify({
            'ref_codes_path': ref_codes_path,
            'ref_text': ref_text
        })
        
    except Exception as e:
        logger.error(f"Error in upload-reference endpoint: {e}")
        return jsonify({'error': 'Reference upload failed'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

