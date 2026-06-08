import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from "../assets/components/layout/DashboardLayout";
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Leads from '../pages/Leads';
import LeadDetails from '../pages/LeadDetails';
import AddLead from '../pages/AddLead';
import Analytics from '../pages/Analytics';
import Tasks from '../pages/Tasks';
import Messages from '../pages/Messages';
import Settings from '../pages/Settings';
import { useAuth } from '../hooks/useAuth';
import AddTask from "../pages/AddTask";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen bg-background text-white">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="leads/:id" element={<LeadDetails />} />
        <Route path="add-lead" element={<AddLead />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/add-task" element={<AddTask />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;