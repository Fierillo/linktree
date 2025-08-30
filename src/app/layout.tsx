import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Pirate Linktree',
  description: 'Arrr, matey! Follow me treasures and adventures.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}