import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Award, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Phone, 
  Share2 
} from 'lucide-react';

export default function SkillPassport() {
  const { activeIndustry, language, t } = useApp();
  const worker = activeIndustry.worker;

  return (
    <div className="pb-16 max-w-lg mx-auto bg-white min-h-screen">
      {/* Subheader */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 text-xs">
        <span className="text-slate-600 font-medium">
          {t.greeting}, <strong className="text-slate-900">{language === 'ta' ? worker.tamilName : worker.name}</strong>
        </span>
        <span className="text-teal-700 font-semibold flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          {t.skillPassport}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Worker ID Card Badge */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden border border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60 block mb-1">
                {activeIndustry.subName}
              </span>
              <h2 className="text-xl font-extrabold tracking-tight">
                {language === 'ta' ? worker.tamilName : worker.name}
              </h2>
              <span className="text-xs text-slate-300 font-medium">
                {language === 'ta' ? worker.tamilDesignation : worker.designation}
              </span>
            </div>

            <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-700/80">
            <div>
              <span className="text-slate-400 block text-[10px]">Worker ID</span>
              <span className="font-mono font-bold text-teal-300">{worker.code}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Division</span>
              <span className="font-semibold text-slate-200 truncate block">{worker.department}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Site Location</span>
              <span className="font-semibold text-slate-200 truncate block">{worker.site.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Member Since</span>
              <span className="font-semibold text-slate-200">{worker.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Verified Statutory Certifications */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>{t.verifiedBadges}</span>
            </h3>
            <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[10px]">
              Verifiable
            </span>
          </div>

          <div className="space-y-2.5">
            {worker.skills.map((skill, index) => (
              <div 
                key={index} 
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{skill.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Authority: <strong className="text-slate-700">{skill.issuer}</strong>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Verified: {skill.date}
                  </div>
                </div>
                <span className="text-[9px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full shrink-0">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Portable Safety Passport Note */}
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-blue-950">
            <Award className="w-4 h-4 text-blue-700" />
            <span>Decent Work Portable Skill Passport</span>
          </div>
          <p className="text-[11px] text-blue-900/80 leading-relaxed">
            Your attendance hours and safety accreditations are verified independently under the Decent Work Standard. This passport remains yours even if you transition contractors or sites.
          </p>
        </div>
      </div>
    </div>
  );
}
