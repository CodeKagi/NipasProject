import { Routes, Route, Navigate } from 'react-router-dom'
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

// ✅ NEW: TaskListPage import
import TaskListPage from './pages/TaskListPage'
import Pending from './pages/Pending'
import Completed from './pages/Completed'
import Deferred from './pages/Deferred'
import PendingInformation from './pages/PendingInformation'
import MyTasks from './pages/MyTasks'
import ApplicationDetailPage from './pages/ApplicationDetailPage'
import Payments from './pages/Payments'

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard layout */}
      <Route path="/dashboard" element={<Dashboard />}>

        {/* Dashboard Main */}
        <Route index element={<DashboardPage />} />

        {/* Existing children */}
        <Route path="user-profile" element={<UserProfilePage />} />
        <Route path="biodiversity-projects" element={<BiodiversityProjectsPage />} />
        <Route path="stakeholder" element={<StakeholderPage />} />
        <Route path="new-applications" element={<NewApplicationsPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="proxies" element={<ProxiesPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="specie-info" element={<SpecieInfoPage />} />
        <Route path="pending" element={<Pending />} />
        <Route path="completed" element={<Completed />} />
        <Route path="deferred" element={<Deferred />} />
        <Route path="pending-info" element={<PendingInformation />} />
        <Route path="payments" element={<Payments />} />
        <Route path="my-tasks" element={<MyTasks />} />
        <Route path="application/:id" element={<ApplicationDetailPage />} />


        {/* NEW: Central Officer Task Routes */}
        {/* <Route path="tasks/pending" element={<TaskListPage />} />
        <Route path="tasks/completed" element={<TaskListPage />} />
        <Route path="tasks/deferred" element={<TaskListPage />} />
        <Route path="tasks/pending-info" element={<TaskListPage />} /> */}

      </Route>

      {/* Styleguide */}
      <Route path="/styleguide" element={<StyleGuide />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
