import './globals.css';
import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'LedgerLight',
  description: 'A modern, neumorphic dark-mode expense tracker',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1  py-12">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}