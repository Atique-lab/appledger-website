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
  title: {
    default: 'AppLedger - Operational Task Management & 5-Tier Role Governance',
    template: '%s | AppLedger',
  },
  description:
    'AppLedger is an editorial desktop workspace built by Atique Shaikh. It replaces unmonitored chat threads with 5-tier role authorization, single-click Request to Action escalations, 11 per-team workflow templates, and PostgreSQL Row-Level Security.',
  keywords: [
    'AppLedger',
    'Atique Shaikh',
    'Atique Shaikh AppLedger',
    'AppLedger Founder',
    'AppLedger Desktop',
    'AppLedger Task Manager',
    '5-Tier Role Governance',
    'Request to Action Escalation',
    'Row Level Security Task App',
    'Rizwan Shaikh AppLedger',
    'Md Bellal AppLedger',
    'Editorial Task Management',
    'Team Task Tracker',
    'PostgreSQL RLS Task Management',
  ],
  authors: [{ name: 'Atique Shaikh', url: 'https://www.linkedin.com/in/atique-shaikh-b47251382' }],
  creator: 'Atique Shaikh',
  publisher: 'AppLedger',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://appledger.in',
  },
  verification: {
    google: 'NsriUmOGByOmvzvFnUoDWlUKpgIzdOWiun3rB3PqhnI',
  },
  icons: {
    icon: '/images/app-logo.png',
    shortcut: '/images/favicon.ico',
    apple: '/images/app-logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'AppLedger',
    title: 'AppLedger - Operational Task Management & Governance by Atique Shaikh',
    description:
      'AppLedger brings 5-tier role hierarchy, automated task escalations, 11 workflow templates, and secure guest client collaboration into one fast desktop application.',
    url: 'https://appledger.in',
    images: [
      {
        url: 'https://appledger.in/images/screenshots/screenshot-1.png',
        width: 1200,
        height: 630,
        alt: 'AppLedger Desktop Interface & 5-Tier Role Governance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppLedger - Task Tracking Rebuilt for Real Accountability',
    description:
      'Engineered by Atique Shaikh. Replaces chat threads with 5-tier role authorization and automated Request to Action escalations.',
    images: ['https://appledger.in/images/screenshots/screenshot-1.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AppLedger',
      operatingSystem: 'Windows 10, Windows 11',
      applicationCategory: 'BusinessApplication',
      description:
        'Editorial task management & governance desktop application enforcing 5-tier role authorization, single-click Request to Action escalations, 11 workflow templates, and PostgreSQL Row-Level Security.',
      url: 'https://appledger.in',
      author: {
        '@type': 'Person',
        name: 'Atique Shaikh',
        url: 'https://www.linkedin.com/in/atique-shaikh-b47251382',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AppLedger',
      url: 'https://appledger.in',
      logo: 'https://appledger.in/images/app-logo.png',
      founder: {
        '@type': 'Person',
        name: 'Atique Shaikh',
        jobTitle: 'Founder & Lead Developer',
        url: 'https://www.linkedin.com/in/atique-shaikh-b47251382',
        sameAs: ['https://www.linkedin.com/in/atique-shaikh-b47251382'],
      },
      sameAs: [
        'https://www.linkedin.com/in/atique-shaikh-b47251382',
        'https://www.linkedin.com/in/rizwan3/',
        'https://www.linkedin.com/in/mohdbellal',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Atique Shaikh',
      jobTitle: 'Founder & Lead Developer of AppLedger',
      url: 'https://appledger.in/about',
      sameAs: ['https://www.linkedin.com/in/atique-shaikh-b47251382'],
      worksFor: {
        '@type': 'Organization',
        name: 'AppLedger',
        url: 'https://appledger.in',
      },
    },
  ];

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
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
