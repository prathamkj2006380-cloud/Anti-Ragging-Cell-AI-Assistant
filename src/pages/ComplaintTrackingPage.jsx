import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  UserX,
  UserCheck,
  Calendar,
  MapPin,
  FileText,
  Printer,
  ChevronRight,
  PhoneCall,
  Info,
  Building,
  HeartHandshake
} from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export const ComplaintTrackingPage = ({ initialSearchId = '', setCurrentPage }) => {
  const { getComplaintById, complaints } = useComplaints();
  const [searchId, setSearchId] = useState(initialSearchId);
  const [activeComplaint, setActiveComplaint] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialSearchId) {
      setSearchId(initialSearchId);
      const found = getComplaintById(initialSearchId);
      setActiveComplaint(found);
      setHasSearched(true);
    }
  }, [initialSearchId]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchId.trim()) return;

    const record = getComplaintById(searchId.trim());
    setActiveComplaint(record);
    setHasSearched(true);
  };

  const handleSelectDemo = (id) => {
    setSearchId(id);
    const found = getComplaintById(id);
    setActiveComplaint(found);
    setHasSearched(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Hearing Scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Action Taken':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Resolved':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-600 text-white';
      case 'High':
        return 'bg-amber-500 text-white';
      case 'Medium':
        return 'bg-teal-600 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const printAcknowledgment = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
          <Search className="w-3.5 h-3.5 text-teal-600" />
          <span>Real-time Inquiry Tracking</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Track Complaint Status
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Enter your unique tracking token to inspect live committee progress, squad verification notes, and resolution status.
        </p>
      </div>

      {/* Search Bar Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Complaint Token (e.g., ARC-2026-8821)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-3.5 text-sm font-mono font-semibold text-slate-900 uppercase focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Search Case</span>
          </button>
        </form>

        {/* Demo Tokens Quick Clicks */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-400">Click to test sample IDs:</span>
          {complaints.slice(0, 4).map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectDemo(c.id)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-teal-100 hover:text-teal-900 text-slate-700 rounded-lg font-mono font-bold transition-colors"
            >
              {c.id} ({c.status})
            </button>
          ))}
        </div>
      </div>

      {/* Case Found Results */}
      {activeComplaint ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Main Case Dossier Header Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900">
                    {activeComplaint.id}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(activeComplaint.status)}`}>
                    ● {activeComplaint.status}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${getSeverityBadge(activeComplaint.severity)}`}>
                    {activeComplaint.severity} Severity
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-800">
                  {activeComplaint.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={printAcknowledgment}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  title="Print official acknowledgment"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Category</div>
                <div className="font-bold text-slate-900">{activeComplaint.category}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Location</div>
                <div className="font-bold text-slate-900 truncate" title={activeComplaint.location}>
                  {activeComplaint.location}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Incident Date</div>
                <div className="font-bold text-slate-900">{activeComplaint.date} at {activeComplaint.time}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Privacy Level</div>
                <div className="font-bold">
                  {activeComplaint.isAnonymous ? (
                    <span className="text-teal-700 flex items-center space-x-1">
                      <UserX className="w-3.5 h-3.5" />
                      <span>100% Anonymous</span>
                    </span>
                  ) : (
                    <span className="text-blue-700 flex items-center space-x-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Identified & Protected</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Incident Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Incident Narrative Details:
              </div>
              <p className="text-slate-700 leading-relaxed">
                {activeComplaint.description}
              </p>
              {activeComplaint.perpetrators && (
                <div className="pt-2 text-slate-600 border-t border-slate-200">
                  <strong>Reported Perpetrators:</strong> {activeComplaint.perpetrators}
                </div>
              )}
              {activeComplaint.evidenceProvided && (
                <div className="text-slate-600">
                  <strong>Evidence on Record:</strong> {activeComplaint.evidenceProvided}
                </div>
              )}
            </div>

            {/* Committee Remarks Callout */}
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-teal-900 font-bold">
                <Building className="w-4 h-4 text-teal-600" />
                <span>Anti-Ragging Committee Official Remarks:</span>
              </div>
              <p className="text-teal-950 font-medium leading-relaxed">
                {activeComplaint.adminRemarks || 'Preliminary assessment in progress.'}
              </p>
              {activeComplaint.committeeAction && (
                <div className="text-teal-900 pt-1">
                  <strong>Current Action Directive:</strong> {activeComplaint.committeeAction}
                </div>
              )}
            </div>

          </div>

          {/* Interactive Audit Timeline */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>Inquiry Progress & Audit Trail</span>
            </h3>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {activeComplaint.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start space-x-4">
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-4 ring-white z-10 shadow-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 text-sm">{step.stage}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{step.timestamp}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed pt-1">
                      {step.note}
                    </p>
                    <div className="text-[11px] text-teal-700 font-semibold pt-1">
                      Action logged by: {step.by}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps / Counselor Assistance */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <h4 className="font-bold text-sm text-white flex items-center space-x-2">
                <HeartHandshake className="w-4 h-4 text-teal-400" />
                <span>Need Emotional Support or In-Person Safety Assistance?</span>
              </h4>
              <p className="text-xs text-slate-300">
                Our Student Wellness Counselor and Chief Proctor are available 24/7 without judgment.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('emergency')}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center space-x-1.5 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Counselor / Helpline</span>
            </button>
          </div>

        </div>
      ) : hasSearched ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-md">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Complaint Token Not Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
            We could not find an incident matching "<span className="font-mono font-bold">{searchId}</span>". Please verify the code or test one of the preloaded demo cases.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleSelectDemo('ARC-2026-8821')}
              className="px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              Load Sample Case (ARC-2026-8821)
            </button>
            <button
              onClick={() => setCurrentPage('register')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Register New Complaint
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl p-12 text-center border border-dashed border-slate-300 text-slate-500 text-xs">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="font-medium text-slate-700">Enter your Complaint ID above to view live progress.</p>
          <p className="mt-1 text-slate-400">All student complaint data is strictly compartmentalized.</p>
        </div>
      )}

    </div>
  );
};
