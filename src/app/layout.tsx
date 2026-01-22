import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Outfit, Fredoka } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
});

export const metadata: Metadata = {
  title: 'LanguageKids',
  description: 'An app for kids to learn German and English.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          'h-full font-sans antialiased',
          outfit.variable,
          fredoka.variable,
          'bg-background'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
