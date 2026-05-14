/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MapPin, Search, Navigation, Clock, Shield, Star, DollarSign, Package, LogOut } from 'lucide-react';
import { MapView } from '../shared/MapView';
import { motion } from 'motion/react';
import { VehicleTier, ParcelSize } from '../../types';
import { useAuth } from '../../AuthContext';

export const PassengerDashboard = () => {
  const { profile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'RIDE' | 'PARCEL'>('RIDE');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 font-sans">
      <header className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center font-bold text-sky-700 shadow-inner">
            {profile?.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Moni, {profile?.fullName}!</h1>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mt-1">Harare Network Status: Live</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold text-emerald-700 font-mono text-sm">${profile?.walletBalance.toFixed(2)}</span>
          </div>
          <button 
            onClick={logout}
            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 font-sans">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex gap-1.5 mb-6 bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('RIDE')}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                    activeTab === 'RIDE' ? 'bg-white text-sky-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Navigation className="w-4 h-4" /> Ride-Hailing
                </button>
                <button 
                  onClick={() => setActiveTab('PARCEL')}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                    activeTab === 'PARCEL' ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Package className="w-4 h-4" /> Courier Mode
                </button>
             </div>

             <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 group-focus-within:scale-150 transition-transform" />
                  <input 
                    type="text" 
                    placeholder="Pickup from..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all font-medium text-sm text-slate-800"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-400 group-focus-within:scale-150 transition-transform" />
                  <input 
                    type="text" 
                    placeholder="Where to?"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all font-medium text-sm text-slate-800"
                  />
                </div>
                
                {activeTab === 'RIDE' ? (
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[VehicleTier.SILVER, VehicleTier.GOLD, VehicleTier.PLATINUM].map(tier => (
                      <button key={tier} className="p-4 border border-slate-100 rounded-xl hover:border-sky-400 hover:bg-sky-50/30 transition-all text-center group">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-sky-600">{tier}</p>
                        <p className="text-base font-extrabold text-slate-900">$5.00</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[ParcelSize.SMALL, ParcelSize.MEDIUM, ParcelSize.LARGE].map(size => (
                      <button key={size} className="p-4 border border-slate-100 rounded-xl hover:border-emerald-400 hover:bg-emerald-50/30 transition-all text-center group">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-emerald-600">{size}</p>
                        <p className="text-base font-extrabold text-slate-900">$3.50</p>
                      </button>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => setIsSearching(true)}
                  className={`w-full py-4 mt-2 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg transition-all transform active:scale-95 ${
                    activeTab === 'RIDE' ? 'bg-slate-900 text-sky-400 hover:bg-black' : 'bg-slate-900 text-emerald-400 hover:bg-black'
                  }`}
                >
                  {isSearching ? 'Geo-Matching...' : `Confirm ${activeTab === 'RIDE' ? 'Ride' : 'Courier'}`}
                </button>
             </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <MapView />
          </div>
        </div>

        <div className="space-y-6">
           <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" /> Recent Trips
              </h3>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">Avondale Shopping Centre</p>
                      <p className="text-xs text-gray-500">Yesterday, 14:30</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">$4.20</p>
                  </div>
                ))}
              </div>
           </section>

           <section className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-8 h-8 opacity-80" />
                <h3 className="text-lg font-bold">Safety First</h3>
              </div>
              <p className="text-sm text-blue-100 mb-6">Your security is our priority. Share your live location with emergency contacts.</p>
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-all backdrop-blur-sm">
                Setup Emergency SOS
              </button>
           </section>
        </div>
      </main>
    </div>
  );
};
