import { useState } from 'react';

export default function InputForm({ value, onChange, onSubmit, loading }) {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 2000;

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      onChange(text);
      setCharCount(text.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !loading) {
      onSubmit(value);
    }
  };

  // Example prompts for quick start
  const examplePrompts = [
    "J'ai reçu une lettre de ma banque pour clôture de compte",
    "Je dois résilier mon abonnement internet",
    "Comment faire ma demande de RSA ?",
    "Je déménage, quelles démarches faire ?",
  ];

  const useExample = (example) => {
    onChange(example);
    setCharCount(example.length);
  };

  return (
    <section className="input-section">
      <form onSubmit={handleSubmit} className="input-form">
        <label htmlFor="user-input" className="input-label">
          Décrivez votre situation administrative
        </label>
        
        <textarea
          id="user-input"
          className="input-textarea"
          value={value}
          onChange={handleChange}
          placeholder="Exemple : J'ai reçu une lettre de ma banque concernant la clôture de mon compte. Je ne comprends pas pourquoi et je ne sais pas quoi faire..."
          rows={6}
          disabled={loading}
        />
        
        <div className="input-footer">
          <span className={`char-count ${charCount > maxChars * 0.9 ? 'warning' : ''}`}>
            {charCount} / {maxChars}
          </span>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!value.trim() || loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                Analyse en cours...
              </>
            ) : (
              <>
                <span>✨</span>
                Obtenir de l'aide
              </>
            )}
          </button>
        </div>
      </form>

      {/* Example prompts */}
      {!value && !loading && (
        <div className="examples-section">
          <p className="examples-title">💡 Exemples de situations :</p>
          <div className="examples-grid">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                className="example-btn"
                onClick={() => useExample(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
