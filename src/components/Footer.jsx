import React from 'react';
import {
  ShieldCheck,
  PhoneCall,
  Mail,
  ExternalLink,
  ShieldAlert,
  Lock,
  Scale,
  HeartHandshake,
  AlertCircle
} from 'lucide-react';

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm mt-auto">
      {/* Top Advisory Banner */}
      <div className="bg-slate-900 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <Scale className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              <strong>Zero-Tolerance Statutory Policy:</strong> Compliant with UGC Regulations (2009) & Supreme Court Directives (Raghavan Committee recommendations).
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>End-to-End Anonymity Protected</span>
            </span>
            <span className="flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Mandatory 24h Squad Action</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-base">Anti-Ragging Cell</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              SafeCampus AI Redressal Portal empowering students with instant regulatory guidance, confidential anonymous reporting, and transparent case tracking.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300 text-xs font-semibold">
                <span>College AI Agent Project</span>
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Portal Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Home & Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('chatbot')}
                  className="hover:text-teal-400 transition-colors flex items-center space-x-1.5"
                >
                  <span>AI Regulatory Chatbot</span>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1 rounded">24/7</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Register Complaint (Anonymous / Identified)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('track')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Track Unique Complaint ID
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Disciplinary Committee Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* National Helplines */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Emergency & Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start space-x-2">
                <PhoneCall className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-bold">1800-180-5522</div>
                  <div className="text-slate-500">National Anti-Ragging (Toll Free, 24x7)</div>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-300">helpline@antiragging.in</div>
                  <div className="text-slate-500">Official UGC Helpline Email</div>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <HeartHandshake className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-300">counselor@campus.edu</div>
                  <div className="text-slate-500">Student Mental Health Counselor</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal Framework Summary */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              UGC Punitive Actions
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>Mandated actions under UGC Clause 9.1 for proven offenders:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                <li>Cancellation of Admission</li>
                <li>Suspension from Classes & Hostel</li>
                <li>Rustication from 1 to 4 Semesters</li>
                <li>Expulsion & Police FIR (IPC/BNS)</li>
                <li>Debarment from Placements</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Critical Disclaimers */}
        <div className="border-t border-slate-800/80 pt-6 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">Mandatory AI Decision-Making Disclaimer:</strong> The Anti-Ragging Cell AI Assistant is an informational assistant designed to educate students on UGC guidelines and reporting procedures. It <em>does not</em> make disciplinary determinations, adjudications, or punitive rulings. Formal investigations and decisions are conducted exclusively by the College Anti-Ragging Committee in compliance with Indian law.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-xs pt-3">
            <div>
              © 2026 SafeCampus Anti-Ragging Cell Assistant. College AI Agent Project.
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-400">Demo Prototype Mode</span>
              <span>•</span>
              <span className="text-slate-400">UGC Reg. 2009 Compliant Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
