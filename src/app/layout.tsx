import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'المسار الساخن للسفر والسياحة | Al-Masar Travel & Tourism',
  description: 'احجز أفضل الفنادق والجولات السياحية في مصر والوطن العربي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
