import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldCheck, 
  FileText, 
  X, 
  ThumbsUp,
  Check
} from 'lucide-react';

export default function FatigueAlertsRail() {
  const { 
    fatigueAlerts, 
    activeIndustry, 
    acknowledgeFatigueAlert, 
    t 
  } = useApp();

  const [ackModalAlert, setAckModalAlert] = useState(null);
  const [supervisorName, setSupervisorName] = useState(activeIndustry.supervisors[0].name);
  const [actionNotes, setActionNotes] = useState('');

  const handleConfirmAck = (e) => {
    e.preventDefault();
    if (!ackModalAlert) return;
    acknowledgeFatigueAlert(ackModalAlert.id, supervisorName);
    setAckModalAlert(null);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-100 text-red-800 border border-red-200">
              Rule-Based Operational Guardrails
            </span>
            <span className="text-xs text-slate-500">
              Factories Act Schedule III & ILO Decent Hours Compliance
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Workforce Fatigue & Operational Alerts
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            Unacknowledged: <strong>{fatigueAlerts.filter(a => !a.acknowledged).length}</strong>
          </span>
        </div>
      </div>

      {/* Advisory Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Human Review Policy:</strong> Fatigue engine alerts are prompts for supervisory investigation and ergonomic support, not medical conclusions or grounds for worker penalization.
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {fatigueAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all text-xs ${
              alert.acknowledged
                ? 'bg-slate-50 border-slate-200 opacity-90'
                : 'bg-white border-red-200 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {alert.workerCode}
                  </span>
                  <span className="font-bold text-slate-900">
                    {alert.workerName}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    alert.severity === 'urgent'
                      ? 'bg-red-100 text-red-900 border border-red-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {alert.ruleType}
                  </span>
                </div>

                <p className="text-slate-700 text-xs leading-relaxed pt-1">
                  {alert.description}
                </p>

                <div className="pt-2 text-slate-500 text-[11px]">
                  <strong>Recommended Supervisory Action:</strong> {alert.recommendedAction}
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {alert.acknowledged ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Acknowledged by {alert.acknowledgedBy?.split('(')[0]}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAckModalAlert(alert)}
                    className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Acknowledge & Intervene</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Acknowledge Modal */}
      {ackModalAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">
                Acknowledge Fatigue Alert
              </h3>
              <button onClick={() => setAckModalAlert(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAck} className="space-y-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Worker & Rule</span>
                <span className="font-bold text-slate-800">{ackModalAlert.workerName} • {ackModalAlert.ruleType}</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Acknowledging Supervisor
                </label>
                <select
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 bg-white font-bold text-xs"
                >
                  {activeIndustry.supervisors.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Intervention Note (Audit Trail)
                </label>
                <textarea
                  rows={2}
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  placeholder="e.g. Relieved worker from machinery. Mandatory 12-hour rest break approved with full standard pay."
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAckModalAlert(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-800 text-white font-bold"
                >
                  Confirm Acknowledgment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
