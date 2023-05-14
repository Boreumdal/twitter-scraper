import { DataContext } from '@context/DataContext'
import './globals.css'

export const metadata = {
  title: 'Twitter Renderer - Melvin Arellano',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DataContext>
          {children}
        </DataContext>
      </body>
    </html>
  )
}
