import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StyleGuide from './pages/StyleGuide'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/styleguide" element={<StyleGuide />} />
      {/* You can add more routes here later */}
    </Routes>
  )
}
