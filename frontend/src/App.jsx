import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Navbar from './components/navbar'
import AdminPanel from './components/AdminPanel'
import Auth from './components/Auth'
import OrganisationSetup from './components/OrganisationSetup'
import Assets from './components/Assets'
import AllocationTransfer from './components/AllocationTransfer'
import ResourceBooking from './components/ResourceBooking'
import Maintenance from './components/Maintenance'
import Audit from './components/Audit'
import Report from './components/Report'
import Notification from './components/Notification'
import Unauthorized from './components/Unauthorized'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true)
      const adminFlag = localStorage.getItem('isAdmin')
      setIsAdmin(adminFlag === '1')
    }
    setLoading(false)
  }, [])

  const navigate = useNavigate()
  const location = useLocation()

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    const adminFlag = localStorage.getItem('isAdmin')
    setIsAdmin(adminFlag === '1')
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin')
    setIsAuthenticated(false)
    setIsAdmin(false)
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      const adminFlag = localStorage.getItem('isAdmin')
      const isAdminUser = adminFlag === '1'
      setIsAdmin(isAdminUser)
      if (isAdminUser && location.pathname === '/') {
        navigate('/admin')
      }
    }
  }, [isAuthenticated, location.pathname, navigate])

  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <Auth onLoginSuccess={handleLoginSuccess} />

  return (
    <Navbar
      isAdmin={isAdmin}
      content={
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
          <Route path="/organisation-setup" element={isAdmin ? <OrganisationSetup /> : <Unauthorized />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/allocation-transfer" element={<AllocationTransfer />} />
          <Route path="/resource-booking" element={<ResourceBooking />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/report" element={<Report />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel onLogout={handleLogout} /> : <Unauthorized />} />
        </Routes>
      }
    />
  )
}

export default App
