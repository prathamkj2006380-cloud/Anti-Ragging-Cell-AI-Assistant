import React, { useState } from 'react';
import {
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  Copy,
  Check,
  Send,
  Building,
  HeartHandshake,
  Ambulance,
  Lock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Clock
} from 'lucide-react';

export const EmergencyHelpPage = ({ setCurrentPage }) => {
  const [copiedItem, setCopiedItem] = useState(null);
  const [studentLocation, setStudentLocation] = useState('Hostel Block C, 2nd Floor Corridor');
  const [copiedDistress, setCopiedDistress] = useState(false);

  const emergencyContacts = [
    {
      role: "National Anti-Ragging Helpline",
      number: "1800-180-5522",
      badge: "24x7 Toll Free",
      description: "Direct UGC Government Helpline. Anonymous reporting accepted in 12 regional languages.",
      urgent: true
    },
    {
      role: "Chief Proctor & Squad Convener",
      number: "+91 98765 43210",
      badge: "Campus Squad Head",
      description: "Dispatches the on-duty anti-ragging flying squad to any campus or hostel location within minutes.",
      urgent: true
    },
    {
      role: "Campus Security Control Room",
      number: "011-2659-1000",
      badge: "Ext 100 (24x7)",
      description: "Monitors campus CCTV cameras and coordinates gate checkpoints and patrol guards.",
      urgent: false
    },
    {
      role: "National Emergency Response (Police)",
      number: "112",
      badge: "All-India Police",
      description: "Statutory emergency police response. Directly intimates local police station and PCR vans.",
      urgent: true
    },
    {
      role: "Campus Ambulance & Medical Cell",
      number: "108 / Ext 102",
      badge: "24x7 Medical Center",
      description: "Immediate paramedic dispatch, trauma care, and institutional health dispensary.",
      urgent: false
    },
    {
      role: "Student Wellness & Counseling Cell",
      number: "counselor@campus.edu",
      badge: "Confidential Support",
      description: "Psychological counseling, trauma support, and non-judgmental guidance.",
      urgent: false
    }
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const distressMessage = `URGENT DISTRESS ALERT: I am experiencing an anti-ragging emergency at [${studentLocation}]. Group intimidation in progress. Please alert the Anti-Ragging Squad (+91 98765 43210) and Hostel Warden immediately!`;

  const copyDistressMessage = () => {
    navigator.clipboard?.writeText(distressMessage);
    setCopiedDistress(true);
    setTimeout(() => setCopiedDistress(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span>Immediate Safety & Emergency Dispatch</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Emergency Assistance & Helplines
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          If you are facing active harassment, immediate physical threat, or psychological distress, use these authorized emergency contacts.
        </p>
      </div>

      {/* Hero Red Banner: 1800-180-5522 */}
      <div className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
              Government of India • UGC 24x7 Helpline
            </span>
            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-amber-200">
              1800-180-5522
            </div>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
              Toll-Free National Anti-Ragging Helpline. Operators speak multiple Indian languages. Calls can be made anonymously from any mobile or landline without charges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:18001805522"
              className="px-6 py-4 bg-white text-red-700 hover:bg-amber-100 font-extrabold rounded-2xl shadow-xl transition-all text-sm flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-5 h-5 text-red-600" />
              <span>Call Helpline Directly</span>
            </a>
            <button
              onClick={() => handleCopy('main-helpline', '1800-180-5522')}
              className="px-4 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-2xl border border-white/30 transition-all text-xs flex items-center justify-center space-x-1.5"
            >
              {copiedItem === 'main-helpline' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Number Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Number</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Directory of Emergency Numbers */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <Building className="w-5 h-5 text-teal-600" />
          <span>Campus & National Hotlines</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                contact.urgent
                  ? 'bg-rose-50/50 border-rose-200 shadow-sm'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    contact.urgent
                      ? 'bg-rose-200 text-rose-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {contact.badge}
                  </span>
                  <button
                    onClick={() => handleCopy(`contact-${idx}`, contact.number)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                    title="Copy number"
                  >
                    {copiedItem === `contact-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-1">{contact.role}</h3>
                <div className="font-mono text-base font-extrabold text-teal-700 mb-2">
                  {contact.number}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {contact.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`tel:${contact.number.replace(/\D/g, '')}`}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Dial Contact</span>
                </a>
                <span className="text-[10px] text-slate-400">Available 24x7</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Distress SMS Generator */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Quick Distress SMS / WhatsApp Generator
            </h3>
            <p className="text-xs text-slate-500">
              Generate a pre-filled emergency SOS alert with your location to copy-paste into SMS or WhatsApp instantly.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Current Location on Campus:
            </label>
            <input
              type="text"
              value={studentLocation}
              onChange={(e) => setStudentLocation(e.target.value)}
              placeholder="e.g. Hostel Block C, 2nd Floor Corridor or Behind Central Library"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
            />
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-xs font-mono leading-relaxed relative">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans mb-1 font-bold">
              Pre-Formatted SOS Dispatch Message:
            </div>
            {distressMessage}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyDistressMessage}
              className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center space-x-2"
            >
              {copiedDistress ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Message Copied! Ready to Paste</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy SOS Dispatch Text</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(distressMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Share via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Immediate Safety & Survival Protocols */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>Immediate Survival & Protection Protocols</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
              <span>If You Are In Immediate Physical Danger:</span>
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-600 leading-relaxed">
              <li>Do not isolate yourself. Move toward high-traffic public areas immediately.</li>
              <li>Attract attention loudly. Call out to security guards, wardens, or faculty members nearby.</li>
              <li>Lock your dormitory or room door and do not open for unauthorized visitors after 10 PM.</li>
              <li>Dial <strong>112</strong> (Police) or <strong>1800-180-5522</strong> immediately.</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2 text-teal-600">
              <ShieldCheck className="w-4 h-4" />
              <span>Campus Designated Safe Zones (24x7 Lit & Guarded):</span>
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-600 leading-relaxed">
              <li><strong>Central Library:</strong> Open 24x7 with security personnel and biometric card access.</li>
              <li><strong>Main Gate 1 & 2 Guard Post:</strong> Staffed round-the-clock by armed campus security.</li>
              <li><strong>Chief Proctor Office:</strong> Admin Block Ground Floor.</li>
              <li><strong>Hostel Warden Residences:</strong> Located at the entrance of each residential block.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Need to document an incident without contacting emergency phones right now?</span>
          <button
            onClick={() => setCurrentPage('register')}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors shrink-0"
          >
            File Anonymous Complaint
          </button>
        </div>
      </div>

    </div>
  );
};
