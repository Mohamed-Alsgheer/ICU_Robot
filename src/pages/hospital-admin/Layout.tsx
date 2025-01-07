import { Outlet } from 'react-router-dom'
import { HospitalAdminSidebar } from '../../components/layouts/hospital-admin/Sidebar'

export const HospitalAdminLayout = () => {
  return (
    <>
    <div className="flex flex-row">
      <HospitalAdminSidebar />
      <div className='w-full flex flex-col space-y-10 items-center py-10 px-3 overflow-x-hidden'>
        <Outlet />
      </div>
    </div>
    </>
  )
}
