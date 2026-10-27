import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Calendar, 
  ArrowUpRight, 
  Timer, 
  X, 
  ShieldCheck,
  AlertTriangle,
  History
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AttendanceRail() {
  const { 
    activeIndustry, 
    attendanceHistory, 
    todayCheckedIn, 
    checkInTime, 
    checkOutTime, 
    punchAttendance, 
    language, 
    t 
  } = useApp();

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleQrScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setQrModalOpen(false);
      punchAttendance(todayCheckedIn ? 'out' : 'in');
      try {
        confetti({ particleCount: 40, spread: 60 });
      } catch {
        // ignore
      }
    }, 1800);
  };

  return (
    <div className="pb-16 max-w-lg mx-auto bg-white min-h-screen">
      {/* Subheader */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 text-xs">
        <span className="text-slate-600 font-medium">
          {t.greeting}, <strong className="text-slate-900">{language === 'ta' ? activeIndustry.worker.tamilName : activeIndustry.worker.name}</strong>
        </span>
        <span className="text-teal-700 font-semibold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {t.todayShift}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Today's Live Attendance Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold">{activeIndustry.sites[0].split('(')[0]}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
              ● Geofence Active
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-slate-400 text-xs block mb-1">
                {todayCheckedIn ? "Shift in Progress" : "Shift Completed"}
              </span>
              <div className="text-2xl font-extrabold tracking-tight">
                {todayCheckedIn ? "3h 48m Recorded" : "Shift Closed Today"}
              </div>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-xs block mb-1">Check-in:</span>
              <span className="font-mono font-bold text-sm text-teal-300 bg-slate-800/80 px-2 py-1 rounded">
                {checkInTime || "07:05 AM"}
              </span>
            </div>
          </div>

          {/* Shift Progress Bar */}
          <div className="mb-4 space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Standard Shift: 8.0h</span>
              <span className="text-teal-300 font-bold">47% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-slate-700/80 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full w-[47%] transition-all"></div>
            </div>
          </div>

          {/* Action Punch Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-700/70">
            {todayCheckedIn ? (
              <button
                type="button"
                onClick={() => punchAttendance('out')}
                className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Clock className="w-4 h-4" />
                <span>{t.checkOut}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => punchAttendance('in')}
                className="py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Clock className="w-4 h-4" />
                <span>{t.checkIn}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setQrModalOpen(true)}
              className="py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-600"
            >
              <QrCode className="w-4 h-4 text-teal-300" />
              <span>{t.qrScanAttendance}</span>
            </button>
          </div>
        </div>

        {/* Notice on Overtime Calculation rules */}
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div className="leading-snug text-[11px]">
            <strong>Transparent Overtime Policy:</strong> Any shift duration beyond 8.0 hours is automatically recorded and submitted for supervisory review at <strong>{activeIndustry.worker.payScale.overtimeMultiplier}x statutory overtime rate</strong>.
          </div>
        </div>

        {/* Attendance History Roster */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-600" />
              <span>{t.recentAttendance}</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-500">
              Current Cycle: Oct 2026
            </span>
          </div>

          <div className="space-y-2">
            {attendanceHistory.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-xl border text-xs transition-all ${
                  item.flagged 
                    ? 'bg-amber-50/70 border-amber-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-bold text-slate-900 text-xs">
                    {item.day} <span className="text-slate-400 font-normal">({item.date})</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.flagged 
                      ? 'bg-amber-200 text-amber-900' 
                      : item.status.includes('Approved')
                        ? 'bg-teal-100 text-teal-800'
                        : item.status.includes('Rest')
                          ? 'bg-slate-200 text-slate-600'
                          : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400 block text-[9px]">Check In</span>
                    <span className="font-mono font-semibold">{item.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Check Out</span>
                    <span className="font-mono font-semibold">{item.checkOut || "In Progress"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Duration / OT</span>
                    <span className="font-semibold text-slate-900">
                      {item.durationHours}h {item.overtimeHours > 0 && <span className="text-teal-700 font-bold">(+{item.overtimeHours}h OT)</span>}
                    </span>
                  </div>
                </div>

                {item.flagged && (
                  <div className="mt-2 text-[10px] text-amber-900 bg-amber-100/70 p-1.5 rounded flex items-center gap-1 font-medium">
                    <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>{t.incompletePunch}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Scanner Simulation Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-sm w-full p-5 text-center relative">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-sm mb-1">
              Worksite QR Attendance Scanner
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Point your camera at the site entrance beacon card to verify shift punch
            </p>

            {/* Scanner Frame Viewfinder */}
            <div className="w-56 h-56 mx-auto bg-slate-950 rounded-2xl border-2 border-teal-500 relative flex items-center justify-center overflow-hidden mb-4 shadow-inner">
              <div className="absolute inset-4 border-2 border-dashed border-teal-400/50 rounded-xl"></div>
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-teal-400 shadow-[0_0_15px_#2dd4bf] animate-bounce"></div>
              )}
              <QrCode className="w-24 h-24 text-slate-600" />
              <div className="absolute bottom-2 text-[10px] text-teal-300 font-mono">
                {activeIndustry.sites[0].split('(')[0]}
              </div>
            </div>

            <button
              type="button"
              disabled={isScanning}
              onClick={handleQrScan}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Geofence & Server Token...</span>
                </>
              ) : (
                <span>Simulate Scan QR Code</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
