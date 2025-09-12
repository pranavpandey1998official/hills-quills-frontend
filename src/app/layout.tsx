import { cn } from '@/lib/utils';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import localFont from 'next/font/local';
import Provider from './provider';

export const helveticaNow = localFont({
  src: [
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-Hairline.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-Thin.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-ExtLt.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-Light.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-Regular.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-Medium.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica/HelveticaNowDisplay-ExtraBold.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
});

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('bg-background min-h-screen font-sans antialiased', helveticaNow.variable)}
      >
        <Provider>
          <div className="relative flex min-h-screen flex-col">
            <Toaster />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
