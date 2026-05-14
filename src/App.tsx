/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APIProvider } from '@vis.gl/react-google-maps';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './AuthContext';
import { UserRole } from './types';

// Components
import { PassengerDashboard } from './components/passenger/PassengerDashboard';
import { DriverDashboard } from './components/driver/DriverDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const LoginPage = () => {
  const { signIn } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 shadow-blue-200">
            <span className="text-white text-2xl font-black">ZG</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">ZimGo</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium font-serif italic italic">Hybrid Ride & Parcel Delivery • Zimbabwe</p>
        </div>
        <div className="mt-10 space-y-4">
          <button 
            onClick={() => signIn(UserRole.PASSENGER)}
            className="group relative w-full flex flex-col items-center justify-center py-5 px-4 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1"
          >
            <span className="text-lg font-bold">Continue as Passenger</span>
            <span className="text-xs opacity-70">Book rides & deliver items</span>
          </button>
          
          <button 
            onClick={() => signIn(UserRole.DRIVER)}
            className="group relative w-full flex flex-col items-center justify-center py-5 px-4 bg-emerald-600 text-white rounded-2xl shadow-xl hover:bg-emerald-700 transition-all transform hover:-translate-y-1"
          >
            <span className="text-lg font-bold">Courier & Driver Login</span>
            <span className="text-xs opacity-70">Accept jobs & earn in USD</span>
          </button>

          <div className="pt-4 border-t border-gray-100">
            <button 
              onClick={() => signIn(UserRole.ADMIN)}
              className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Operations Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={!user ? <LoginPage /> : (profile?.role ? <Navigate to={`/${profile.role.toLowerCase()}`} /> : <LoginPage />)} 
      />
      
      <Route path="/passenger/*" element={profile?.role === UserRole.PASSENGER ? <PassengerDashboard /> : <Navigate to="/" />} />
      <Route path="/driver/*" element={profile?.role === UserRole.DRIVER ? <DriverDashboard /> : <Navigate to="/" />} />
      <Route path="/admin/*" element={profile?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/" />} />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
      <AuthProvider>
        <Router>
          <Toaster position="top-center" richColors />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </APIProvider>
  );
}

