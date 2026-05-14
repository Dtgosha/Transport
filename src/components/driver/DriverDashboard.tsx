/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Power, Wallet, MapPin, CheckCircle, AlertCircle, FileText, Upload, ChevronRight, TrendingUp, LogOut } from 'lucide-react';
import { MapView } from '../shared/MapView';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../AuthContext';

export const DriverDashboard = () => {
  const { profile, logout } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [isVerified, setIsVerified] = useState(profile?.isVerified || false);
  const [activeJob, setActiveJob] = useState<any>(null);

  // Mock Onboarding View
  if (!isVerified) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8 font-sans mt-10">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Welcome abroad</h1>
          <p className="text-slate-500 font-medium tracking-wide text-sm">Complete your onboarding to start earning in Harare.</p>
        </header>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest leading-none">Status: Pending Verification</p>
          </div>
          
          <div className="p-8 space-y-6">
            {[
              { id: 'id', name: 'National ID / Passport', status: 'UPLOADED' },
              { id: 'reg', name: 'Vehicle Registration (ZINARA)', status: 'PENDING' },
              { id: 'police', name: 'Police Clearance Certificate', status: 'PENDING' }
            ].map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:bg-white hover:border-sky-400">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm tracking-tight">{doc.name}</span>
                </div>
                {doc.status === 'UPLOADED' ? (
                  <span className="status-tag status-live flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Complete
                  </span>
                ) : (
                  <button className="text-[11px] font-black text-sky-600 flex items-center gap-1 hover:bg-sky-50 px-3 py-1.5 rounded-lg transition-all border border-transparent hover:border-sky-100">
                    <Upload className="w-3.5 h-3.5" /> UPLOAD
                  </button>
                )}
              </div>
            ))}

            <button 
              onClick={() => setIsVerified(true)}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[3px] shadow-2xl shadow-slate-200 transition-all transform active:scale-[0.98] mt-4"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center border-2 border-emerald-500 shadow-inner">
               <span className="text-xl font-black text-emerald-700 truncate w-10 text-center">{profile?.fullName.charAt(0)}</span>
             </div>
             {isOnline && <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white animate-pulse shadow-sm" />}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">{profile?.fullName}</h1>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 4.9 • {profile?.vehicleTier} Tier
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl shadow-slate-200">
            <div className="p-2 bg-white/10 rounded-lg">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[9px] uppercase font-black text-slate-500 tracking-[2px]">Wallet Balance</p>
              <p className="text-lg font-black font-mono leading-none tracking-tighter">${profile?.walletBalance.toFixed(2)}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              isOnline ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700'
            }`}
          >
            <Power className="w-4 h-4" />
            {isOnline ? 'Offline' : 'Online'}
          </button>
          <button 
            onClick={logout}
            className="p-3 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-inner group">
             <MapView drivers={isOnline ? [{ uid: 'me', currentLocation: { lat: -17.8252, lng: 31.0335 }, vehicleTier: profile?.vehicleTier }] : []} />
             {!isOnline && (
               <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[3px] flex items-center justify-center transition-all">
                 <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm space-y-6 transform hover:scale-[1.02] transition-transform">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-slate-100">
                      <Power className="w-10 h-10 text-slate-200" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter">You are currently offline</h3>
                      <p className="text-slate-500 text-xs font-medium tracking-wide mt-2">Switch online to start receiving work in Harare CBD.</p>
                    </div>
                    <button 
                      onClick={() => setIsOnline(true)}
                      className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all"
                    >
                      Connect Now
                    </button>
                 </div>
               </div>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-sky-300 transition-all">
               <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                 <ChevronRight className="w-8 h-8 text-sky-600" />
               </div>
               <div>
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Daily Earnings</p>
                 <p className="text-2xl font-black text-slate-900 tracking-tighter">$42.50</p>
               </div>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-emerald-300 transition-all">
               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                 <TrendingUp className="w-8 h-8 text-emerald-600" />
               </div>
               <div>
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Performance</p>
                 <p className="text-2xl font-black text-slate-900 tracking-tighter">98%</p>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[200px]">
             <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 py-1 border-b border-slate-50">
               Active Queue
             </h3>
             <AnimatePresence>
               {activeJob ? (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-sky-50 border border-sky-100 rounded-2xl space-y-4">
                    {/* Active Job UI */}
                 </motion.div>
               ) : (
                 <div className="text-center py-12 space-y-4 flex flex-col items-center justify-center flex-1">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                     <MapPin className="w-8 h-8 text-slate-200" />
                   </div>
                   <div className="space-y-1">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Waiting for Jobs</p>
                    <p className="text-slate-300 text-[10px] font-medium leading-tight">We'll notify you when a rider matches with you</p>
                   </div>
                 </div>
               )}
             </AnimatePresence>
           </section>

           <section className="bg-slate-900 p-7 rounded-3xl text-white shadow-2xl">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Payouts Guide</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Commission is auto-debited. Maintain a <span className="text-emerald-400 font-bold">$5.00</span> balance to stay active.
              </p>
              <button className="mt-6 w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black transition-all text-xs uppercase tracking-widest text-sky-400">
                Top Up via Paynow
              </button>
           </section>
        </div>
      </main>
    </div>
  );
};

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
