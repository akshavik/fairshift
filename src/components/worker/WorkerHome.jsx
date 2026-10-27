import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  AlertTriangle, 
  Search, 
  Award, 
  PhoneCall, 
  Wind, 
  ArrowRight,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function WorkerHome() {
  const { 
    activeIndustry, 
    setWorkerTab, 
    setTrackingModalOpen, 
    todayCheckedIn, 
    language, 
    t 
  } = useApp();

  return (
    <div className="pb-16 max-w-lg mx-auto bg-white min-h-screen">
      {/* Subheader */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 text-xs">
        <span className="text-slate-600 font-medium">
          {t.greeting}, <strong className="text-slate-900">{language === 'ta' ? activeIndustry.worker.tamilName : activeIndustry.worker.name}</strong>
        </span>
        <span className="text-teal-700 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          {activeIndustry.industryType.split('&')[0]}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* SafeVoice Hero Banner */}
        <div className="bg-[#132238] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              TN-ACT-SEC17 Statutory Rail
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              Protected
            </span>
          </div>

          <h2 className="text-lg font-bold mb-1">
            SafeVoice™ Confidential Reporting
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Report safety hazards, wage irregularities, or unfair treatment with complete identity protection and 6-digit PIN tracking.
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setWorkerTab('safevoice')}
              className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report an Issue</span>
            </button>

            <button
              type="button"
              onClick={() => setTrackingModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Search className="w-4 h-4" />
              <span>Track PIN</span>
            </button>
          </div>
        </div>

        {/* Quick Shift Status & Attendance Card */}
        <div 
          onClick={() => setWorkerTab('attendance')}
          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer transition-all shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block leading-tight">
                  {t.todayShift}
                </span>
                <span className="text-[10px] text-slate-500">
                  {todayCheckedIn ? "Checked In at 07:05 AM" : "Check-in ready"}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
              {todayCheckedIn ? "3h 48m Active" : "Punch Ready"}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              {activeIndustry.worker.site.split('(')[0]}
            </span>
            <span className="text-teal-700 font-bold text-xs flex items-center gap-0.5">
              <span>View Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Worksite Safety & Operational Advisory */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-amber-900">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-amber-700" />
              Site Meteorological & Safety Advisory
            </span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-amber-200/80 px-2 py-0.5 rounded">
              Active
            </span>
          </div>
          <p className="text-[11px] text-amber-900/90 leading-relaxed">
            Gusty wind speeds (34 km/h) recorded at Pier 4. Elevated scaffolding work is restricted to Level 2. Full harness latching mandatory.
          </p>
        </div>

        {/* PayClarity Quick Preview */}
        <div 
          onClick={() => setWorkerTab('pay')}
          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer transition-all shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block leading-tight">
                  Transparent Salary Breakdown
                </span>
                <span className="text-[10px] text-slate-500">October 2026 Cycle</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-slate-900">
              ₹21,680
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-600">
            <span>Includes 2.0x Approved Overtime + Site Hazard Pay</span>
            <span className="text-teal-700 font-bold flex items-center gap-0.5">
              <span>Open PayClarity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Skill Passport Quick Card */}
        <div 
          onClick={() => setWorkerTab('profile')}
          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer transition-all shadow-2xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block leading-tight">
                  Portable Skill Passport
                </span>
                <span className="text-[10px] text-slate-500">4 Verified Statutory Certifications</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
              NSC Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            Certified Working at Heights (L3), OSHA Scaffolding Erector, First Responder.
          </p>
        </div>

        {/* Emergency Hotline */}
        <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-teal-800" />
            <span className="font-semibold text-[11px]">{t.hotline}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-500">24/7 Toll Free</span>
        </div>
      </div>
    </div>
  );
}
