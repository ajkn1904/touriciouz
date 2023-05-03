import { Inter } from 'next/font/google'

import HomePage from '@/Components/HomeComponents/HomePage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <HomePage/>
    </main>
  )
}
