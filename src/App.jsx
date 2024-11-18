import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { router } from './constants'
import SignUp from './components/signUp/signUp'
import LoginForm from './components/logIn/logIn'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Dashboard from './pages/dashboard/dashboard'
import NavBar from './pages/layout/navBar'
import CreateProject from './pages/createProject/createProject'
import Project from './pages/project/project'

function App() {
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={router.LogIn} />
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path={router.SignUp} element={<SignUp />} />
        <Route path={router.LogIn} element={<LoginForm />} />
        <Route path={router.Dashboard} element={<RequireAuth>
          <Dashboard />
        </RequireAuth>} />
        <Route path={router.AddProject} element={<RequireAuth>
          <CreateProject />
        </RequireAuth>} />
        <Route path={router.Project} element={<RequireAuth>
          <Project />
        </RequireAuth>} />

      </Routes>
    </ >
  )
}

export default App
