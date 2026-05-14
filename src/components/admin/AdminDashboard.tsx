/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LayoutDashboard, Users, Map as MapIcon, CreditCard, ShieldAlert, BarChart3, Search, Filter, Check, X, Eye, LogOut } from 'lucide-react';
import { MapView } from '../shared/MapView';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuth } from '../../AuthContext';

const data = [
  { name: '08:00', rides: 400, deliveries: 240 },
  { name: '10:00', rides: 300, deliveries: 139 },
  { name: '12:00', rides: 200, deliveries: 980 },
  { name: '14:00', rides: 278, deliveries: 390 },
  { name: '16:00', rides: 189, deliveries: 480 },
  { name: '18:00', rides: 239, deliveries: 380 },
  { name: '20:00', rides: 349, deliveries: 430 },
];

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState<'OVERVIEW' | 'USERS' | 'LIVE_MAP' | 'WALLETS' | 'DISPUTES'>('OVERVIEW');

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar - Clean Minimalism Theme */}
      <aside className="w-[240px] bg-slate-900 text-slate-50 flex flex-col p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-sky-400 tracking-tighter">ZimGo</h1>
          <p className="text-[11px] opacity-50 uppercase tracking-[2px] mt-1">Admin Portal v2.0</p>
        </div>
        
        <nav className="flex-1 flex flex-col gap-5">
          {[
            { id: 'OVERVIEW', label: 'Real-time Map', icon: MapIcon },
            { id: 'FLEET', label: 'Passenger Fleet', icon: LayoutDashboard },
            { id: 'USERS', label: 'Verification Queue', icon: Users, badge: 14 },
            { id: 'WALLETS', label: 'Wallet & Paynow', icon: CreditCard },
            { id: 'DISPUTES', label: 'SOS Alerts', icon: ShieldAlert },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            >
              <item.icon className="w-4 h-4" /> 
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-6 space-y-4">
          <button className="nav-item w-full"><LayoutDashboard className="w-4 h-4" /> Settings</button>
          <button onClick={logout} className="nav-item w-full text-red-400 hover:text-red-300"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col p-6 gap-6">
        <header className="header bg-white p-4 px-6 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Operations Dashboard</h2>
            <p className="text-xs text-slate-500">Harare & Bulawayo Network Status</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-800">Administrator</div>
              <div className="text-[11px] text-emerald-500 font-medium">System Online</div>
            </div>
            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-700 text-xs shadow-inner">
              AD
            </div>
          </div>
        </header>

        {currentView === 'OVERVIEW' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Active Rides', value: '184', color: 'sky' },
                { label: 'Pending Deliveries', value: '62', color: 'sky' },
                { label: "Today's Revenue", value: '$2,840.50', color: 'sky' },
                { label: 'SOS Alerts', value: '0', color: 'amber' }
              ].map((stat, i) => (
                <div key={i} className={`stat-card ${stat.color === 'amber' ? 'border-amber-500' : 'border-sky-400'}`}>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1.5 gap-6">
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="map-container relative h-[400px] bg-slate-300 rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
                  <MapView center={{ lat: -17.8252, lng: 31.0335 }} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-bold shadow-md border border-slate-200">
                    Harare CBD <span className="bg-red-100 text-red-500 px-2 py-0.5 rounded-full ml-2 text-[10px]">1.8x SURGE</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-grow">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">Active Surge Zones</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Harare CBD', multiplier: '1.8x', active: true },
                      { name: 'Borrowdale', multiplier: '1.2x', active: true },
                      { name: 'Airport', multiplier: '2.4x', active: true },
                      { name: 'Bulawayo CBD', multiplier: '1.0x', active: false }
                    ].map(zone => (
                      <div key={zone.name} className="p-3 border border-slate-100 rounded-xl">
                        <p className="text-xs font-semibold text-slate-600">{zone.name}</p>
                        <p className={`text-xl font-bold ${zone.active ? 'text-red-500' : 'text-slate-400'}`}>{zone.multiplier}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800">Verification Queue</h3>
                  <p className="text-xs text-slate-500">Driver & Courier Onboarding</p>
                </div>
                <div className="space-y-1 divide-y divide-slate-50 flex-1">
                  {[
                    { initials: 'TM', name: 'Tinashe Moyo', model: 'Toyota Corolla • Platinum', status: 'Pending Docs', color: 'blue' },
                    { initials: 'NM', name: 'Nyasha M.', model: 'Honda Fit • Gold', status: 'ID Review', color: 'pink' },
                    { initials: 'FK', name: 'Farai Kunaka', model: 'Delivery Bike • Large', status: 'Police Clear.', color: 'amber' },
                    { initials: 'SM', name: 'Sandra Maposa', model: 'Mazda Axela • Silver', status: 'Verified', color: 'emerald' }
                  ].map((driver, k) => (
                    <div key={k} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-${driver.color}-100 text-${driver.color}-700`}>
                          {driver.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{driver.name}</p>
                          <p className="text-[11px] text-slate-500">{driver.model}</p>
                        </div>
                      </div>
                      <span className={`status-tag ${driver.status === 'Verified' ? 'status-live' : 'status-pending'}`}>
                        {driver.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-semibold text-sm hover:bg-slate-800 transition-all mt-4">
                  View All Applications
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
