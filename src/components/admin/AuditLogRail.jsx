import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  History, 
  ShieldCheck, 
  Lock, 
  Clock, 
  FileText, 
  CheckCircle2, 
  User 
} from 'lucide-react';

export default function AuditLogRail() {
  const { auditLogs, activeIndustry } = useApp();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-900 text-teal-300 border border-slate-700">
              Statutory Decent Work Ledger
            </span>
            <span className="text-xs text-slate-500">
              FR-10 Immutable Supervisory & Incident Audit Trail
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            System Audit & Compliance Log
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Cryptographic Integrity Active</span>
          </span>
        </div>
      </div>

      {/* Log Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4 text-xs">
        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-[10px] text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {log.action}
                  </span>
                  <span className="font-bold text-slate-800">
                    {log.target}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {log.details}
                </p>
                <div className="text-[10px] text-slate-400">
                  Actor: <strong className="text-slate-700">{log.actor}</strong>
                </div>
              </div>

              <div className="shrink-0 text-slate-400 font-mono text-[10px] sm:text-right">
                {log.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
