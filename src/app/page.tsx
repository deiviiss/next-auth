import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <main className='flex flex-col items-center justify-center max-w-[70ch] h-[calc(100vh-4rem)] mx-auto'>
      <div className=' bg-neutral-950 flex flex-col justify-center items-center mx-2 px-8 py-10 gap-y-4 rounded'>
        <h1 className='text-center text-2xl font-bold mb-4'>
          Welcome to the template system!
        </h1>
        <p className=' text-center'>Here you will see an example of how login and logout work together with protected pages, the Profile page cannot be accessed if there is no active session. The test email is hello@mail.com and the password is hello@mail.com</p>
      </div>
    </main>
  )
}
export default HomePage
