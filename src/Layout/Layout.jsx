import React from 'react'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Snowfall from 'react-snowfall'
import { useContext } from 'react'
import { ThemeContext } from '../App'

function Layout() {
  const { theme } = useContext(ThemeContext)

  return (
    <> 
      {theme === 'dark' && (
        <Snowfall
          color="#ffffff"
          snowflakeCount={150}
          speed={[0.5, 3]}
          wind={[-0.5, 2]}
          radius={[0.5, 3]}
        />
      )}
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout