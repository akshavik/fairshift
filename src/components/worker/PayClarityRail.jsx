import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  HelpCircle, 
  Download, 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  Percent, 
  FileText, 
  X, 
  Printer,
  Sliders
} from 'lucide-react';

export default function PayClarityRail() {
  const { 
    activeIndustry, 
    payScale, 
    language, 
    t 
  } = useApp();

  const [simulatedOtHours, setSimulatedOtHours] = useState(6);
  const [showSlipModal, setShowSlipModal] = useState(false);

  // Wage Calculations based on configured pay rules
  const daysWorked = 24;
  const basicDaily = payScale.basicRatePerDay;
  const standardHours = payScale.standardShiftHours || 8;
  const hourlyRate = basicDaily / standardHours;
  const otMultiplier = payScale.overtimeMultiplier;
  const otHourlyRate = hourlyRate * otMultiplier;

  // Earnings
  const baseEarnings = basicDaily * daysWorked;
  const hazardTotal = (payScale.hazardAllowancePerDay || 0) * daysWorked;
  const foodTravelTotal = (payScale.foodTravelPerDay || 0) * daysWorked;
  const overtimeTotal = Math.round(simulatedOtHours * otHourlyRate);
  const grossPay = baseEarnings + hazardTotal + foodTravelTotal + overtimeTotal;

  // Statutory Deductions
  const epfDeduction = Math.round(baseEarnings * (payScale.epfRate || 0.12));
  const esiDeduction = Math.round(grossPay * (payScale.esiRate || 0.0075));
  const profTax = payScale.profTaxMonthly || 200;
  const totalDeductions = epfDeduction + esiDeduction + profTax;

  // Net Take-Home
  const netTakeHome = grossPay - totalDeductions;

  return (
    <div className="pb-16 max-w-lg mx-auto bg-white min-h-screen">
      {/* Subheader */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 text-xs">
        <span className="text-slate-600 font-medium">
          {t.greeting}, <strong className="text-slate-900">{language === 'ta' ? activeIndustry.worker.tamilName : activeIndustry.worker.name}</strong>
        </span>
        <span className="text-teal-700 font-semibold flex items-center gap-1">
          <CreditCard className="w-3.5 h-3.5" />
          {t.navPay}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Net Pay Highlight Card */}
        <div className="bg-gradient-to-br from-teal-900 to-[#005953] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-teal-200 mb-2">
            <span>{t.payPeriod}: <strong>01 Oct — 31 Oct 2026</strong></span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
              24 Days Logged
            </span>
          </div>

          <div className="mb-4">
            <span className="text-teal-200 text-xs block mb-1">
              {t.netPay}
            </span>
            <div className="text-3xl font-extrabold tracking-tight">
              ₹{netTakeHome.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-teal-100/90">
              Gross: ₹{grossPay.toLocaleString('en-IN')} • Deductions: -₹{totalDeductions.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Download Payslip Button */}
          <button
            type="button"
            onClick={() => setShowSlipModal(true)}
            className="w-full py-2 rounded-xl bg-white text-teal-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-teal-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-teal-800" />
            <span>{t.downloadPayslip}</span>
          </button>
        </div>

        {/* PRD Mandatory Disclaimer Notice */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{t.sampleNotice}</span>
        </div>

        {/* Transparent Component Breakdown */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            Transparent Earnings Breakdown
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
              <div>
                <span className="font-semibold text-slate-800 block">{t.basicPay}</span>
                <span className="text-[10px] text-slate-500">
                  {daysWorked} days × ₹{basicDaily}/day
                </span>
              </div>
              <span className="font-bold text-slate-900">
                ₹{baseEarnings.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
              <div>
                <span className="font-semibold text-slate-800 block">{t.hazardAllowance}</span>
                <span className="text-[10px] text-slate-500">
                  Mandatory safety hazard rate (₹{payScale.hazardAllowancePerDay}/day)
                </span>
              </div>
              <span className="font-bold text-slate-900">
                ₹{hazardTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
              <div>
                <span className="font-semibold text-slate-800 block">{t.foodTravelAllowance}</span>
                <span className="text-[10px] text-slate-500">
                  Site meal & transit allowance (₹{payScale.foodTravelPerDay}/day)
                </span>
              </div>
              <span className="font-bold text-slate-900">
                ₹{foodTravelTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-200 bg-teal-50/60 px-2 rounded-lg">
              <div>
                <span className="font-bold text-teal-900 block">{t.overtimeWage}</span>
                <span className="text-[10px] text-teal-700">
                  {simulatedOtHours} hrs × ₹{hourlyRate.toFixed(1)}/hr × <strong>{otMultiplier}x multiplier</strong>
                </span>
              </div>
              <span className="font-bold text-teal-900">
                ₹{overtimeTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Statutory Deductions */}
          <div className="pt-2">
            <h4 className="font-bold text-xs text-red-900 uppercase tracking-wider mb-2">
              {t.statutoryDeductions}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t.epf}</span>
                <span className="font-medium text-slate-800">-₹{epfDeduction.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.esi}</span>
                <span className="font-medium text-slate-800">-₹{esiDeduction.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.professionalTax}</span>
                <span className="font-medium text-slate-800">-₹{profTax.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive What-If Overtime Simulator */}
        <div className="bg-white rounded-2xl p-4 border border-teal-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-teal-900">
              <Calculator className="w-4 h-4 text-teal-700" />
              <span>{t.whatIfCalculator}</span>
            </div>
            <span className="font-mono font-extrabold text-xs text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              +{simulatedOtHours} Hours OT
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            {t.extraHours} Drag to see the transparent rupee impact on your wages at the configured {otMultiplier}x overtime rate:
          </p>

          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={simulatedOtHours}
            onChange={(e) => setSimulatedOtHours(Number(e.target.value))}
            className="w-full accent-teal-700 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0 hrs (₹0)</span>
            <span>10 hrs (+₹{Math.round(10 * otHourlyRate)})</span>
            <span>20 hrs (+₹{Math.round(20 * otHourlyRate)})</span>
          </div>
        </div>
      </div>

      {/* Official Payslip View Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm tracking-tight">FairShift Decent Work Payslip</h3>
                <p className="text-[10px] text-slate-400">{activeIndustry.name}</p>
              </div>
              <button onClick={() => setShowSlipModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px]">Employee Name</span>
                  <span className="font-bold text-slate-800">{activeIndustry.worker.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Worker ID</span>
                  <span className="font-mono font-bold text-slate-800">{activeIndustry.worker.code}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Role</span>
                  <span className="font-semibold text-slate-800">{activeIndustry.worker.designation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Pay Period</span>
                  <span className="font-semibold text-slate-800">October 2026</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                    <tr>
                      <th className="p-2">Component</th>
                      <th className="p-2 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2">Basic Daily Wages (24 Days)</td>
                      <td className="p-2 text-right font-medium">₹{baseEarnings.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Site Safety Hazard Allowance</td>
                      <td className="p-2 text-right font-medium">₹{hazardTotal.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Food & Commute Allowance</td>
                      <td className="p-2 text-right font-medium">₹{foodTravelTotal.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-teal-50/50">
                      <td className="p-2 font-bold text-teal-900">Overtime Pay ({simulatedOtHours}h @ {otMultiplier}x)</td>
                      <td className="p-2 text-right font-bold text-teal-900">₹{overtimeTotal.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="p-2">Gross Earnings</td>
                      <td className="p-2 text-right">₹{grossPay.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="text-red-700">
                      <td className="p-2">EPF Contribution (12%)</td>
                      <td className="p-2 text-right">-₹{epfDeduction.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="text-red-700">
                      <td className="p-2">ESIC Insurance (0.75%)</td>
                      <td className="p-2 text-right">-₹{esiDeduction.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="text-red-700">
                      <td className="p-2">Professional Tax</td>
                      <td className="p-2 text-right">-₹{profTax.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-teal-100 font-extrabold text-teal-950 text-xs">
                      <td className="p-2.5">Net Take-Home Salary</td>
                      <td className="p-2.5 text-right">₹{netTakeHome.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 leading-tight">
                Certifying Authority: FairShift Decent Work Audit Platform. Compliant with Payment of Wages Act & Minimum Wages Schedule.
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-xs flex items-center gap-1.5 text-slate-800"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-1.5 rounded-lg bg-teal-800 text-white font-bold text-xs hover:bg-teal-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
