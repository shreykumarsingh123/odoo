import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Navbar from './components/navbar'
import AdminPanel from './components/AdminPanel'
import Auth from './components/Auth'
import { Routes, Route } from 'react-router-dom'

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

  const handleLoginSuccess = () => setIsAuthenticated(true)
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <Auth onLoginSuccess={handleLoginSuccess} />

  // Render admin panel for staff users, normal dashboard for others
  if (isAdmin) {
    return <AdminPanel onLogout={handleLogout} />
  }

  return (
    <Navbar
      content={
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
          <Route path="/organisation-setup" element={<OrganisationSetup />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/allocation-transfer" element={<AllocationTransfer />} />
          <Route path="/resource-booking" element={<ResourceBooking />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/report" element={<Report />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      }
    />
  )
}

export default App
