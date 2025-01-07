import { Sidebar } from '../..//UI/Sidebar/Sidebar'
import { SidebarItem } from '../..//UI/Sidebar/SidebarItem'
import { SidebarLink } from '../..//UI/Sidebar/SidebarLink'
import { 
  Activity, 
  // BookUser, 
  FileUser, 
  Hospital, 
  LayoutDashboard, 
  SquareActivity, 
  // SquareUserRound, 
  UserPen, 
  UserPlus, 
  Users, 
  UserSearch } from 'lucide-react'

export const SuperAdminSidebar = () => {
  return (
    <Sidebar title="Dashboard">
      <SidebarLink to='/super-admin' label='Dashboard' icon={<LayoutDashboard />} />

      <SidebarLink to="/profile" label='Profile' icon={<UserPen />} />

      <SidebarItem title='hospital admins' icon={<Users />}>
        <SidebarLink to='/super-admin/hospital-admins' label='show hospital admins' isChild={true} icon={<UserSearch />} />
        <SidebarLink to='/super-admin/add-hospital-admin' label='Add new hospital admin' isChild={true} icon={<UserPlus />} />
      </SidebarItem>

      <SidebarItem title='hospitals' icon={<Hospital />}>
        <SidebarLink to='/super-admin/hospitals' label='show hospitals' isChild={true} icon={<Activity />} />
        <SidebarLink to='/super-admin/add-hospital' label='Add new hospital' isChild={true} icon={<SquareActivity />} />
      </SidebarItem>

      {/* <SidebarItem title='Robots' icon={<SquareUserRound />}>
        <SidebarLink to='/super-admin/robots' label='show Robots' isChild={true} icon={<BookUser />} />
        <SidebarLink to='/super-admin/add-robot' label='Add new robot' isChild={true} icon={<FileUser />} />
      </SidebarItem> */}

      <SidebarLink to='/super-admin/assign-admin-to-hospital' label='Hospital administrator appointment for hospital' icon={<FileUser />} />
    </Sidebar>
  )
}