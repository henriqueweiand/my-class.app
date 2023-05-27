import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import Navbar from './components/navbar/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';
import getCurrentUser from './actions/user/getCurrentUser';

export const metadata = {
  title: 'my-class.app',
  description: 'my-class.app',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" data-theme="dark">
      <body className={font.className} suppressHydrationWarning={true}>
        <ModalsProvider />
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
        </ClientOnly>

        <div>
          {children}
        </div>

        <Analytics />
      </body>
    </html>
  )
}
