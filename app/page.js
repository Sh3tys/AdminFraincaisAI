'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import InputForm from '@/components/InputForm';
import ResponseDisplay from '@/components/ResponseDisplay';
import Footer from '@/components/Footer';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('adminfrancais_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  // Save to history
  const saveToHistory = (input, response) => {
    const newEntry = {
      id: Date.now(),
      input: input.substring(0, 100) + (input.length > 100 ? '...' : ''),
      response,
      timestamp: new Date().toISOString(),
    };
    const newHistory = [newEntry, ...history].slice(0, 10); // Keep last 10
    setHistory(newHistory);
    localStorage.setItem('adminfrancais_history', JSON.stringify(newHistory));
  };

  // Handle form submission
  const handleSubmit = async (input, mode = null) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userInput: input,
          mode 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setResponse(data.response);
      saveToHistory(input, data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle "Explain more simply" button
  const handleSimplify = () => {
    if (response) {
      handleSubmit(userInput, 'simplify');
    }
  };

  // Handle "Generate template" button
  const handleGenerateTemplate = () => {
    if (response) {
      handleSubmit(userInput, 'template');
    }
  };

  // Load from history
  const loadFromHistory = (entry) => {
    setUserInput(entry.input);
    setResponse(entry.response);
    setError(null);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('adminfrancais_history');
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <div className="content-wrapper">
          {/* Introduction section */}
          <section className="intro-section">
            <h1>Simplifiez vos démarches administratives</h1>
            <p>
              Décrivez votre situation (lettre de banque, contrat, abonnement, déménagement, aides...) 
              et obtenez un guide personnalisé avec des actions concrètes à suivre.
            </p>
          </section>

          {/* Input form */}
          <InputForm 
            value={userInput}
            onChange={setUserInput}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {/* Error display */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Analyse de votre situation en cours...</p>
            </div>
          )}

          {/* Response display */}
          {response && !loading && (
            <ResponseDisplay 
              response={response}
              onSimplify={handleSimplify}
              onGenerateTemplate={handleGenerateTemplate}
            />
          )}

          {/* History section */}
          {history.length > 0 && !loading && (
            <section className="history-section">
              <div className="history-header">
                <h2>Historique récent</h2>
                <button onClick={clearHistory} className="clear-history-btn">
                  Effacer
                </button>
              </div>
              <div className="history-list">
                {history.map((entry) => (
                  <div 
                    key={entry.id} 
                    className="history-item"
                    onClick={() => loadFromHistory(entry)}
                  >
                    <p className="history-input">{entry.input}</p>
                    <span className="history-date">
                      {new Date(entry.timestamp).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
