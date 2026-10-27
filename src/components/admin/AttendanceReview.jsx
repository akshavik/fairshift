import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Search, 
  Check, 
  X,
  FileSpreadsheet
} from 'lucide-react';

export default function AttendanceReview() {
  const { 
    activeIndustry, 
    attendanceHistory, 
    language, 
    t 
  } = useApp();

  const [filterDate, setFilterDate] = useState('2026-10-27');
  const [approvedRows, setApprovedRows] = useState({});

  const toggleApproval = (index) => {
    setApprovedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 border border-teal-200">
              Workforce Muster Roll
            </span>
            <span className="text-xs text-slate-500">
              Shift Attendance & Overtime Verification Desk
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Attendance & Overtime Management
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Attendance register exported to CSV (Factories Form 25 format).")}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-700" />
            <span>Export Muster Roll (CSV)</span>
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-slate-800">
            Site: {activeIndustry.sites[0].split('(')[0]}
          </span>
          <span className="text-slate-500 text-[11px]">
            Statutory Rule: Overtime calculated at <strong>{activeIndustry.worker.payScale.overtimeMultiplier}x</strong> hourly basic
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Shift Date</th>
                <th className="p-3">Worker Code & Role</th>
                <th className="p-3">Scheduled Shift</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
                <th className="p-3">Recorded Duration</th>
                <th className="p-3">Overtime Hours</th>
                <th className="p-3">Supervisor Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceHistory.map((item, index) => {
                const isApproved = approvedRows[index] || item.status.includes('Approved');
                return (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {item.date} <span className="text-slate-400 block text-[10px]">{item.day}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-mono font-bold text-teal-900 bg-teal-50 px-1.5 py-0.2 rounded text-[10px]">
                        {activeIndustry.worker.code}
                      </span>
                      <span className="block font-medium text-slate-800 mt-0.5">
                        {activeIndustry.worker.name}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">
                      {item.scheduled}
                    </td>
                    <td className="p-3 font-mono font-medium text-slate-800">
                      {item.checkIn}
                    </td>
                    <td className="p-3 font-mono font-medium text-slate-800">
                      {item.checkOut || <span className="text-teal-700 font-bold animate-pulse">Active On Site</span>}
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {item.durationHours}h
                    </td>
                    <td className="p-3">
                      {item.overtimeHours > 0 ? (
                        <span className="font-extrabold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          +{item.overtimeHours} hrs
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-3">
                      {item.overtimeHours > 0 ? (
                        <button
                          onClick={() => toggleApproval(index)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            isApproved
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                          }`}
                        >
                          {isApproved ? '✓ Overtime Approved' : 'Review & Approve'}
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Regular Shift</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
