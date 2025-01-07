import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '../components/layouts/Navbar'
import { Footer } from '../components/layouts/Footer'

export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  )
}
