import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SafeVoiceRail from './components/worker/SafeVoiceRail';
import AttendanceRail from './components/worker/AttendanceRail';
import PayClarityRail from './components/worker/PayClarityRail';
import WorkerHome from './components/worker/WorkerHome';
import SkillPassport from './components/worker/SkillPassport';
import AdminDashboard from './components/admin/AdminDashboard';
import IncidentQueue from './components/admin/IncidentQueue';
import FatigueAlertsRail from './components/admin/FatigueAlertsRail';
import AttendanceReview from './components/admin/AttendanceReview';
import PayPolicyConfig from './components/admin/PayPolicyConfig';
import AuditLogRail from './components/admin/AuditLogRail';
import ReportTrackerModal from './components/worker/ReportTrackerModal';
import DemoGuideModal from './components/DemoGuideModal';
import { Smartphone, Monitor } from 'lucide-react';

function MainLayout() {
  const { role, workerTab, adminTab, viewMode, activeIndustry } = useApp();

  // Render Worker Content based on active tab
  const renderWorkerContent = () => {
    switch (workerTab) {
      case 'home':
        return <WorkerHome />;
      case 'attendance':
        return <AttendanceRail />;
      case 'pay':
        return <PayClarityRail />;
      case 'safevoice':
        return <SafeVoiceRail />;
      case 'profile':
        return <SkillPassport />;
      default:
        return <SafeVoiceRail />;
    }
  };

  // Render Admin Content based on active tab
  const renderAdminContent = () => {
    switch (adminTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'reports':
        return <IncidentQueue />;
      case 'alerts':
        return <FatigueAlertsRail />;
      case 'attendance_admin':
        return <AttendanceReview />;
      case 'pay_policy':
        return <PayPolicyConfig />;
      case 'audit':
        return <AuditLogRail />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header />

      {/* Admin Navigation (only visible in employer mode) */}
      {role === 'employer' && <Navigation />}

      {/* Main Content Area */}
      <main className="flex-1 pb-6">
        {role === 'worker' ? (
          viewMode === 'mobile' ? (
            /* Mobile Device Frame Simulation */
            <div className="py-4 sm:py-8 px-2 flex justify-center items-center">
              <div className="w-full max-w-[430px] bg-slate-900 rounded-[44px] p-3 sm:p-3.5 shadow-2xl border-4 border-slate-800 relative">
                {/* Simulated Phone Ear speaker & Camera island */}
                <div className="absolute top-4 inset-x-0 mx-auto w-32 h-4.5 bg-black rounded-full flex items-center justify-center gap-2 z-40">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                </div>

                {/* Inner Mobile Screen */}
                <div className="w-full bg-white rounded-[36px] overflow-hidden flex flex-col max-h-[844px] h-[844px] shadow-inner relative">
                  {/* Mobile Status Bar */}
                  <div className="h-8 bg-white px-5 pt-1.5 flex items-center justify-between text-[11px] font-bold text-slate-800 z-30 select-none">
                    <span>10:55</span>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <span className="text-[10px]">5G</span>
                      <span className="text-[10px]">●●●</span>
                      <span>🔋 98%</span>
                    </div>
                  </div>

                  {/* Scrollable Screen Content */}
                  <div className="flex-1 overflow-y-auto no-scrollbar">
                    {renderWorkerContent()}
                  </div>

                  {/* Worker Bottom Navigation */}
                  <Navigation />
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Full View for Worker */
            <div className="max-w-4xl mx-auto py-6 px-4">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                {renderWorkerContent()}
              </div>
              <div className="mt-4">
                <Navigation />
              </div>
            </div>
          )
        ) : (
          /* Employer / Admin Portal Fullscreen Dashboard */
          <div>
            {renderAdminContent()}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <ReportTrackerModal />
      <DemoGuideModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
