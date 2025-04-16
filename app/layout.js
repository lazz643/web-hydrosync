import { Inter } from 'next/font/google'
import './UI/globals.css'
//import Navbar from './component/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard Smart Water Meter',
  description: 'Tes Akhir',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}


