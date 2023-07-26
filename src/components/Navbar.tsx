import { type NextPage } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const Navbar: NextPage = async () => {
  const session = await getServerSession()

  return (
    <nav className='bg-zinc-900 p-4' >
      <div className='flex justify-between container mx-auto'>
        <Link href={'/'}>
          <h1 className="font-bold text-xl">
            Template system
          </h1>
        </Link>

        <ul className='flex gap-x-2'>
          <li className='px-3 py-1'>
            <Link href={'/'}>Home</Link>
          </li>
          {(session !== null)
            ? <li className='px-3 py-1'>
              <Link href={'/home/profile'}>Profile</Link>
            </li>

            : <>
              <li className='px-3 py-1'>
                <Link href={'/login'}>Sign In</Link>
              </li>
              {/* <li className='px-3 py-1'>
                <Link href={'/register'}>Sign Up</Link>
              </li> */}
            </>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
