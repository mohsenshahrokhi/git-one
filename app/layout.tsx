
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import ThemeDirection from '@/utils/ThemeProvider'
import ToustProvider from '@/utils/ToustProvider'
import AuthProvider from '@/utils/AuthProvider'
// import localeFont from 'next/font/local'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// const vazir = localeFont({
//   src: '../public/fonts/Vazir.woff2'
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir="rtl" lang="fa-IR">
      <body >
        <ThemeDirection>
          <AuthProvider>
            <ToustProvider>
              {children}
            </ToustProvider>
          </AuthProvider>
        </ThemeDirection>
      </body>
    </html>
  )
}
