import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'DeltaBuilds - Share and Discover Delta Force Builds',
  description:
    'The ultimate platform for Delta Force players to share, discover, and rate weapon builds.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'font-body bg-background text-foreground antialiased flex flex-col min-h-screen'
        )}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center p-4 text-muted-foreground text-sm border-t">
          <p>&copy; {new Date().getFullYear()} DeltaBuilds. All rights reserved.</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
