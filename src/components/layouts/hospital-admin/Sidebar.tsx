import { Sidebar } from '../..//UI/Sidebar/Sidebar'
import { SidebarItem } from '../..//UI/Sidebar/SidebarItem'
import { SidebarLink } from '../..//UI/Sidebar/SidebarLink'
import { 
  Activity, 
  Ambulance, 
  BookUser, 
  Hospital, 
  LayoutDashboard, 
  Radiation, 
  SquareActivity, 
  UserPen } from 'lucide-react'

export const HospitalAdminSidebar = () => {
  return (
    <Sidebar title="Dashboard">
      <SidebarLink to='/' label='Dashboard' icon={<LayoutDashboard />} />

      <SidebarLink to='/profile' label='Profile' icon={<UserPen />} />

      <SidebarLink to='/hospital-admin/my-hospital' label='my hospital' icon={<Hospital />} />

      <SidebarItem title='ICUs' icon={<SquareActivity />}>
        <SidebarLink to='/hospital-admin/icus' label='show ICUs' isChild={true} icon={<Activity />} />
        <SidebarLink to='/hospital-admin/add-icu' label='Add new ICU' isChild={true} icon={<SquareActivity />} />
      </SidebarItem>

      <SidebarItem title='reservations' icon={<Radiation />}>
        <SidebarLink to='/hospital-admin/reservations' label='show patients' isChild={true} icon={<BookUser />} />
      </SidebarItem>

      <SidebarLink to='/' label='send ambulance service' icon={<Ambulance />} />
    </Sidebar>
  )
}