import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Calculator,
  RotateCcw
} from 'lucide-react';

export default function PayPolicyConfig() {
  const { 
    activeIndustry, 
    payScale, 
    updatePayScale, 
    industryKey,
    t 
  } = useApp();

  const [formState, setFormState] = useState({
    basicRatePerDay: payScale.basicRatePerDay,
    standardShiftHours: payScale.standardShiftHours || 8,
    overtimeMultiplier: payScale.overtimeMultiplier,
    hazardAllowancePerDay: payScale.hazardAllowancePerDay,
    foodTravelPerDay: payScale.foodTravelPerDay,
    profTaxMonthly: payScale.profTaxMonthly || 200,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePayScale(formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 border border-teal-200">
              Statutory Compensation Architecture
            </span>
            <span className="text-xs text-slate-500">
              Configurable Pay Rules & Multipliers • {activeIndustry.name}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Pay Rules & Policy Configurator
          </h1>
        </div>

        {savedSuccess && (
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Policy Rules Saved & Logged to Audit Trail</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-6 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Base Wage */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              Base Daily Wage (₹ / day)
            </label>
            <input
              type="number"
              value={formState.basicRatePerDay}
              onChange={(e) => setFormState({ ...formState, basicRatePerDay: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400">
              Complies with State Scheduled Minimum Wages Act.
            </span>
          </div>

          {/* Overtime Multiplier */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              Overtime Multiplier Ratio
            </label>
            <select
              value={formState.overtimeMultiplier}
              onChange={(e) => setFormState({ ...formState, overtimeMultiplier: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none bg-white"
            >
              <option value={1.5}>1.5x (Standard Commercial / Service Rate)</option>
              <option value={2.0}>2.0x (Double Rate - Factories Act / Heavy Construction)</option>
              <option value={2.5}>2.5x (Hazardous Shift / Emergency Duty)</option>
            </select>
            <span className="text-[10px] text-slate-400">
              Applied automatically to all recorded hours exceeding 8.0h shift duration.
            </span>
          </div>

          {/* Standard Shift Hours */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              Standard Shift Duration (Hours)
            </label>
            <input
              type="number"
              value={formState.standardShiftHours}
              onChange={(e) => setFormState({ ...formState, standardShiftHours: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
            />
          </div>

          {/* Hazard Allowance */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              Site Hazard & Environmental Allowance (₹ / day)
            </label>
            <input
              type="number"
              value={formState.hazardAllowancePerDay}
              onChange={(e) => setFormState({ ...formState, hazardAllowancePerDay: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
            />
          </div>

          {/* Food & Travel Allowance */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              Food & Travel Allowance (₹ / day)
            </label>
            <input
              type="number"
              value={formState.foodTravelPerDay}
              onChange={(e) => setFormState({ ...formState, foodTravelPerDay: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
            />
          </div>

          {/* Professional Tax */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              Monthly Professional Tax Deduction (₹ / month)
            </label>
            <input
              type="number"
              value={formState.profTaxMonthly}
              onChange={(e) => setFormState({ ...formState, profTaxMonthly: Number(e.target.value) })}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:ring-1 focus:ring-teal-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Apply Pay Policy Rules</span>
          </button>
        </div>
      </form>
    </div>
  );
}
