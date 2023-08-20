import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sessions signin - signout',
  description: '<Implementa inicio y cierre de sesión, pagina protegidas>'
}

const RootLayou = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayou
