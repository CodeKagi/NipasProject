import { Routes, Route, Router, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StyleGuide from './pages/StyleGuide'
import DashboardPage from './pages/DashboardPage'
import UserProfilePage from './pages/UserProfilePage '
import BiodiversityProjectsPage from './pages/BiodiversityProjectsPage'
import StakeholderPage from './pages/StakeholderPage'

export default function App() {
  return (

  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardPage />} /> {/* default content inside Dashboard */}
        <Route path="user-profile" element={<UserProfilePage />} />
        <Route path="biodiversity-projects" element={<BiodiversityProjectsPage />} />
        <Route path="stakeholder" element={<StakeholderPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

  )
}
