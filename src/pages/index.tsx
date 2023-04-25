import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`min-h-screen ${inter.className} bg-white`}
    >
      <h1>hello Travelerz...</h1>
    </main>
  )
}
