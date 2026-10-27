import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Building2, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  KeyRound, 
  Briefcase,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthPage() {
  const { 
    login, 
    signup, 
    language, 
    setLanguage, 
    setIndustryKey, 
    setRole, 
    setIsAuthenticated,
    t 
  } = useApp();

  // Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');
  // Selected Role for authentication: 'worker' | 'employer'
  const [selectedRole, setSelectedRole] = useState('worker');
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Form Fields
  const [loginIdentifier, setLoginIdentifier] = useState('CMRL-W-4089');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form Fields
  const [regName, setRegName] = useState('AKSHAVI K');
  const [regIdentifier, setRegIdentifier] = useState('CMRL-W-4089');
  const [regPhone, setRegPhone] = useState('+91 98401 23456');
  const [regIndustry, setRegIndustry] = useState('construction');
  const [regPassword, setRegPassword] = useState('safevoice2026');
  const [regConfirmPassword, setRegConfirmPassword] = useState('safevoice2026');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Handle Sign In Submit
  const handleSignIn = (e) => {
    e.preventDefault();
    const userPayload = {
      name: selectedRole === 'worker' ? (loginIdentifier.includes('SRM') ? 'Priya S.' : 'AKSHAVI K') : 'Senthil Murugan',
      code: loginIdentifier,
      role: selectedRole,
      industry: loginIdentifier.includes('SRM') ? 'university' : 'construction'
    };
    login(userPayload);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  // Handle Sign Up Submit
  const handleSignUp = (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const userPayload = {
      name: regName || 'AKSHAVI K',
      code: regIdentifier || 'EMP-2026',
      phone: regPhone,
      role: selectedRole,
      industry: regIndustry
    };
    signup(userPayload);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  // 1-Click Demo Profile Logins
  const triggerDemoLogin = (profileKey) => {
    if (profileKey === 'construction-worker') {
      login({
        name: 'AKSHAVI K',
        code: 'CMRL-W-4089',
        role: 'worker',
        industry: 'construction'
      });
    } else if (profileKey === 'university-worker') {
      login({
        name: 'Priya S.',
        code: 'SRM-FAC-1104',
        role: 'worker',
        industry: 'university'
      });
    } else {
      login({
        name: 'Senthil Murugan',
        code: 'CMRL-SAFE-01',
        role: 'employer',
        industry: 'construction'
      });
    }

    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col justify-center items-center p-3 sm:p-6 relative overflow-hidden">
      {/* Background Glow Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header / Language Switcher */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 px-2 text-xs">
        <div className="flex items-center gap-2 text-teal-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>FairShift Decent Work Rail</span>
        </div>

        {/* Language Toggle */}
        <div className="inline-flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
              language === 'en'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <span className="text-slate-600 px-0.5">/</span>
          <button
            onClick={() => setLanguage('ta')}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all font-tamil ${
              language === 'ta'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-teal-400'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10">
        {/* Card Header */}
        <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <ShieldCheck className="w-7 h-7 text-teal-300" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t.welcomeBack}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t.authSubtitle} • UN SDG 8 Decent Work Platform
          </p>

          {/* Sign In vs Sign Up Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mt-4 border border-slate-200">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-teal-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.signIn}
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-teal-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.signUp}
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          {/* Role Segmented Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Portal Access Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('worker');
                  setLoginIdentifier('CMRL-W-4089');
                }}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                  selectedRole === 'worker'
                    ? 'bg-teal-50/80 border-teal-600 text-teal-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedRole === 'worker' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <div className="font-bold">{t.workerRole}</div>
                  <div className="text-[10px] text-slate-400">Attendance & SafeVoice</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('employer');
                  setLoginIdentifier('senthil.m@cmrl-safety.gov.in');
                }}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                  selectedRole === 'employer'
                    ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedRole === 'employer' ? 'bg-teal-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <div className="font-bold">{t.employerRole}</div>
                  <div className={`text-[10px] ${selectedRole === 'employer' ? 'text-slate-300' : 'text-slate-400'}`}>
                    Triage & Management
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SIGN IN FORM */}
          {authMode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {selectedRole === 'worker' ? t.phoneOrEmpId : t.phoneOrEmail}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={selectedRole === 'worker' ? "e.g. CMRL-W-4089 or +91 98401..." : "e.g. senthil.m@cmrl-safety.gov.in"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  {selectedRole === 'worker' ? (
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t.password}
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("For demo purposes, you can use any password or click a 1-click evaluation profile below."); }} className="text-[11px] text-teal-700 hover:underline">
                    {t.forgotPassword}
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter PIN or password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-700 absolute right-3 top-3"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-teal-700 focus:ring-teal-700"
                  />
                  <span>{t.rememberMe}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#005953] hover:bg-teal-900 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{selectedRole === 'worker' ? t.loginAsWorker : t.loginAsEmployer}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. AKSHAVI K"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Worker Code / ID
                  </label>
                  <input
                    type="text"
                    required
                    value={regIdentifier}
                    onChange={(e) => setRegIdentifier(e.target.value)}
                    placeholder="e.g. CMRL-W-4089"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98401..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.selectIndustry}
                </label>
                <select
                  value={regIndustry}
                  onChange={(e) => setRegIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                >
                  <option value="construction">🏗️ Metro Rail Infrastructure (Line 4)</option>
                  <option value="university">🎓 SRM University (Campus Facilities & Safety)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.password}
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.confirmPassword}
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 text-[11px] text-slate-600 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-teal-700"
                />
                <span className="leading-tight">
                  I agree to statutory non-retaliation protections and impartial audit standards under Tamil Nadu Labor Act Sec 17.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>{t.createAccount}</span>
                <CheckCircle2 className="w-4 h-4 text-teal-300" />
              </button>
            </form>
          )}

          {/* 1-CLICK DEMO EVALUATION PROFILES (FR-01) */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.quickDemoLogins}</span>
              </span>
              <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                1-Click Instant Access
              </span>
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => triggerDemoLogin('construction-worker')}
                className="w-full p-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-left text-xs font-semibold flex items-center justify-between transition-colors text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🏗️</span>
                  <span>{t.demoWorkerConstruction}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => triggerDemoLogin('university-worker')}
                className="w-full p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left text-xs font-semibold flex items-center justify-between transition-colors text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🎓</span>
                  <span>{t.demoWorkerUniversity}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => triggerDemoLogin('employer')}
                className="w-full p-2 rounded-xl bg-slate-50 hover:bg-slate-200 border border-slate-200 text-left text-xs font-semibold flex items-center justify-between transition-colors text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🛡️</span>
                  <span>{t.demoEmployer}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Card Footer Statutory Protection Disclaimer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-500 leading-tight flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3 text-teal-700" />
          <span>Statutory Protection • Protected under Tamil Nadu Labor Act Sec 17</span>
        </div>
      </div>
    </div>
  );
}
