import { Nunito } from 'next/font/google';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import Navbar from './components/navbar/Navbar';

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
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
        </ClientOnly>

        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
