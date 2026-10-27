import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  User, 
  LayoutDashboard, 
  AlertTriangle, 
  Activity, 
  Users, 
  Sliders, 
  History 
} from 'lucide-react';

export default function Navigation() {
  const { 
    role, 
    workerTab, 
    setWorkerTab, 
    adminTab, 
    setAdminTab, 
    viewMode, 
    reports, 
    fatigueAlerts, 
    t 
  } = useApp();

  const openReportsCount = reports.filter(r => r.status !== 'resolved').length;
  const unackAlertsCount = fatigueAlerts.filter(a => !a.acknowledged).length;

  if (role === 'worker') {
    const workerNavItems = [
      { id: 'home', label: t.navHome, icon: Home },
      { id: 'attendance', label: t.navAttendance, icon: Clock },
      { id: 'pay', label: t.navPay, icon: CreditCard },
      { id: 'safevoice', label: t.navSafeVoice, icon: ShieldCheck, highlight: true },
      { id: 'profile', label: t.navProfile, icon: User },
    ];

    return (
      <nav className={`bg-white border-t border-slate-200 z-30 transition-all ${
        viewMode === 'mobile' 
          ? 'sticky bottom-0 w-full' 
          : 'fixed bottom-0 left-0 right-0 max-w-2xl mx-auto rounded-t-2xl shadow-xl border-x'
      }`}>
        <div className="flex items-center justify-around py-2 px-1">
          {workerNavItems.map(item => {
            const Icon = item.icon;
            const isActive = workerTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setWorkerTab(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all relative ${
                  isActive
                    ? 'text-teal-800 font-bold'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <div className={`relative p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110 text-teal-800' : ''
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  {item.id === 'safevoice' && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  )}
                </div>
                <span className={`text-[11px] mt-0.5 tracking-tight ${
                  isActive ? 'text-teal-900 font-bold' : 'text-slate-500'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-8 h-0.5 bg-teal-700 rounded-full mt-1"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Employer / Admin Navigation Tabs
  const adminNavItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'reports', label: t.navReports, icon: AlertTriangle, badge: openReportsCount },
    { id: 'alerts', label: t.navAlerts, icon: Activity, badge: unackAlertsCount },
    { id: 'attendance_admin', label: t.navAttendanceAdmin, icon: Users },
    { id: 'pay_policy', label: t.navPayRules, icon: Sliders },
    { id: 'audit', label: t.navAudit, icon: History },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 sticky top-12 sm:top-[68px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 flex overflow-x-auto no-scrollbar gap-1 sm:gap-2 py-1.5">
        {adminNavItems.map(item => {
          const Icon = item.icon;
          const isActive = adminTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setAdminTab(item.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {Boolean(item.badge && item.badge > 0) && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white text-teal-800' : 'bg-red-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
