import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Lesson from './pages/Lesson.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/lesson/:id" element={<Lesson />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
