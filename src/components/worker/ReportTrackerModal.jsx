import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  CheckCircle, 
  AlertTriangle, 
  Lock, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function ReportTrackerModal() {
  const { 
    trackingModalOpen, 
    setTrackingModalOpen, 
    trackedReportPin, 
    setTrackedReportPin, 
    reports, 
    t 
  } = useApp();

  const [inputVal, setInputVal] = useState(trackedReportPin || '');
  const [activeReport, setActiveReport] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (trackedReportPin) {
      setInputVal(trackedReportPin);
      searchReport(trackedReportPin);
    } else if (reports.length > 0) {
      // Default to the first report for instant demonstration
      setActiveReport(reports[0]);
      setInputVal(reports[0].pin);
    }
  }, [trackedReportPin, reports]);

  if (!trackingModalOpen) return null;

  const searchReport = (query) => {
    const cleanQuery = query.trim().replace(/[-\s]/g, '').toLowerCase();
    const found = reports.find(r => 
      r.pin.toLowerCase() === cleanQuery || 
      r.refCode.toLowerCase().replace(/[-\s]/g, '') === cleanQuery ||
      r.refCode.toLowerCase() === query.trim().toLowerCase()
    );
    setActiveReport(found || null);
    setHasSearched(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchReport(inputVal);
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'submitted': return 0;
      case 'under_review': return 1;
      case 'assigned': return 2;
      case 'action_in_progress': return 3;
      case 'resolved': return 4;
      default: return 0;
    }
  };

  const timelineSteps = [
    { label: t.statusSubmitted, desc: "Encrypted & logged via SafeVoice rail" },
    { label: t.statusUnderReview, desc: "4-Hour SLA statutory triage in progress" },
    { label: t.statusAssigned, desc: "Safety ombudsperson dispatched to site" },
    { label: t.statusInProgress, desc: "Hazard correction & mitigation active" },
    { label: t.statusResolved, desc: "Verified safe & officially closed" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                {t.trackReport}
              </h3>
              <p className="text-[10px] text-slate-500">
                Statutory Tracking Rail • TN-ACT-SEC17 Impartial Audit
              </p>
            </div>
          </div>
          <button
            onClick={() => setTrackingModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t.enterPin}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900"
            >
              {t.trackButton}
            </button>
          </form>

          {/* Quick Demo PIN Chips */}
          <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-slate-500 overflow-x-auto no-scrollbar">
            <span className="font-semibold text-slate-600 shrink-0">Demo Pins:</span>
            {reports.slice(0, 3).map(r => (
              <button
                key={r.pin}
                type="button"
                onClick={() => {
                  setInputVal(r.pin);
                  searchReport(r.pin);
                }}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 font-mono text-[10px] font-bold"
              >
                PIN: {r.pin} ({r.category})
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {activeReport ? (
            <>
              {/* Report Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Ref: {activeReport.refCode}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    activeReport.severity === 'urgent' 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    {activeReport.severity === 'urgent' ? '⚠️ Urgent Stop-Work' : 'Standard Priority'}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-900">
                  {activeReport.title}
                </div>
                <div className="text-[11px] text-slate-600">
                  📍 {activeReport.location}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200">
                  <span className="text-slate-500">
                    Tier: <strong className="text-slate-800">{activeReport.tier === 'anonymous' ? '🛡️ Anonymous Shield' : '🔒 Confidential'}</strong>
                  </span>
                  <span className="text-slate-500">
                    Assignee: <strong className="text-teal-800">{activeReport.assignedTo}</strong>
                  </span>
                </div>
              </div>

              {/* Progress Stepper Timeline */}
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="font-bold text-xs text-slate-800 mb-3 flex items-center justify-between">
                  <span>Lifecycle Milestone Progress</span>
                  <span className="text-teal-700 text-[10px]">Statutory SLA Protected</span>
                </div>

                <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {timelineSteps.map((step, idx) => {
                    const currentIdx = getStatusStepIndex(activeReport.status);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step.label} className="relative">
                        <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                          isDone 
                            ? 'bg-teal-700 text-white border-teal-700' 
                            : 'bg-white text-slate-300 border-slate-200'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          <span className={isCurrent ? 'text-teal-900 font-extrabold' : isDone ? 'text-slate-800' : 'text-slate-400'}>
                            {step.label}
                          </span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-teal-100 text-teal-800 font-bold animate-pulse">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                          {step.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Public Timeline Updates */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-700" />
                  <span>{t.publicUpdates}</span>
                </div>

                {activeReport.publicUpdates && activeReport.publicUpdates.length > 0 ? (
                  <div className="space-y-2">
                    {activeReport.publicUpdates.map((u, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px]">
                        <span className="font-bold text-teal-800 text-[10px] block mb-0.5">
                          {u.time}
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          {u.note}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">
                    Awaiting first field update from assigned safety officer.
                  </p>
                )}
              </div>

              {/* Legal Non-Retaliation Notice */}
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-[11px] flex items-start gap-2">
                <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong>Statutory Protection Active:</strong> Retaliation, shift cut, or wage tampering against this report is strictly actionable under Tamil Nadu Labor Act Sec 17. Internal notes are protected to preserve impartial investigation.
                </div>
              </div>
            </>
          ) : hasSearched ? (
            <div className="py-8 text-center text-slate-500">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-bold text-slate-800">{t.noReportsYet}</p>
              <p className="text-xs text-slate-400 mt-1">Please verify your 6-digit PIN or reference code.</p>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setTrackingModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
