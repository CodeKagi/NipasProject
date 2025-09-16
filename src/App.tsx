import { Routes, Route, Router, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StyleGuide from './pages/StyleGuide'
import DashboardPage from './pages/DashboardPage'
import UserProfilePage from './pages/UserProfilePage '
import BiodiversityProjectsPage from './pages/BiodiversityProjectsPage'
import StakeholderPage from './pages/StakeholderPage'
import NewApplicationsPage from './pages/NewApplicationsPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ProxiesPage from './pages/ProxiesPage'
import TransactionsPage from './pages/TransactionsPage'
import SpecieInfoPage from './pages/SpecieInfoPage'

export default function App() {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardPage />} /> {/* default content inside Dashboard */}
        <Route path="user-profile" element={<UserProfilePage />} />
        <Route path="biodiversity-projects" element={<BiodiversityProjectsPage />} />
        <Route path="stakeholder" element={<StakeholderPage />} />

        {/* 🔹 remove leading "/" so they're nested inside dashboard */}
        <Route path="new-applications" element={<NewApplicationsPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="proxies" element={<ProxiesPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="specie-info" element={<SpecieInfoPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
       <Route path="/styleguide" element={<StyleGuide />} />
    </Routes>

  )
}
