import { Inter } from 'next/font/google'
import Banner from '@/Components/Banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`min-h-screen ${inter.className} bg-white`}
    >
      <Banner/>
    </main>
  )
}
