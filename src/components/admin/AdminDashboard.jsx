import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  Sliders, 
  Building2,
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    activeIndustry, 
    reports, 
    fatigueAlerts, 
    setAdminTab, 
    industryKey,
    t 
  } = useApp();

  const totalReports = reports.length;
  const openReports = reports.filter(r => r.status !== 'resolved');
  const resolvedReports = reports.filter(r => r.status === 'resolved');
  const urgentReports = reports.filter(r => r.severity === 'urgent' && r.status !== 'resolved');
  const unackFatigue = fatigueAlerts.filter(a => !a.acknowledged);

  const slaCompliancePercent = 94.2;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 border border-teal-200">
              Employer Oversight Rail
            </span>
            <span className="text-xs text-slate-500">
              Live Workforce Intelligence • {activeIndustry.name}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.dashboardTitle}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminTab('reports')}
            className="px-3.5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Triage Incident Queue ({openReports.length})</span>
          </button>
          <button
            onClick={() => setAdminTab('alerts')}
            className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-amber-600" />
            <span>Fatigue Alerts ({unackFatigue.length})</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPI Cards (FR-06) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Workers Today */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.activeWorkers}</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            {industryKey === 'construction' ? '148' : '86'}
          </div>
          <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Verified via Geofence Beacons
          </span>
        </div>

        {/* KPI 2: Total Shift & Overtime Hours */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.totalLoggedHours}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            {industryKey === 'construction' ? '1,184 hrs' : '688 hrs'}
          </div>
          <span className="text-[11px] text-slate-600 font-medium">
            Overtime: <strong className="text-teal-800 font-bold">48.5 hrs</strong> (Pending verification)
          </span>
        </div>

        {/* KPI 3: Open SafeVoice Grievances & 4-Hour SLA */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.openReportsCount}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {openReports.length}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              ({urgentReports.length} Urgent Stop-Work)
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {slaCompliancePercent}% within 4-Hour SLA
          </span>
        </div>

        {/* KPI 4: Fatigue Violations */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.fatigueAlertsCount}</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            {unackFatigue.length}
          </div>
          <span className="text-[11px] text-red-600 font-semibold">
            {unackFatigue.length > 0 ? "Requires Human Review Intervention" : "All Alerts Acknowledged"}
          </span>
        </div>
      </div>

      {/* Analytics Breakdown & Incident Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SafeVoice Incident Categories Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs lg:col-span-1 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center justify-between">
            <span>Grievance & Hazard Distribution</span>
            <span className="text-xs text-slate-400 font-normal">Active Cycle</span>
          </h3>

          <div className="space-y-3 text-xs">
            {activeIndustry.categories.map((cat, i) => {
              const count = reports.filter(r => r.category === cat.id).length;
              const percent = totalReports > 0 ? Math.round((count / totalReports) * 100) : 25;
              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{cat.label}</span>
                    <span className="text-slate-900 font-bold">{count} ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-teal-500' : 'bg-blue-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-snug">
            🛡️ <strong>Statutory Privacy Notice:</strong> Anonymous reports exclude device MAC, GPS exact geocodes, and phone numbers from site subcontractors under TN-ACT-SEC17.
          </div>
        </div>

        {/* Active Incident Triage Queue Preview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
              Recent Incident Rail Submissions
            </h3>
            <button
              onClick={() => setAdminTab('reports')}
              className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1"
            >
              <span>View All ({reports.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {reports.slice(0, 3).map((rep) => (
              <div
                key={rep.id}
                onClick={() => setAdminTab('reports')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[11px] text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {rep.refCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      rep.severity === 'urgent'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {rep.severity === 'urgent' ? '⚠️ Urgent' : 'Moderate'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      PIN: {rep.pin}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 truncate">
                    {rep.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    📍 {rep.location}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    rep.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : rep.status === 'action_in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : rep.status === 'assigned'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                  }`}>
                    {rep.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Assignee: <strong className="text-slate-700">{rep.assignedTo.split('(')[0]}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
