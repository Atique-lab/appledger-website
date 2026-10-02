import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://appledger.in'),
  title: 'AppLedger - Operational Task Management & Governance',
  description:
    'AppLedger brings 5-tier role hierarchy, automated task escalations, and secure guest client collaboration into one fast desktop application.',
  keywords: [
    'AppLedger',
    'Task Management',
    'Kanban Board',
    'Team Escalation',
    'Role Governance',
    'Operations Platform',
  ],
  authors: [{ name: 'Atique Shaikh' }],
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/app-logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'AppLedger',
    title: 'AppLedger - Operational Task Management & Governance',
    description:
      'AppLedger brings 5-tier role hierarchy, automated task escalations, and secure guest client collaboration into one fast desktop application.',
    url: 'https://appledger.in',
    images: ['/images/screenshots/screenshot-1.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppLedger - Operational Task Management & Governance',
    description:
      'AppLedger brings 5-tier role hierarchy, automated task escalations, and secure guest client collaboration into one fast desktop application.',
    images: ['/images/screenshots/screenshot-1.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var savedTheme = localStorage.getItem('ledger-theme');
                if (savedTheme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
