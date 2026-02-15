export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>
            Démarches Simplifiées est un assistant intelligent qui vous aide à comprendre
            et à gérer vos démarches administratives en France. Nous fournissons des
            informations claires et des conseils pratiques pour simplifier votre quotidien.
          </p>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; 2024 Démarches Simplifiées. Tous droits réservés.</p>
          <p className="footer-tech">
            Propulsé par l'intelligence artificielle
          </p>
        </div>

        <div className="footer-section">
          <p style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '1rem' }}>
            <strong>Avertissement :</strong> Ce service fournit des informations générales
            et ne constitue pas un conseil juridique. Pour des questions spécifiques,
            consultez un professionnel qualifié.
          </p>
        </div>
      </div>
    </footer>
  );
}
