import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Send, Bot, User, Volume2, VolumeX } from 'lucide-react';
import { useAstrionix } from '../hooks/useAstrionix';

const TronAssistant = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Greetings! I'm Tron, your AI assistant. I'm here to help you learn about Ramachandra Reddy and answer any questions you have. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const inputRef = useRef(null);
  
  const { sendMessage, isLoading } = useAstrionix();

  // Auto-close when scrolling away from home and about sections
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (!isOpen) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Get the home and about section elements
        const homeSection = document.getElementById('home');
        const aboutSection = document.getElementById('about');
        
        if (homeSection && aboutSection) {
          const homeRect = homeSection.getBoundingClientRect();
          const aboutRect = aboutSection.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Check if user is viewing home or about section
          const isInHomeSection = homeRect.top < viewportHeight && homeRect.bottom > 0;
          const isInAboutSection = aboutRect.top < viewportHeight && aboutRect.bottom > 0;
          
          // Close only if not in home or about sections
          if (!isInHomeSection && !isInAboutSection) {
            setIsOpen(false);
          }
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isOpen]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Prevent any scrolling when opening
      const scrollY = window.scrollY;
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
        // Restore scroll position if it changed
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      }, 50);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    // Scroll only within the chat container, not the whole page
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest',
        inline: 'nearest'
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await sendMessage(inputMessage, data);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response if voice is enabled
      if (voiceEnabled && synthRef.current) {
        speakText(response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const speakText = (text) => {
    if (!synthRef.current || !voiceEnabled) return;

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <>
      {/* Floating Button - Always visible when chat is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center z-[9999] group"
          >
            <Bot className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-space-black animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Opens to the left */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[85vh] z-[10000]"
            style={{ 
              isolation: 'isolate',
              pointerEvents: 'auto',
              willChange: 'transform'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-effect rounded-2xl border border-cyan-500/30 overflow-hidden h-full flex flex-col backdrop-blur-xl bg-space-black/80 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center relative">
                    <Bot className="w-6 h-6 text-white" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-space-black" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-cyan-400">Tron AI</h2>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className={`p-2 rounded-lg transition-colors ${
                      voiceEnabled 
                        ? 'text-cyan-400 hover:bg-cyan-400/10' 
                        : 'text-gray-400 hover:bg-gray-400/10'
                    }`}
                    title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[85%] ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                          : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      <div className={`rounded-2xl px-4 py-2.5 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-100'
                          : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-50'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-cyan-500/20 bg-space-black/40">
                <div className="flex items-end space-x-2">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                      isListening
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                        : 'bg-white/5 border border-white/10 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400'
                    }`}
                    title={isListening ? 'Stop listening' : 'Voice input'}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      placeholder="Ask me anything..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 resize-none transition-all"
                      rows="1"
                      style={{ minHeight: '40px', maxHeight: '100px' }}
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex-shrink-0"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TronAssistant;
