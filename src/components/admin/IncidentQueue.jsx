import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Eye, 
  Lock, 
  X, 
  Play, 
  MessageSquare, 
  Save, 
  ArrowUpRight,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IncidentQueue() {
  const { 
    reports, 
    activeIndustry, 
    updateReportStatus, 
    t 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Modal / Selected Report for Triage
  const [selectedReport, setSelectedReport] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editAssignee, setEditAssignee] = useState('');
  const [newPublicUpdate, setNewPublicUpdate] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');

  const openTriageModal = (report) => {
    setSelectedReport(report);
    setEditStatus(report.status);
    setEditAssignee(report.assignedTo);
    setNewPublicUpdate('');
    setNewInternalNote('');
  };

  const handleSaveTriage = (e) => {
    e.preventDefault();
    if (!selectedReport) return;

    updateReportStatus(
      selectedReport.id,
      editStatus,
      editAssignee,
      newPublicUpdate,
      newInternalNote
    );

    if (editStatus === 'resolved') {
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {
        // ignore
      }
    }

    setSelectedReport(null);
  };

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      r.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.pin.includes(searchQuery) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || r.category === categoryFilter;
    const matchesSeverity = severityFilter === 'all' || r.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesSeverity;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 border border-teal-200">
              SafeVoice™ Incident Queue
            </span>
            <span className="text-xs text-slate-500">
              4-Hour SLA Statutory Triage & Resolution Rail
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.incidentQueue}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            Total Incident Reports: <strong>{reports.length}</strong>
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Ref ID, 6-digit PIN, location, or keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="assigned">Assigned</option>
              <option value="action_in_progress">Action in Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">All Severities</option>
              <option value="urgent">⚠️ Urgent Stop-Work</option>
              <option value="moderate">ℹ️ Moderate</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="safety">Safety Hazard</option>
              <option value="unfair">Unfair Treatment</option>
              <option value="wage">Wage & Overtime</option>
              <option value="water">Drinking Water</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table / Card List */}
      <div className="space-y-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-xs text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {report.refCode}
                </span>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  PIN: <strong>{report.pin}</strong>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  report.severity === 'urgent'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {report.severity === 'urgent' ? '⚠️ Stop-Work Condition' : 'Moderate'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                  {report.tier === 'anonymous' ? '🛡️ Anonymous Shield' : '🔒 Confidential Tier'}
                </span>
                {report.voiceNote?.hasAudio && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                    🎙️ Voice Note ({report.voiceNote.duration})
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {report.title}
                </h3>
                <p className="text-slate-600 text-xs mt-0.5 line-clamp-2">
                  {report.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px] pt-1">
                <span>📍 {report.location}</span>
                <span>•</span>
                <span>Reporter: <strong className="text-slate-700">{report.reporter}</strong></span>
                <span>•</span>
                <span>Assignee: <strong className="text-teal-800">{report.assignedTo}</strong></span>
              </div>
            </div>

            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                report.status === 'resolved'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : report.status === 'action_in_progress'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : report.status === 'assigned'
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {report.status.replace(/_/g, ' ')}
              </span>

              <button
                type="button"
                onClick={() => openTriageModal(report)}
                className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Triage & Update</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="font-bold text-slate-800">No reports matching filter criteria</p>
          </div>
        )}
      </div>

      {/* Triage & Status Update Modal (FR-05) */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono font-bold text-xs text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                    Ref: {selectedReport.refCode}
                  </span>
                  <span className="font-mono text-xs text-slate-300">
                    PIN: {selectedReport.pin}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm tracking-tight">
                  Triage & Assign Incident Report
                </h3>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* Incident Details Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-slate-500">
                    Category: {selectedReport.category.toUpperCase()}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    selectedReport.severity === 'urgent' ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {selectedReport.severity}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900">
                  {selectedReport.title}
                </div>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {selectedReport.description}
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  📍 Location: <strong>{selectedReport.location}</strong>
                </div>
              </div>

              {/* Triage & Management Form */}
              <form onSubmit={handleSaveTriage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Update Lifecycle Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
                    >
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review (4h SLA)</option>
                      <option value="assigned">Assigned to Officer</option>
                      <option value="action_in_progress">Action in Progress</option>
                      <option value="resolved">Resolved & Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Assign Accountability
                    </label>
                    <select
                      value={editAssignee}
                      onChange={(e) => setEditAssignee(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
                    >
                      {activeIndustry.supervisors.map(s => (
                        <option key={s.id} value={`${s.name} (${s.role.split('(')[0]})`}>
                          {s.name} — {s.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Public Status Update (Worker Visible) */}
                <div>
                  <label className="block font-bold text-teal-900 text-xs mb-1 flex items-center justify-between">
                    <span>Public Status Update (Visible to Worker via PIN Tracker)</span>
                    <span className="text-[10px] text-teal-700">Encrypted Broadcast</span>
                  </label>
                  <textarea
                    rows={2}
                    value={newPublicUpdate}
                    onChange={(e) => setNewPublicUpdate(e.target.value)}
                    placeholder="e.g. Field safety inspector dispatched to Pier 4. Scaffolding cross-bracing replaced. Stop-work lifted."
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
                  />
                </div>

                {/* Internal Investigation Notes (Protected from Worker) */}
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1 flex items-center justify-between">
                    <span>Internal Confidential Investigation Log</span>
                    <span className="text-[10px] text-red-600 font-bold">🔒 Hidden from Worker</span>
                  </label>
                  <textarea
                    rows={2}
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                    placeholder="e.g. Subcontractor warned for equipment non-compliance. Penalty ₹5,000 processed."
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Current Internal Notes: {selectedReport.internalNotes}
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSelectedReport(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Updates & Log Audit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
