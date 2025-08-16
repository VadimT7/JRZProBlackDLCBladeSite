import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JRZ Pro Black DLC',
  description: 'Revolutionary hockey blades with DLC nanoparticle coating',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-inter`}>
        {children}
      </body>
    </html>
  );
}
