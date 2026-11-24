import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext, useState } from 'react'
import './App.css'
import AuthGuard from './auth/AUthGuard'
import Homepage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import AllToDosPage from './pages/AllToDosPage'
import TodoDetailPage from './pages/TodoDetailPage'
import { LoginPage } from './pages/LoginPage'
import { RegPage } from './pages/RegPage'
import Layout from './Layout/Layout'
 

export const ThemeContext = createContext(null)

const router = createBrowserRouter([
  {
    path: '/', element: <AuthGuard><Layout /></AuthGuard>, children: [{ path: '/', element: <Homepage /> },
    { path: '/about', element: <AuthGuard><AboutPage /></AuthGuard> }, 
    { path: '/alltodos', element: <AuthGuard><AllToDosPage /></AuthGuard> },
    { path: '/todo/:id', element: <AuthGuard><TodoDetailPage /></AuthGuard> },]   
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegPage /> }])

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('todo-theme') || 'dark') 
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('todo-theme', nextTheme)
      return nextTheme
    })
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </div>
  )

}
export default App