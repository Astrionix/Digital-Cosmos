import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useAstrionix = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message, data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: message
      });

      return response.data.response;
    } catch (err) {
      console.error('Error sending message to Astrionix:', err);
      setError(err.message);
      
      // Fallback response if API fails
      return generateFallbackResponse(message, data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const synthesizeSpeech = useCallback(async (text) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/synthesize`, {
        text: text
      });

      return response.data;
    } catch (err) {
      console.error('Error synthesizing speech:', err);
      throw err;
    }
  }, []);

  const uploadReferenceAudio = useCallback(async (audioFile, refText) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('text', refText);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload-reference`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (err) {
      console.error('Error uploading reference audio:', err);
      throw err;
    }
  }, []);

  return {
    sendMessage,
    synthesizeSpeech,
    uploadReferenceAudio,
    isLoading,
    error
  };
};

// Fallback response generator when API is unavailable
const generateFallbackResponse = (message, data) => {
  const lowerMessage = message.toLowerCase();
  
  // Introduction responses
  if (lowerMessage.includes('who') && (lowerMessage.includes('ramachandra') || lowerMessage.includes('rama'))) {
    return `Greetings, traveler ✨ I'm Astrionix — your AI guide to Leela Mohan Rama Chandra Reddy Padala's universe of innovation. Rama Chandra is a machine learning enthusiast and full-stack problem solver from Kakinada, Andhra Pradesh, India. He's currently pursuing his Masters in Computer Applications at Atria University and has experience in web development and software engineering.`;
  }
  
  // Skills responses
  if (lowerMessage.includes('skill') || lowerMessage.includes('technolog')) {
    return `Activating skills constellation 🚀... Rama Chandra's expertise includes:
    • Programming Languages: C++, C, Python, Java
    • Machine Learning: TensorFlow, PyTorch, Scikit-learn
    • Frontend: HTML5, CSS3, JavaScript, React
    • Frameworks: Django, Flask, Bootstrap
    • Data Visualization: Tableau, Matplotlib, Seaborn
    • Soft Skills: Problem Solving, Leadership, Teamwork, Communication`;
  }
  
  // Experience responses
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('intern')) {
    return `Engaging experience timeline 📊... Rama Chandra has worked as:
    • Intern at HC Technologies (Jan 2024 - Jun 2024) - Streamlined operations through agile methodologies
    • Web Development Intern at CodeClause (Sep 2025 - Oct 2025) - Frontend development initiatives
    He's also actively involved in hackathon competitions, open source contributions, and machine learning research.`;
  }
  
  // Education responses
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university')) {
    return `Accessing academic records 🎓... Rama Chandra's educational journey:
    • Masters in Computer Applications at Atria University (2024-2026)
    • Bachelors in Computer Applications at Aditya University (2021-2024)
    He's also certified in C Programming (Cisco), Communication Skills (MEPRO Pearson), Database Management Systems (Oracle Academy), and Python for Data Science (Infosys Springboard).`;
  }
  
  // Contact responses
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
    return `Opening communication channels 📡... You can reach Rama Chandra at:
    • Email: padalalmrreddy@gmail.com
    • Phone: +91 8464936999
    • LinkedIn: https://www.linkedin.com/in/ramachandra-reddy-7529161b1/
    • Portfolio: https://portfolio3-chi-amber.vercel.app/`;
  }
  
  // Project responses
  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    return `Initializing project showcase 🛰️... Rama Chandra is currently working on various machine learning and web development projects. His focus areas include AI-powered solutions, full-stack development, and innovative problem-solving approaches.`;
  }
  
  // Default response
  return `I'm Astrionix, your AI guide through Rama Chandra Reddy's digital cosmos. I can help you learn about his skills, experience, education, projects, and more. What would you like to explore? 🚀`;
};

