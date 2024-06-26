import AuthProvider from '@/components/adminComponent/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import ThemeDirection from '@/utils/ThemeProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// const theme = createTheme({
//   direction: "rtl" // Both here and <body dir="rtl">
// });
// // Create rtl cache
// const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin]
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir="rtl" lang="fa-IR" className='light'>
      <body className='font-Vazir'>
        <ThemeDirection>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeDirection>
      </body>
    </html >
  )
}
