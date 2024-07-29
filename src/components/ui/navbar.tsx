'use client'
import { MenuIcon } from 'lucide-react'
import { useAuth } from '~/context/auth'

export default function Navbar() {
  const { user, logoutUser } = useAuth()

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start lg:flex-row-reverse">
        <div className="drawer z-20">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
              <MenuIcon />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </ul>
          </div>
        </div>
        <a className="btn btn-ghost text-xl text-primary">Crit Cares</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={logoutUser}>Logout</a>
          </li>
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end text-lg flex gap-2">
        {user?.role === 'doctor' && <span>Dr.</span>}
        <span>{user?.names}</span>
        <span className="uppercase">{user?.last_names[0]}.</span>
      </div>
    </div>
  )
}
