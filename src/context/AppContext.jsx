import React, { createContext, useContext, useState, useEffect } from 'react';
import { industryConfigs } from '../data/industries';
import { translations } from '../data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Application State
  const [role, setRole] = useState('worker'); // 'worker' | 'employer'
  const [industryKey, setIndustryKey] = useState('construction'); // 'construction' | 'university'
  const [language, setLanguage] = useState('en'); // 'en' | 'ta'
  const [workerTab, setWorkerTab] = useState('safevoice'); // 'safevoice' | 'home' | 'attendance' | 'pay' | 'profile'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'reports' | 'alerts' | 'attendance_admin' | 'pay_policy' | 'audit'
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'desktop'
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackedReportPin, setTrackedReportPin] = useState('');
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "AKSHAVI K",
    email: "akshavi.k@cmrl-metro.in",
    phone: "+91 98401 23456",
    code: "CMRL-W-4089",
    role: "worker",
    industry: "construction"
  });

  // Live dynamic state per industry
  const [industryState, setIndustryState] = useState(() => {
    return {
      construction: {
        reports: [...industryConfigs.construction.initialReports],
        fatigueAlerts: [...industryConfigs.construction.fatigueAlerts],
        attendanceHistory: [...industryConfigs.construction.attendanceHistory],
        payScale: { ...industryConfigs.construction.worker.payScale },
        todayCheckedIn: true,
        checkInTime: "07:05 AM",
        checkOutTime: null,
      },
      university: {
        reports: [...industryConfigs.university.initialReports],
        fatigueAlerts: [...industryConfigs.university.fatigueAlerts],
        attendanceHistory: [...industryConfigs.university.attendanceHistory],
        payScale: { ...industryConfigs.university.worker.payScale },
        todayCheckedIn: true,
        checkInTime: "07:55 AM",
        checkOutTime: null,
      }
    };
  });

  // Audit Log State
  const [auditLogs, setAuditLogs] = useState([
    {
      id: "aud-001",
      timestamp: "2026-10-27 08:30:12",
      actor: "System / TN-ACT-SEC17 Rail",
      action: "REPORT_ENCRYPTED",
      target: "FS-2026-8812 (Pier 4 Scaffolding)",
      details: "Full Anonymous Shield applied. Reporter credentials purged. PIN generated: 839204."
    },
    {
      id: "aud-002",
      timestamp: "2026-10-27 08:35:40",
      actor: "Kavitha Rajan (Site Operations)",
      action: "ASSIGNMENT_DISPATCH",
      target: "FS-2026-8812",
      details: "Assigned to Chief Safety Engineer Senthil Murugan under 4-hour SLA."
    },
    {
      id: "aud-003",
      timestamp: "2026-10-27 09:40:05",
      actor: "Fatigue Engine #Rule-104",
      action: "FATIGUE_ALERT_TRIGGERED",
      target: "Worker CMRL-W-3820 (Crane Operator)",
      details: "11.2 continuous hours detected on 120T crane without mandatory rest."
    }
  ]);

  const activeIndustry = industryConfigs[industryKey];
  const activeData = industryState[industryKey];
  const t = translations[language] || translations.en;

  // Record Audit Event
  const logAudit = (action, target, details, actor = null) => {
    const actorName = actor || (role === 'employer' ? "Site Safety Officer" : "Worker (" + activeIndustry.worker.name + ")");
    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    const newLog = {
      id: `aud-${Date.now()}`,
      timestamp: timeStr,
      actor: actorName,
      action,
      target,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Submit New Report
  const submitReport = (reportData) => {
    const refCode = `FS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const pin = String(Math.floor(100000 + Math.random() * 900000));
    const nowIso = new Date().toISOString();

    const newReport = {
      id: `rep-${Date.now()}`,
      refCode,
      pin,
      category: reportData.category,
      title: reportData.title || (reportData.category === 'safety' ? 'Workplace Hazard Report' : 'Worker Concern'),
      location: reportData.location || activeIndustry.sites[0],
      severity: reportData.severity, // 'urgent' | 'moderate'
      tier: reportData.tier, // 'anonymous' | 'confidential'
      status: 'submitted',
      createdAt: nowIso,
      reporter: reportData.tier === 'anonymous' ? 'Anonymous Shield (Protected)' : activeIndustry.worker.name,
      voiceNote: reportData.voiceNote || { hasAudio: false, duration: "0:00" },
      images: reportData.images || [],
      assignedTo: 'Unassigned (In Triage)',
      description: reportData.description,
      publicUpdates: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: `Report logged via SafeVoice™ Rail. Ref: ${refCode}. Impartial investigation initiated under statutory protocols.`
        }
      ],
      internalNotes: reportData.tier === 'anonymous' 
        ? "Identity cryptographically decoupled. Source IP and device metadata restricted."
        : `Confidential report submitted by ${activeIndustry.worker.name} (${activeIndustry.worker.code}). Shielded from contractor.`
    };

    setIndustryState(prev => ({
      ...prev,
      [industryKey]: {
        ...prev[industryKey],
        reports: [newReport, ...prev[industryKey].reports]
      }
    }));

    logAudit("SAFEVOICE_REPORT_SUBMITTED", refCode, `Category: ${reportData.category}, Tier: ${reportData.tier}, Severity: ${reportData.severity}`);

    return { refCode, pin };
  };

  // Update Report Status & Assignment (Employer / Admin)
  const updateReportStatus = (reportId, newStatus, assignedTo, resolutionNote, internalNote) => {
    setIndustryState(prev => {
      const currentReports = prev[industryKey].reports;
      const updated = currentReports.map(rep => {
        if (rep.id === reportId) {
          const publicUpdates = [...rep.publicUpdates];
          if (resolutionNote && resolutionNote.trim()) {
            publicUpdates.unshift({
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: resolutionNote
            });
          }
          return {
            ...rep,
            status: newStatus || rep.status,
            assignedTo: assignedTo || rep.assignedTo,
            internalNotes: internalNote ? `${rep.internalNotes} | Update: ${internalNote}` : rep.internalNotes,
            publicUpdates
          };
        }
        return rep;
      });
      return {
        ...prev,
        [industryKey]: {
          ...prev[industryKey],
          reports: updated
        }
      };
    });

    logAudit("REPORT_STATUS_UPDATED", reportId, `Status changed to ${newStatus}. Assignee: ${assignedTo || 'Unchanged'}`);
  };

  // Acknowledge Fatigue Alert
  const acknowledgeFatigueAlert = (alertId, supervisorName) => {
    setIndustryState(prev => {
      const alerts = prev[industryKey].fatigueAlerts.map(alt => {
        if (alt.id === alertId) {
          return {
            ...alt,
            acknowledged: true,
            acknowledgedBy: supervisorName || "Site Safety Superintendent",
            acknowledgedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return alt;
      });
      return {
        ...prev,
        [industryKey]: {
          ...prev[industryKey],
          fatigueAlerts: alerts
        }
      };
    });

    logAudit("FATIGUE_ALERT_ACKNOWLEDGED", alertId, `Acknowledged by ${supervisorName || 'Site Safety Superintendent'}`);
  };

  // Check In / Check Out Worker
  const punchAttendance = (type) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIndustryState(prev => {
      const current = prev[industryKey];
      if (type === 'in') {
        return {
          ...prev,
          [industryKey]: {
            ...current,
            todayCheckedIn: true,
            checkInTime: timeStr,
            checkOutTime: null,
          }
        };
      } else {
        return {
          ...prev,
          [industryKey]: {
            ...current,
            todayCheckedIn: false,
            checkOutTime: timeStr,
          }
        };
      }
    });

    logAudit(type === 'in' ? "WORKER_CHECK_IN" : "WORKER_CHECK_OUT", activeIndustry.worker.code, `Recorded at ${timeStr} via Site Geofence`);
  };

  // Update Pay Policy
  const updatePayScale = (newPayScale) => {
    setIndustryState(prev => ({
      ...prev,
      [industryKey]: {
        ...prev[industryKey],
        payScale: { ...prev[industryKey].payScale, ...newPayScale }
      }
    }));
    logAudit("PAY_POLICY_UPDATED", `${activeIndustry.name}`, `Daily base wage: ₹${newPayScale.basicRatePerDay}, Overtime multiplier: ${newPayScale.overtimeMultiplier}x`);
  };

  // Authentication Handlers
  const login = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    if (user.role) setRole(user.role);
    if (user.industry) setIndustryKey(user.industry);
    logAudit("USER_LOGIN", user.name || user.code || "User", `Authenticated as ${user.role} in ${user.industry}`);
  };

  const signup = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    if (user.role) setRole(user.role);
    if (user.industry) setIndustryKey(user.industry);
    logAudit("USER_REGISTERED", user.name || user.code || "New User", `Account registered as ${user.role} in ${user.industry}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    logAudit("USER_LOGOUT", currentUser?.name || "User", "Session terminated");
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        industryKey,
        setIndustryKey,
        language,
        setLanguage,
        workerTab,
        setWorkerTab,
        adminTab,
        setAdminTab,
        viewMode,
        setViewMode,
        isDemoGuideOpen,
        setIsDemoGuideOpen,
        trackingModalOpen,
        setTrackingModalOpen,
        trackedReportPin,
        setTrackedReportPin,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        login,
        signup,
        logout,
        activeIndustry,
        activeData,
        reports: activeData.reports,
        fatigueAlerts: activeData.fatigueAlerts,
        attendanceHistory: activeData.attendanceHistory,
        payScale: activeData.payScale,
        todayCheckedIn: activeData.todayCheckedIn,
        checkInTime: activeData.checkInTime,
        checkOutTime: activeData.checkOutTime,
        auditLogs,
        submitReport,
        updateReportStatus,
        acknowledgeFatigueAlert,
        punchAttendance,
        updatePayScale,
        logAudit,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
