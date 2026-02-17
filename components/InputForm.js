'use client';
import { useRef, useEffect } from 'react';

export default function InputForm({ value, onChange, onSubmit, loading }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150);
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !loading) {
      onSubmit(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-area-wrapper">
      <form className="input-container" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="Décrivez votre situation administrative..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={loading}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!value.trim() || loading}
          title="Envoyer"
        >
          {loading ? (
            <div className="loading-dots" style={{padding: 0}}>
              <div className="dot" style={{width: '4px', height: '4px'}}></div>
              <div className="dot" style={{width: '4px', height: '4px'}}></div>
              <div className="dot" style={{width: '4px', height: '4px'}}></div>
            </div>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
