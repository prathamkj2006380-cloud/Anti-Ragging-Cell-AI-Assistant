import React, { useState } from 'react';
import { PhoneCall, AlertTriangle, X, ShieldAlert, Copy, Check } from 'lucide-react';

export const EmergencyBanner = ({ onEmergencyClick }) => {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const copyHelpline = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('1800-180-5522');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center space-x-2 font-medium">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-semibold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-[11px]">
              24x7 Toll-Free
            </span>
            <span className="hidden sm:inline">National Anti-Ragging Helpline:</span>
            <a
              href="tel:18001805522"
              className="font-bold underline tracking-wide text-amber-200 hover:text-white transition-colors"
            >
              1800-180-5522
            </a>
            <span className="text-white/60 hidden md:inline">|</span>
            <span className="hidden md:inline text-white/90">Email: helpline@antiragging.in</span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={copyHelpline}
              className="inline-flex items-center space-x-1 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded text-xs transition-all text-white"
              title="Copy Helpline Number"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Number</span>
                </>
              )}
            </button>

            <button
              onClick={onEmergencyClick}
              className="bg-white text-red-700 font-bold px-3 py-1 rounded text-xs hover:bg-amber-100 transition-colors shadow-sm flex items-center space-x-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Campus SOS</span>
            </button>

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="text-white/70 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
