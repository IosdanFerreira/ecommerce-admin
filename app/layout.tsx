import type { Metadata } from 'next';
import './globals.css';
import '@uploadthing/react/styles.css';

import { ClerkProvider } from '@clerk/nextjs';


import { Inter } from 'next/font/google';
import { ptBR } from '@clerk/localizations';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Store Dashboard',
  description: 'Gerencie seus produtos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <ClerkProvider localization={ptBR}>
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
