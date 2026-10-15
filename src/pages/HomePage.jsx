import React, { useState } from 'react';
import {
  ShieldCheck,
  Bot,
  FilePlus,
  Search,
  PhoneCall,
  Lock,
  Scale,
  Users,
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Info,
  Building,
  HelpCircle
} from 'lucide-react';

export const HomePage = ({ setCurrentPage, onSelectTrackingDemo }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const raggingCategories = [
    {
      title: "Hostel & Room Intimidation",
      icon: Building,
      summary: "Late-night summons, forced introductions, standing in bizarre postures, or locking juniors in rooms.",
      ugcClause: "UGC Reg. 3(b) - Acts causing hardship, physical or psychological harm or apprehension.",
      examples: [
        "Mandatory midnight attendance in senior hostel rooms",
        "Forcing freshers to salute seniors or address them with humiliating titles",
        "Making juniors do laundry, fetch meals, or run errands",
        "Disrupting sleep, study hours, or peace of mind"
      ],
      action: "Strict disciplinary suspension + immediate hostel eviction"
    },
    {
      title: "Verbal Abuse & Public Humiliation",
      icon: Users,
      summary: "Derogatory comments, slurs, forcing humiliating dress codes, or public ridicule.",
      ugcClause: "UGC Reg. 3(a) - Teasing, treating or handling with rudeness a fresher or junior student.",
      examples: [
        "Name-calling, casteist, regional, or gender-based slurs",
        "Forcing awkward dress codes (e.g. unbuttoned collars, looking at floor)",
        "Compelling students to perform embarrassing dances, songs, or skits",
        "Mock trials or shouting in corridors or canteens"
      ],
      action: "Withholding scholarships, campus placement debarment & suspension"
    },
    {
      title: "Physical Assault & Violence",
      icon: AlertTriangle,
      summary: "Pushing, hitting, forced physical exertion, or confinement.",
      ugcClause: "UGC Reg. 3(f) - Any act of physical abuse, injury, or threat to physical safety.",
      examples: [
        "Physical blows, slaps, or pushing",
        "Forcing strenuous exercises or unnatural physical postures for long periods",
        "Confining in restrooms or dormitories",
        "Depriving juniors of food, water, or medical access"
      ],
      action: "Immediate College Rustication + Mandatory Police FIR (BNS / IPC)"
    },
    {
      title: "Cyber-Ragging & Online Bullying",
      icon: Sparkles,
      summary: "WhatsApp roasting groups, non-consensual memes, online intimidation or doxxing.",
      ugcClause: "UGC Reg. 3(i) - Indulging in cyber-harassment, online stalking or digital humiliation.",
      examples: [
        "Unofficial WhatsApp/Telegram 'Freshers Roast' groups",
        "Sharing unapproved pictures, derogatory memes, or fake profiles",
        "Threatening voice messages or extortion via digital chats",
        "Doxxing phone numbers or hostel room locations"
      ],
      action: "IT Act Criminal Complaint + Institutional Academic Debarment"
    },
    {
      title: "Financial Extortion & Forced Spending",
      icon: Scale,
      summary: "Forcing juniors to pay canteen bills, recharge phones, or purchase items for seniors.",
      ugcClause: "UGC Reg. 3(e) - Forcing a student to bear undue financial burdens or expenses.",
      examples: [
        "Demanding money under the guise of 'freshers party contributions'",
        "Forcing juniors to pay for group meals or parties at restaurants",
        "Confiscating canteen cards or UPI transfer coercion",
        "Borrowing money or valuable items with no intent to return"
      ],
      action: "Full financial restitution + Disciplinary committee show-cause notice"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-800">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Institutional Alert Pill */}
          <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-teal-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-300 mb-6 shadow-inner backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
            <span>UGC Mandated Anti-Ragging Safe Campus Initiative</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Supreme Court Directives Enforced</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Zero Tolerance. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
                  100% Confidential.
                </span> <br />
                Your Safety Is Our Priority.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Welcome to the institutional Anti-Ragging Cell Assistant. Ask our AI agent about UGC regulations, register completely anonymous complaints without revealing your identity, and track committee actions transparently.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setCurrentPage('register')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2 text-sm sm:text-base"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>Register Complaint (Anonymous)</span>
                </button>

                <button
                  onClick={() => setCurrentPage('chatbot')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white font-semibold border border-slate-700 shadow-md transition-all flex items-center space-x-2 text-sm sm:text-base"
                >
                  <Bot className="w-5 h-5 text-teal-400" />
                  <span>Ask AI Assistant 24/7</span>
                </button>

                <button
                  onClick={() => setCurrentPage('emergency')}
                  className="px-5 py-3.5 rounded-xl bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white font-semibold border border-rose-500/30 transition-all flex items-center space-x-2 text-sm"
                >
                  <PhoneCall className="w-4 h-4 text-rose-400" />
                  <span>Emergency Helplines</span>
                </button>
              </div>

              {/* Prototype Notice */}
              <div className="pt-4 flex items-center space-x-2 text-xs text-slate-400">
                <Info className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  <strong>Prototype Evaluation Mode:</strong> Preloaded with realistic sample inquiries for college demonstration. AI assistant does not make disciplinary decisions.
                </span>
              </div>
            </div>

            {/* Right Column: Key Safeguards Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl backdrop-blur-md relative">
                
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-6 h-6 text-teal-400" />
                    <span className="font-bold text-white text-base">Campus Anti-Ragging Charter</span>
                  </div>
                  <span className="text-[11px] font-bold bg-teal-500/20 text-teal-300 px-2.5 py-1 rounded-full border border-teal-500/30">
                    Active Vigilance
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">100% Anonymous Mode</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Zero identifying metadata collected. Name, roll number, and hostel room are strictly omitted.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">24-Hour Squad Response</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Every lodged complaint triggers mandatory preliminary inquiry by Chief Proctor and Anti-Ragging Squad within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Statutory Police Reporting</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Head of Institution is legally bound under Supreme Court orders to file FIR for severe physical or psychological offenses.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Track Pill */}
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Have a tracking token?</span>
                  <button
                    onClick={() => setCurrentPage('track')}
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-1"
                  >
                    <span>Check Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">1800-180-5522</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">National Toll-Free Helpline (24x7)</div>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Confidential Anonymous Shield</div>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">&lt; 24 Hrs</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Rapid Incident Verification Target</div>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">Zero Tolerance</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">UGC Statutory Campus Mandate</div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive: What Constitutes Ragging? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Know Your Rights Under UGC Regulations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Actions Constitute Ragging?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Ragging is not merely physical assault. Any action causing shame, hardship, or fear is an offense under Indian law. Select a category below to explore details.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {raggingCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details Card */}
        {(() => {
          const current = raggingCategories[selectedCategory];
          const Icon = current.icon;
          return (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-4xl mx-auto transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-700">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
                    <p className="text-xs text-teal-700 font-medium mt-0.5">{current.ugcClause}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full font-semibold">
                    Prohibited & Punishable
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Common Violations & Indicators:
                  </h4>
                  <ul className="space-y-2">
                    {current.examples.map((ex, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Statutory Disciplinary Penalty:
                    </h4>
                    <p className="text-sm font-semibold text-slate-900">
                      {current.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      All cases are reviewed by the Anti-Ragging Committee with zero tolerance for repeat or coordinated offenses.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentPage('register')}
                      className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <FilePlus className="w-4 h-4" />
                      <span>Report This Behavior Confidentially</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg flex items-center justify-between">
                <span>Summary: {current.summary}</span>
                <button
                  onClick={() => setCurrentPage('chatbot')}
                  className="text-teal-600 font-semibold hover:underline shrink-0 ml-4"
                >
                  Ask AI About This &rarr;
                </button>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4-Step Resolution Workflow */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Transparent, Safe & Swift 4-Step Redressal
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Here is how your report is processed from initial submission to committee action without compromising your identity or safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between relative group hover:border-teal-500/50 transition-all">
              <div className="text-4xl font-extrabold text-teal-400/20 group-hover:text-teal-400/40 transition-colors mb-4">
                01
              </div>
              <div className="space-y-2 mb-4">
                <h3 className="text-base font-bold text-white">File Complaint</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Choose <strong>100% Anonymous Mode</strong> (zero PII) or Identified Mode. Provide incident details, campus spot, and optional evidence.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-teal-400 flex items-center space-x-1">
                <span>Instant Safe Token</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between relative group hover:border-teal-500/50 transition-all">
              <div className="text-4xl font-extrabold text-teal-400/20 group-hover:text-teal-400/40 transition-colors mb-4">
                02
              </div>
              <div className="space-y-2 mb-4">
                <h3 className="text-base font-bold text-white">Unique Tracking ID</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Receive a unique cryptographic token (e.g. <code className="text-teal-300">ARC-2026-XXXX</code>). Save this key to view live progress updates.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-teal-400 flex items-center space-x-1">
                <span>No Login Needed</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between relative group hover:border-teal-500/50 transition-all">
              <div className="text-4xl font-extrabold text-teal-400/20 group-hover:text-teal-400/40 transition-colors mb-4">
                03
              </div>
              <div className="space-y-2 mb-4">
                <h3 className="text-base font-bold text-white">Squad Verification</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Within 24 hours, the Anti-Ragging Squad inspects the location, reviews CCTV records, and summons witnesses for preliminary review.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-teal-400 flex items-center space-x-1">
                <span>&lt;24 Hour Response</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between relative group hover:border-teal-500/50 transition-all">
              <div className="text-4xl font-extrabold text-teal-400/20 group-hover:text-teal-400/40 transition-colors mb-4">
                04
              </div>
              <div className="space-y-2 mb-4">
                <h3 className="text-base font-bold text-white">Action & Resolution</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The Disciplinary Committee enacts statutory sanctions (suspension, hostel expulsion, or police FIR) and records resolution.
                </p>
              </div>
              <div className="pt-2 text-xs font-semibold text-teal-400 flex items-center space-x-1">
                <span>Enforced by Law</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

          {/* Quick Demo Tracker Links */}
          <div className="mt-10 p-5 bg-slate-800/50 rounded-xl border border-slate-700 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                Want to test tracking right now? Try preloaded demo IDs:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['ARC-2026-8821', 'ARC-2026-7419', 'ARC-2026-5532'].map(demoId => (
                <button
                  key={demoId}
                  onClick={() => onSelectTrackingDemo(demoId)}
                  className="px-2.5 py-1 bg-slate-700 hover:bg-teal-700 text-teal-200 hover:text-white rounded font-mono font-bold transition-colors"
                >
                  {demoId}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UGC Regulations & Legal Penalties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
              Statutory Penalties Under Indian Law
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Consequences of Ragging for Offenders
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Under UGC Regulation 9.1 and Supreme Court orders, institutions are strictly bound to enforce irreversible punitive actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Academic Expulsion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rustication from the college for 1 to 4 semesters or total expulsion. Debarred from admissions in any other university across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Criminal Police FIR</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mandatory First Information Report filed with local police under Indian Penal Code / Bharatiya Nyaya Sanhita. Criminal record impacts future visas and careers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Hostel & Placement Ban</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediate eviction from campus hostel facilities and permanent debarment from participating in campus placement drives and campus interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Do you have a question or need to report an incident?
            </h3>
            <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
              Our AI Assistant is available 24/7 to provide instant answers on regulations and help you understand the complaint procedure.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('chatbot')}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-teal-800 font-bold rounded-xl shadow-lg transition-all flex items-center space-x-2 text-sm"
            >
              <Bot className="w-5 h-5 text-teal-600" />
              <span>Talk to AI Assistant</span>
            </button>
            <button
              onClick={() => setCurrentPage('register')}
              className="px-6 py-3.5 bg-teal-900/60 hover:bg-teal-900 text-white font-bold rounded-xl border border-teal-400/40 transition-all flex items-center space-x-2 text-sm"
            >
              <FilePlus className="w-5 h-5" />
              <span>Register Complaint</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
