'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import InputForm from '@/components/InputForm';
import ResponseDisplay from '@/components/ResponseDisplay';
import Footer from '@/components/Footer';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatHistoryRef = useRef(null);

  // Load initial greeting or history
  useEffect(() => {
    const savedMessages = localStorage.getItem('adminfrancais_chat_v2');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Save to history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('adminfrancais_chat_v2', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = async (input) => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userInput: input,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      const aiMessage = { role: 'assistant', content: data.response, id: Date.now() + 1 };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm('Voulez-vous vraiment effacer toute la conversation ?')) {
      setMessages([]);
      localStorage.removeItem('adminfrancais_chat_v2');
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.length === 0 ? (
            <div className="intro-overlay">
              <h1>Bonjour ! ✦</h1>
              <p>Je suis votre assistant administratif intelligent. Comment puis-je vous aider aujourd'hui ?</p>
              <div style={{marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                {["Clôture de compte", "Résilier abonnement", "Demande de RSA"].map(tip => (
                  <button 
                    key={tip} 
                    onClick={() => handleSubmit(tip)}
                    className="example-btn"
                    style={{background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'var(--text-secondary)'}}
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.role}-message-wrapper`}>
                  <div className={`message-bubble ${msg.role}-message`}>
                    {msg.role === 'assistant' ? (
                      <ResponseDisplay response={msg.content} isMinimal={true} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="message-wrapper ai-message-wrapper">
                  <div className="message-bubble ai-message" style={{padding: '1rem'}}>
                    <div className="loading-dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="error-message" style={{margin: '1rem', borderRadius: '12px'}}>
                  <p>⚠️ {error}</p>
                </div>
              )}
            </>
          )}
        </div>

        <InputForm 
          value={userInput}
          onChange={setUserInput}
          onSubmit={handleSubmit}
          loading={loading}
        />
        
        {messages.length > 0 && (
          <button 
            onClick={clearChat} 
            style={{position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem'}}
          >
            Effacer la discussion
          </button>
        )}
      </main>

      {/* Footer hidden or simplified for chat view */}
      <div style={{height: '20px'}}></div>
    </div>
  );
}
