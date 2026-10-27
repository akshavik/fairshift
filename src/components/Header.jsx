import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  Smartphone, 
  Monitor, 
  HelpCircle, 
  Search, 
  Languages, 
  User, 
  Briefcase,
  AlertCircle
} from 'lucide-react';

export default function Header() {
  const { 
    role, 
    setRole, 
    industryKey, 
    setIndustryKey, 
    language, 
    setLanguage, 
    viewMode, 
    setViewMode, 
    setIsDemoGuideOpen, 
    setTrackingModalOpen,
    activeIndustry,
    t
  } = useApp();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner with Industry and Guide quick actions */}
      <div className="bg-slate-900 text-slate-200 text-xs px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            UN SDG 8: Decent Work & Economic Growth
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300 font-medium">
            {activeIndustry.subName}
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Industry Switcher Dropdown */}
          <div className="flex items-center bg-slate-800 rounded px-2 py-0.5 border border-slate-700">
            <span className="text-slate-400 mr-1.5 hidden sm:inline">Industry:</span>
            <select
              value={industryKey}
              onChange={(e) => setIndustryKey(e.target.value)}
              className="bg-transparent text-teal-300 font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="construction" className="bg-slate-900 text-white">🏗️ Metro Construction</option>
              <option value="university" className="bg-slate-900 text-white">🎓 College / University</option>
            </select>
          </div>

          {/* View Mode Toggle (Mobile / Desktop) */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
                viewMode === 'mobile' 
                  ? 'bg-teal-600 text-white font-medium' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Device Mockup"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
                viewMode === 'desktop' 
                  ? 'bg-teal-600 text-white font-medium' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Full Desktop Dashboard"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>

          {/* Demo Guide Script Button */}
          <button
            onClick={() => setIsDemoGuideOpen(true)}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-medium border border-amber-500/40 transition-colors"
            title="Open PRD Demonstration Script"
          >
            <HelpCircle className="w-3 h-3 text-amber-400" />
            <span>Demo Guide</span>
          </button>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Role Selector */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">FairShift</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 border border-teal-200">
                  {industryKey === 'construction' ? 'Metro Rail' : 'SRM Campus'}
                </span>
              </div>
            </div>
          </div>

          {/* Role Switcher Pill (FR-01) */}
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-300 shadow-inner">
            <button
              onClick={() => setRole('worker')}
              className={`px-3 py-1 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                role === 'worker'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.workerRole}
            </button>
            <button
              onClick={() => setRole('employer')}
              className={`px-3 py-1 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                role === 'employer'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.employerRole}
            </button>
          </div>
        </div>

        {/* Right Section: Language, Track Report, User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PIN Track shortcut */}
          <button
            onClick={() => setTrackingModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition-colors"
            title="Track Report via PIN"
          >
            <Search className="w-3.5 h-3.5 text-teal-700" />
            <span>Track by PIN</span>
          </button>

          {/* Language Toggle (EN / தமிழ்) */}
          <div className="inline-flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-300">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <span className="text-slate-400 text-xs px-0.5">/</span>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition-all font-tamil ${
                language === 'ta'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-800'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-slate-800">
                {language === 'ta' ? activeIndustry.worker.tamilName : activeIndustry.worker.name}
              </div>
              <div className="text-[10px] text-slate-500">
                {role === 'worker' 
                  ? (language === 'ta' ? activeIndustry.worker.tamilDesignation : activeIndustry.worker.designation)
                  : "Authorized Safety Officer"}
              </div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
              role === 'worker' ? 'bg-teal-100 text-teal-900 border border-teal-300' : 'bg-slate-800 text-white'
            }`}>
              {role === 'worker' ? activeIndustry.worker.avatarInitials : "SO"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
