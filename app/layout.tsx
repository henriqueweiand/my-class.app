import { Nunito } from 'next/font/google';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import Navbar from './components/navbar/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';

export const metadata = {
  title: 'my-class.app',
  description: 'my-class.app',
}

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={font.className} suppressHydrationWarning={true}>
        <ModalsProvider />
        <ClientOnly>
          <ToasterProvider />
          <Navbar />
        </ClientOnly>

        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
