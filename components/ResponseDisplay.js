import { useState } from 'react';

export default function ResponseDisplay({ response, onSimplify, onGenerateTemplate }) {
  const [copied, setCopied] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);

  // Copy full response to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Copy specific section to clipboard
  const copySectionToClipboard = (text, sectionName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(sectionName);
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  // Enhanced parsing to extract structured sections
  const parseResponse = (text) => {
    const sections = {
      title: '',
      overview: '',
      steps: [],
      important: [],
      template: '',
      summary: '',
      disclaimer: '',
      raw: text
    };

    const lines = text.split('\n');
    let currentSection = null;
    let sectionContent = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Detect section headers
      if (trimmedLine.match(/📋|TITRE/i)) {
        if (currentSection && sectionContent.length > 0) {
          processSectionContent(sections, currentSection, sectionContent);
        }
        currentSection = 'title';
        sectionContent = [];
      } else if (trimmedLine.match(/🔍|APERÇU|SITUATION/i)) {
        if (currentSection && sectionContent.length > 0) {
          processSectionContent(sections, currentSection, sectionContent);
        }
        currentSection = 'overview';
        sectionContent = [];
      } else if (trimmedLine.match(/✅|ACTIONS|ÉTAPES|ETAPES/i)) {
        if (currentSection && sectionContent.length > 0) {
          processSectionContent(sections, currentSection, sectionContent);
        }
        currentSection = 'steps';
        sectionContent = [];
      } else if (trimmedLine.match(/⚠️|POINTS IMPORTANTS|ATTENTION/i)) {
        if (currentSection && sectionContent.length > 0) {
          processSectionContent(sections, currentSection, sectionContent);
        }
        currentSection = 'important';
        sectionContent = [];
      } else if (trimmedLine.match(/📝|MODÈLE|MODELE|TEMPLATE/i)) {
        if (currentSection && sectionContent.length > 0) {
          processSectionContent(sections, currentSection, sectionContent);
        }
        currentSection = 'template';
        sectionContent = [];
      } else if (trimmedLine.match(/💡|RÉSUMÉ|RESUME/i)) {
        if (currentSection && sectionContent.length > 0) {
          processSectionContent(sections, currentSection, sectionContent);
        }
        currentSection = 'summary';
        sectionContent = [];
      } else if (trimmedLine.match(/⚖️|AVERTISSEMENT|DISCLAIMER/i)) {
        if (currentSection && sectionContent.length > 0) {
          processSectionContent(sections, currentSection, sectionContent);
        }
        currentSection = 'disclaimer';
        sectionContent = [];
      } else if (trimmedLine && currentSection) {
        sectionContent.push(line);
      }
    });

    // Process last section
    if (currentSection && sectionContent.length > 0) {
      processSectionContent(sections, currentSection, sectionContent);
    }

    return sections;
  };

  // Helper to process section content
  const processSectionContent = (sections, sectionName, content) => {
    const text = content.join('\n').trim();
    
    if (sectionName === 'steps') {
      // Extract numbered items and clean markdown
      sections.steps = content
        .filter(line => line.trim().match(/^\d+\./))
        .map(line => cleanMarkdown(line.trim()));
    } else if (sectionName === 'important') {
      // Extract bullet points and clean markdown
      sections.important = content
        .filter(line => line.trim().match(/^[•\-\*]/) || line.trim().match(/^\*\*/))
        .map(line => cleanMarkdown(line.trim().replace(/^[•\-\*]\s*/, '')));
    } else {
      sections[sectionName] = cleanMarkdown(text);
    }
  };

  // Helper to clean markdown formatting
  const cleanMarkdown = (text) => {
    // Remove ** bold markers but keep the text
    return text.replace(/\*\*([^*]+)\*\*/g, '$1');
  };

  // Helper to render text with bold formatting
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    // Split by ** markers and render bold text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Bold text
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };


  const sections = parseResponse(response);

  return (
    <div className="response-container">
      {/* Header with copy button */}
      <div className="response-header">
        <h2 className="response-main-title">
          Votre guide personnalisé
        </h2>
        <button 
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={copyToClipboard}
          title="Copier tout le guide"
        >
          {copied ? '✓ Copié !' : 'Copier tout'}
        </button>
      </div>

      <div className="response-content">
        {/* Title Section */}
        {sections.title && (
          <div className="response-section title-section">
            <h3 className="section-title-text">{sections.title}</h3>
          </div>
        )}

        {/* Overview Section */}
        {sections.overview && (
          <div className="response-section overview-section">
            <div className="section-header">
              <h4 className="section-title">Aperçu de la situation</h4>
            </div>
            <p className="section-content">{sections.overview}</p>
          </div>
        )}

        {/* Steps Section */}
        {sections.steps.length > 0 && (
          <div className="response-section steps-section">
            <div className="section-header">
              <h4 className="section-title">Actions à suivre</h4>
            </div>
            <ol className="steps-list">
              {sections.steps.map((step, index) => (
                <li key={index} className="step-item">
                  {step.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Important Points Section */}
        {sections.important.length > 0 && (
          <div className="response-section important-section">
            <div className="section-header">
              <h4 className="section-title">Points importants</h4>
            </div>
            <ul className="important-list">
              {sections.important.map((point, index) => (
                <li key={index} className="important-item">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Template Section */}
        {sections.template && (
          <div className="response-section template-section">
            <div className="section-header">
              <h4 className="section-title">Modèle de message</h4>
              <button
                className={`copy-section-btn ${copiedSection === 'template' ? 'copied' : ''}`}
                onClick={() => copySectionToClipboard(sections.template, 'template')}
                title="Copier le modèle"
              >
                {copiedSection === 'template' ? '✓ Copié' : 'Copier'}
              </button>
            </div>
            <div className="template-content">
              <pre className="template-text">{sections.template}</pre>
            </div>
          </div>
        )}

        {/* Summary Section */}
        {sections.summary && (
          <div className="response-section summary-section">
            <div className="section-header">
              <h4 className="section-title">Résumé</h4>
            </div>
            <p className="section-content summary-text">{sections.summary}</p>
          </div>
        )}

        {/* Disclaimer Section */}
        {sections.disclaimer && (
          <div className="response-section disclaimer-section">
            <div className="section-header">
              <h4 className="section-title">Avertissement</h4>
            </div>
            <p className="section-content disclaimer-text">{sections.disclaimer}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="response-actions">
        <button 
          className="action-btn primary-action"
          onClick={onSimplify}
          title="Obtenir une explication plus simple"
        >
          Expliquer plus simplement
        </button>
        
        {!sections.template && (
          <button 
            className="action-btn secondary-action"
            onClick={onGenerateTemplate}
            title="Générer un modèle de lettre ou email"
          >
            Générer un modèle
          </button>
        )}
      </div>
    </div>
  );
}
