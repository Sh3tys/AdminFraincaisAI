import './globals.css'

export const metadata = {
  title: 'AdminFrançais - Aide aux démarches administratives',
  description: 'Application gratuite pour comprendre et gérer vos démarches administratives en France. Obtenez des guides étape par étape, des modèles de lettres et des conseils pratiques.',
  keywords: 'démarches administratives, aide administrative, France, lettres administratives, guide pratique',
  authors: [{ name: 'AdminFrançais' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'DémarchesSimplifiées - Assistant pour vos démarches administratives',
    description: 'Simplifiez vos démarches administratives françaises avec notre assistant intelligent. Obtenez des conseils personnalisés et des modèles de documents.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
