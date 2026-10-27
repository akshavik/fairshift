import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Users, 
  Banknote, 
  Droplets, 
  MapPin, 
  Crosshair, 
  Mic, 
  MicOff, 
  Camera, 
  PhoneCall, 
  CheckCircle2, 
  Copy, 
  Lock, 
  EyeOff, 
  Eye, 
  Play, 
  Square, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SafeVoiceRail() {
  const { 
    activeIndustry, 
    submitReport, 
    setTrackingModalOpen, 
    setTrackedReportPin, 
    language, 
    t 
  } = useApp();

  // Form State
  const [category, setCategory] = useState('safety');
  const [identityTier, setIdentityTier] = useState('anonymous'); // 'anonymous' | 'confidential'
  const [location, setLocation] = useState(activeIndustry.sites[0]);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [severity, setSeverity] = useState('urgent'); // 'urgent' | 'moderate'
  const [summary, setSummary] = useState('');
  
  // Voice Recording Simulator State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Photographic Evidence State
  const [selectedPhotos, setSelectedPhotos] = useState(['scaffold', 'wiring']);
  const [certified, setCertified] = useState(true);

  // Submission Modal State
  const [submittedResult, setSubmittedResult] = useState(null);
  const [copiedPin, setCopiedPin] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Category Icons & Data
  const categories = [
    {
      id: 'safety',
      title: activeIndustry.categories[0].label,
      desc: activeIndustry.categories[0].subtext,
      icon: AlertTriangle,
    },
    {
      id: 'unfair',
      title: activeIndustry.categories[1].label,
      desc: activeIndustry.categories[1].subtext,
      icon: Users,
    },
    {
      id: 'wage',
      title: activeIndustry.categories[2].label,
      desc: activeIndustry.categories[2].subtext,
      icon: Banknote,
    },
    {
      id: 'water',
      title: activeIndustry.categories[3].label,
      desc: activeIndustry.categories[3].subtext,
      icon: Droplets,
    },
  ];

  // Voice Recording Simulation Handler
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordedAudio({ duration: "0:38", url: "simulated_audio" });
      if (!summary) {
        setSummary(language === 'ta' 
          ? "மேற்கு பக்க சாரக்கட்டு நிலை 3-ல் உள்ள இணைப்பு போல்ட் உடைந்துள்ளது. தொழிலாளர்கள் கீழே விழும் அபாயம் உள்ளது." 
          : "Level 3 west catwalk clamp is fractured. Planks slipped during morning lift. Severe fall risk for ironworkers.");
      }
    } else {
      setIsRecording(true);
      setRecordedAudio(null);
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!certified) {
      alert("Please check the good faith certification box to proceed.");
      return;
    }

    const reportPayload = {
      category,
      tier: identityTier,
      location,
      severity,
      description: summary || (category === 'safety' ? "Scaffolding safety concern reported on site" : "Workplace concern logged"),
      voiceNote: recordedAudio ? { hasAudio: true, duration: recordedAudio.duration } : { hasAudio: false, duration: "0:00" },
      images: selectedPhotos.map(p => p === 'scaffold' ? '/scaffold_defect.jpg' : '/wiring_hazard.jpg'),
    };

    const result = submitReport(reportPayload);
    setSubmittedResult(result);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'pin') {
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    } else {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="pb-16 max-w-lg mx-auto bg-white min-h-screen">
      {/* Sub-header Greeting bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 text-xs">
        <span className="text-slate-600 font-medium">
          {t.greeting}, <strong className="text-slate-900">{language === 'ta' ? activeIndustry.worker.tamilName : activeIndustry.worker.name}</strong>
        </span>
        <span className="text-teal-700 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          SafeVoice
        </span>
      </div>

      <div className="p-4 space-y-5">
        {/* Top Audit Rail Card - Matches PRD & Uploaded Design */}
        <div className="bg-[#f0f9f8] border border-teal-200/80 rounded-2xl p-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-teal-800 text-[11px] font-bold tracking-wider uppercase">
              <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>{t.safeVoiceBadge}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200/80 text-slate-800 tracking-wider">
              {t.safeVoiceAct}
            </span>
          </div>

          <h2 className="text-lg font-serif font-bold text-slate-900 tracking-tight leading-tight mb-1">
            {t.safeVoiceTitle}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {t.safeVoiceSubtitle}
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-teal-200/60 text-[11px] font-semibold text-teal-900">
            <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-md border border-teal-200">
              <Lock className="w-3 h-3 text-teal-700" />
              {t.zeroContractorAccess}
            </span>
            <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-md border border-teal-200">
              <span className="text-teal-600">⏱️</span>
              {t.fourHourAudit}
            </span>
          </div>
        </div>

        {/* Section 1: What would you like to report? */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-sm font-bold text-slate-900">
              {t.step1Title}
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              {t.mandatory}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-[#132238] text-white border-[#132238] shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${
                    isSelected ? 'bg-slate-800 text-teal-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs leading-tight mb-1">
                    {cat.title}
                  </div>
                  <div className={`text-[10px] line-clamp-2 leading-tight ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {cat.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Choose your protective identity tier */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>{t.step2Title}</span>
            </h3>
            <ShieldCheck className="w-4 h-4 text-teal-700" />
          </div>

          {/* Segmented Identity Tab */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-3 border border-slate-200">
            <button
              type="button"
              onClick={() => setIdentityTier('anonymous')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                identityTier === 'anonymous'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>{t.anonymousTab}</span>
            </button>
            <button
              type="button"
              onClick={() => setIdentityTier('confidential')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                identityTier === 'confidential'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.confidentialTab}</span>
            </button>
          </div>

          {/* Protective Tier Description Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                {identityTier === 'anonymous' ? t.fullAnonShield : 'Confidential Identity Protection'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                {identityTier === 'anonymous' ? t.pinTrackable : 'Ombudsman Only'}
              </span>
            </div>

            <p className="text-slate-600 text-[11px] leading-relaxed">
              {identityTier === 'anonymous' ? t.anonExplanation : t.confidentialExplanation}
            </p>

            <div className="pt-2 border-t border-slate-200 text-[11px]">
              <div className="font-bold text-teal-900 flex items-center gap-1 mb-0.5">
                <Lock className="w-3 h-3 text-teal-700" />
                <span>{t.whatIsRecorded}</span>
              </div>
              <p className="text-slate-500 text-[10px] leading-normal">
                {t.recordedDisclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Worksite / Specific Location */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">
            {t.step3Title}
          </h3>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
              <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
              {isEditingLocation ? (
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setIsEditingLocation(false);
                  }}
                  className="w-full bg-white border border-slate-300 rounded p-1 text-xs font-semibold focus:outline-none"
                >
                  {activeIndustry.sites.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <span className="font-semibold text-slate-900 truncate">
                  {location}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsEditingLocation(!isEditingLocation)}
              className="p-1 text-slate-500 hover:text-teal-800"
              title="Change Worksite"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 pl-1">
            {t.autoDetectedGeofence}
          </p>
        </div>

        {/* Section 4: Severity & Operational Hazard */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">
            {t.step4Title}
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Urgent Hazard Card */}
            <button
              type="button"
              onClick={() => setSeverity('urgent')}
              className={`p-3 rounded-xl text-left transition-all border ${
                severity === 'urgent'
                  ? 'bg-[#fff5ed] border-amber-400 text-slate-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-amber-950">
                  {t.urgentHazard}
                </span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-[10px] text-amber-900/80 leading-snug">
                {t.urgentHazardDesc}
              </p>
            </button>

            {/* Moderate Hazard Card */}
            <button
              type="button"
              onClick={() => setSeverity('moderate')}
              className={`p-3 rounded-xl text-left transition-all border ${
                severity === 'moderate'
                  ? 'bg-slate-100 border-slate-400 text-slate-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-900">
                  {t.moderateHazard}
                </span>
                <Info className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-[10px] text-slate-600 leading-snug">
                {t.moderateHazardDesc}
              </p>
            </button>
          </div>
        </div>

        {/* Section 5: Details & Evidence */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900">
              {t.step5Title}
            </h3>
            <span className="text-[10px] font-semibold text-teal-800">
              {t.tamilOrEnglish}
            </span>
          </div>

          {/* Voice-note Recorder Button */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                isRecording 
                  ? 'bg-red-600 text-white animate-pulse scale-105' 
                  : recordedAudio 
                    ? 'bg-teal-700 text-white' 
                    : 'bg-[#005953] text-white hover:bg-teal-800'
              }`}
            >
              {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs text-slate-900">
                {isRecording ? t.recordingVoice : recordedAudio ? t.voiceRecorded : t.tapToRecord}
              </div>
              <div className="text-[10px] text-slate-500">
                {t.speakFreely}
              </div>
            </div>
            {recordedAudio && (
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="px-2 py-1 rounded bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isPlayingAudio ? "Playing..." : "Play"}</span>
              </button>
            )}
          </div>

          {/* Text Summary Area */}
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder={t.summaryPlaceholder}
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 mb-3"
          />

          {/* Photographic Evidence */}
          <div className="mb-4">
            <div className="text-[11px] font-bold text-slate-700 mb-2">
              {t.photoEvidence}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (selectedPhotos.length < 3) {
                    setSelectedPhotos([...selectedPhotos, 'hazard_extra']);
                  }
                }}
                className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-400"
              >
                <Camera className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] font-semibold">{t.addPhoto}</span>
              </button>

              {/* Scaffold Photo Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-800 shadow-xs">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=200&q=80" 
                  alt="Scaffolding Evidence"
                  className="w-full h-full object-cover opacity-85"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[8px] font-bold text-center py-0.5">
                  {t.scaffoldTag}
                </span>
              </div>

              {/* Wiring Photo Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-800 shadow-xs">
                <img 
                  src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=200&q=80" 
                  alt="Hazard Wiring"
                  className="w-full h-full object-cover opacity-85"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[8px] font-bold text-center py-0.5">
                  {t.wiringTag}
                </span>
              </div>
            </div>
          </div>

          {/* Good Faith Certification Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-[11px] cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={certified}
              onChange={(e) => setCertified(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
            />
            <span className="leading-snug">
              {t.goodFaithCert}
            </span>
          </label>

          {/* Primary Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl bg-[#005953] hover:bg-teal-900 active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span>{identityTier === 'anonymous' ? t.submitAnonymous : t.submitConfidential}</span>
          </button>

          {/* Emergency Hotline Callout */}
          <div className="mt-3 py-2 px-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-amber-900 text-xs font-semibold">
            <PhoneCall className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{t.hotline}</span>
          </div>
        </div>
      </div>

      {/* Submission Success Modal with 6-Digit PIN & Reference */}
      {submittedResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-center text-slate-900 mb-1">
              Report Submitted Successfully
            </h3>
            <p className="text-xs text-center text-slate-500 mb-4">
              Your identity is protected under statutory protocols. Save your access PIN to check live status updates.
            </p>

            {/* Reference & PIN Box */}
            <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {t.reportReference}:
                </span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-slate-800">
                  <span>{submittedResult.refCode}</span>
                  <button
                    onClick={() => copyToClipboard(submittedResult.refCode, 'ref')}
                    className="text-slate-400 hover:text-slate-700"
                    title="Copy Reference"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedRef && <span className="text-[9px] text-teal-600">Copied</span>}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-teal-900 block">
                    6-Digit Private PIN:
                  </span>
                  <span className="text-[9px] text-slate-400">Required to view confidential timeline</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-extrabold text-base text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  <span>{submittedResult.pin}</span>
                  <button
                    onClick={() => copyToClipboard(submittedResult.pin, 'pin')}
                    className="text-teal-600 hover:text-teal-900"
                    title="Copy PIN"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedPin && <span className="text-[9px] text-teal-600">Copied</span>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setTrackedReportPin(submittedResult.pin);
                  setTrackingModalOpen(true);
                  setSubmittedResult(null);
                }}
                className="w-full py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-teal-900"
              >
                <span>Track This Incident Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setSubmittedResult(null)}
                className="w-full py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
