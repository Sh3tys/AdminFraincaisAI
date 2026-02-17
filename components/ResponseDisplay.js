'use client';

import { useState } from 'react';

export default function ResponseDisplay({ response }) {
  const [copied, setCopied] = useState(false);

  // Copy full response to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Improved parsing for a more "aesthetic" layout
  const parseResponse = (text) => {
    if (!text) return null;

    // Convert emojis and markdown-like sections into JSX
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      
      // Header detection
      if (trimmed.startsWith('TITRE:') || (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 50)) {
        return <h2 key={index} className="ai-title">{trimmed.replace(/TITRE:|\*\*/g, '')}</h2>;
      }
      
      // Highlight boxes for important info
      if (trimmed.startsWith('⚠️') || trimmed.startsWith('IMPORTANT:')) {
        return (
          <div key={index} className="highlight-box">
            {line}
          </div>
        );
      }

      // Check for bullet points
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('* ')) {
        return <li key={index} style={{marginLeft: '1.5rem', marginBottom: '0.5rem'}}>{renderFormattedText(line.replace(/^[-•*]\s*/, ''))}</li>;
      }

      // Regular paragraph
      if (trimmed === '') return <br key={index} />;
      
      return <p key={index}>{renderFormattedText(line)}</p>;
    });
  };

  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{color: 'var(--primary)', fontWeight: '600'}}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="ai-content">
      {parseResponse(response)}
      
      <div style={{marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end'}}>
        <button 
          onClick={copyToClipboard}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {copied ? '✓ Copié' : '📄 Copier'}
        </button>
      </div>
    </div>
  );
}
