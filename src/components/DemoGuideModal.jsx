import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  ChevronRight,
  Play
} from 'lucide-react';

export default function DemoGuideModal() {
  const { 
    isDemoGuideOpen, 
    setIsDemoGuideOpen, 
    setRole, 
    setIndustryKey, 
    setWorkerTab, 
    setAdminTab, 
    setTrackingModalOpen,
    reports 
  } = useApp();

  const [currentStep, setCurrentStep] = useState(0);

  if (!isDemoGuideOpen) return null;

  const demoSteps = [
    {
      num: 1,
      title: "1. Open Construction Worker Portal",
      desc: "Experience the mobile-first worker interface configured for heavy metro rail infrastructure with AKSHAVI K (Rigging Specialist).",
      actionLabel: "Go to Construction Portal",
      action: () => {
        setIndustryKey('construction');
        setRole('worker');
        setWorkerTab('safevoice');
      }
    },
    {
      num: 2,
      title: "2. Inspect Attendance & Hours Calculation",
      desc: "Check today's shift duration (3h 48m recorded vs 8.0h scheduled), geofence beacon #902 connection, and overtime flags.",
      actionLabel: "View Attendance Rail",
      action: () => {
        setIndustryKey('construction');
        setRole('worker');
        setWorkerTab('attendance');
      }
    },
    {
      num: 3,
      title: "3. Submit Scaffolding Hazard Report",
      desc: "Navigate to SafeVoice™ Rail. Notice the TN-ACT-SEC17 shield, anonymous tier with 6-digit PIN, location geofence, and voice recorder.",
      actionLabel: "Open SafeVoice Reporting Form",
      action: () => {
        setIndustryKey('construction');
        setRole('worker');
        setWorkerTab('safevoice');
      }
    },
    {
      num: 4,
      title: "4. Track Incident via 6-Digit Private PIN",
      desc: "Workers track live progress without revealing identity using access PIN '839-204' or their generated code.",
      actionLabel: "Open PIN Status Tracker",
      action: () => {
        setTrackingModalOpen(true);
      }
    },
    {
      num: 5,
      title: "5. Switch to Authorized Employer / Admin Portal",
      desc: "Access executive oversight: active workforce counts, 4-hour SLA tracking, and the triage incident queue.",
      actionLabel: "Switch to Employer Portal",
      action: () => {
        setRole('employer');
        setAdminTab('dashboard');
      }
    },
    {
      num: 6,
      title: "6. Triage, Assign Supervisor & Update Status",
      desc: "Review report FS-2026-8812, assign to Chief Safety Engineer Senthil Murugan, post public updates, and update lifecycle.",
      actionLabel: "Open Incident Triage Queue",
      action: () => {
        setRole('employer');
        setAdminTab('reports');
      }
    },
    {
      num: 7,
      title: "7. Review Fatigue & Operational Alerts",
      desc: "Inspect rule-based fatigue alerts: >10.5 continuous hours, back-to-back shifts, and missing punches requiring human review.",
      actionLabel: "Open Fatigue Alerts Rail",
      action: () => {
        setRole('employer');
        setAdminTab('alerts');
      }
    },
    {
      num: 8,
      title: "8. Transparent Pay Breakdown & What-If Simulator",
      desc: "Inspect transparent salary calculations: Basic + Hazard pay + 2.0x Overtime rate - EPF/ESI statutory deductions.",
      actionLabel: "View PayClarity Rail",
      action: () => {
        setRole('worker');
        setWorkerTab('pay');
      }
    },
    {
      num: 9,
      title: "9. Switch Industry Config to College / University",
      desc: "Instantly reconfigure the entire platform for SRM University: campus housekeeping, security guards, electrical duct hazards, and 1.5x pay rules.",
      actionLabel: "Switch to University Config",
      action: () => {
        setIndustryKey('university');
        setRole('worker');
        setWorkerTab('safevoice');
      }
    },
    {
      num: 10,
      title: "10. Campus Maintenance Hazard Workflow",
      desc: "Verify that the identical core SafeVoice and employer triage workflows operate seamlessly with university-specific departments and roles.",
      actionLabel: "Inspect University Incident Rail",
      action: () => {
        setIndustryKey('university');
        setRole('employer');
        setAdminTab('reports');
      }
    }
  ];

  const current = demoSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight">
                FairShift Evaluation Demo Script
              </h3>
              <p className="text-[10px] text-slate-400">
                PRD Section 15 • 10-Step Interactive Workflow Walkthrough
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsDemoGuideOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block mb-1">
              Step {current.num} of 10
            </span>
            <h4 className="font-extrabold text-sm text-slate-900 mb-1">
              {current.title}
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              {current.desc}
            </p>
          </div>

          {/* Interactive Trigger Button */}
          <button
            type="button"
            onClick={() => {
              current.action();
              setIsDemoGuideOpen(false);
            }}
            className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute: {current.actionLabel}</span>
          </button>

          {/* Steps List Overview */}
          <div className="pt-2 border-t border-slate-200">
            <span className="font-bold text-slate-700 text-[11px] block mb-2">
              All 10 Demonstration Milestones:
            </span>
            <div className="space-y-1">
              {demoSteps.map((step, idx) => (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full p-2 rounded-lg text-left text-[11px] flex items-center justify-between transition-colors ${
                    idx === currentStep
                      ? 'bg-slate-100 text-teal-900 font-bold border border-slate-300'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-2">{step.title}</span>
                  {idx === currentStep && <ChevronRight className="w-3.5 h-3.5 text-teal-700 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-semibold disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-[11px] font-mono text-slate-500">
            {currentStep + 1} / 10
          </span>

          <button
            type="button"
            disabled={currentStep === demoSteps.length - 1}
            onClick={() => setCurrentStep(prev => Math.min(demoSteps.length - 1, prev + 1))}
            className="px-3 py-1.5 rounded-lg bg-teal-800 text-white font-bold disabled:opacity-50"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
