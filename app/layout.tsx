import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/lib/providers';

export const metadata: Metadata = {
  title: 'MARK2 Premium Studio',
  description: 'Premium AI interior design SaaS'
};

import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
