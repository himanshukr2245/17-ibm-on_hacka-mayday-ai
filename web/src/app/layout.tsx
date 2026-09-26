import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '../components/common/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MAYDAY — Autonomous Incident Commander | IBM Bob 2.0',
  description: 'Production is down. Bob is already on it. Autonomous SEV-1 triage, competing subagent hypothesis racing, and verified self-healing loops.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'MAYDAY — Autonomous Incident Commander | IBM Bob 2.0',
    description: 'Production is down. IBM Bob 2.0 is already on it. Watch 3 AI detectives race in parallel to triage a live SEV-1, reject band-aids, and self-heal in under 42 seconds.',
    type: 'website',
    siteName: 'MAYDAY War Room',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAYDAY — Autonomous Incident Commander | IBM Bob 2.0',
    description: 'Real-time AI incident commander. Real disk mutation. Real Vitest. Real invariant fixes.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100 font-sans selection:bg-red-500/30 selection:text-white">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
