import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  UserX,
  UserCheck,
  RotateCcw,
  Eye,
  Edit3,
  X,
  Building,
  Scale,
  Calendar,
  MapPin,
  FileSpreadsheet,
  Info
} from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export const AdminDashboardPage = ({ onInspectComplaint }) => {
  const {
    complaints,
    stats,
    updateComplaintStatus,
    resetDemoData
  } = useComplaints();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [privacyFilter, setPrivacyFilter] = useState('All');

  // Modal Review & Management State
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newRemarks, setNewRemarks] = useState('');
  const [newAction, setNewAction] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter complaints
  const filteredComplaints = complaints.filter(c => {
    // Search match
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

    // Severity filter
    const matchesSeverity = severityFilter === 'All' || c.severity === severityFilter;

    // Privacy filter
    const matchesPrivacy =
      privacyFilter === 'All' ||
      (privacyFilter === 'Anonymous' && c.isAnonymous) ||
      (privacyFilter === 'Identified' && !c.isAnonymous);

    return matchesSearch && matchesStatus && matchesSeverity && matchesPrivacy;
  });

  const handleOpenReview = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setNewRemarks(complaint.adminRemarks || '');
    setNewAction(complaint.committeeAction || '');
    setSaveSuccess(false);
  };

  const handleSaveStatusUpdate = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaintStatus(
      selectedComplaint.id,
      newStatus,
      newRemarks,
      newAction
    );

    setSaveSuccess(true);
    setTimeout(() => {
      // Refresh selected complaint view
      const updated = complaints.find(c => c.id === selectedComplaint.id);
      if (updated) {
        setSelectedComplaint({
          ...updated,
          status: newStatus,
          adminRemarks: newRemarks,
          committeeAction: newAction
        });
      }
      setSaveSuccess(false);
    }, 800);
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Title,Category,Severity,Status,Date,Privacy"]
        .concat(
          complaints.map(
            c => `"${c.id}","${c.title}","${c.category}","${c.severity}","${c.status}","${c.date}","${c.isAnonymous ? 'Anonymous' : 'Identified'}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Anti_Ragging_Complaints_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-teal-600" />
            <span>Anti-Ragging Committee Admin Console</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Disciplinary Committee Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Administrative oversight, incident investigation queue, and statutory status management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={resetDemoData}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5"
            title="Reset to baseline simulated records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV Audit</span>
          </button>
        </div>
      </div>

      {/* Prototype Notice Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start space-x-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>College AI Agent Prototype Notice:</strong> Complaints displayed below are realistic simulated demo cases and local browser test submissions for project demonstration. Real student records must not be stored on unencrypted external systems.
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Cases</div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Logged in portal</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">New Submitted</div>
          <div className="text-3xl font-extrabold text-blue-700">{stats.submitted}</div>
          <div className="text-[11px] text-blue-600 mt-1 font-medium">Pending squad visit</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Inquiry / Hearing</div>
          <div className="text-3xl font-extrabold text-amber-600">{stats.underReview}</div>
          <div className="text-[11px] text-amber-600 mt-1 font-medium">Active investigations</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Action / Resolved</div>
          <div className="text-3xl font-extrabold text-emerald-600">{stats.actionTaken + stats.resolved}</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">Closed with orders</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-sm">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Anonymous Mode</div>
          <div className="text-3xl font-extrabold text-teal-700">{stats.anonymousCount}</div>
          <div className="text-[11px] text-teal-600 mt-1 font-medium">
            {stats.total > 0 ? Math.round((stats.anonymousCount / stats.total) * 100) : 0}% of all reports
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm">
          <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">High / Critical</div>
          <div className="text-3xl font-extrabold text-rose-600">{stats.criticalCount + stats.highCount}</div>
          <div className="text-[11px] text-rose-600 mt-1 font-medium">Priority intervention</div>
        </div>

      </div>

      {/* Category Visualizer */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Incident Distribution by Category
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {Object.entries(stats.categories).map(([catName, count], idx) => {
            const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
            return (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between font-semibold text-slate-800 mb-1">
                  <span className="truncate pr-2">{catName}</span>
                  <span className="font-mono text-teal-700 font-bold">{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, keyword, location..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Hearing Scheduled">Hearing Scheduled</option>
              <option value="Action Taken">Action Taken</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Privacy Filter */}
            <select
              value={privacyFilter}
              onChange={(e) => setPrivacyFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Privacy Types</option>
              <option value="Anonymous">Anonymous Only</option>
              <option value="Identified">Identified Only</option>
            </select>

            {(searchTerm || statusFilter !== 'All' || severityFilter !== 'All' || privacyFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setSeverityFilter('All');
                  setPrivacyFilter('All');
                }}
                className="text-xs text-rose-600 hover:underline font-semibold px-2 py-1"
              >
                Clear Filters
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Complaints Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <th className="py-4 px-4">Token ID</th>
                <th className="py-4 px-4">Incident Summary</th>
                <th className="py-4 px-4">Category & Location</th>
                <th className="py-4 px-4">Severity</th>
                <th className="py-4 px-4">Anonymity</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {complaint.id}
                      {complaint.isSample && (
                        <span className="block text-[9px] font-sans font-semibold text-slate-400">
                          Demo Record
                        </span>
                      )}
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 line-clamp-1">{complaint.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{complaint.description}</div>
                    </td>

                    {/* Category & Location */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{complaint.category}</div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[150px]">{complaint.location}</span>
                      </div>
                    </td>

                    {/* Severity */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${getSeverityBadge(complaint.severity)}`}>
                        {complaint.severity}
                      </span>
                    </td>

                    {/* Anonymity */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {complaint.isAnonymous ? (
                        <span className="inline-flex items-center space-x-1 text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <UserX className="w-3 h-3" />
                          <span>Anonymous</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <UserCheck className="w-3 h-3" />
                          <span>Identified</span>
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => handleOpenReview(complaint)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center space-x-1"
                        title="Manage case & update status"
                      >
                        <Edit3 className="w-3 h-3 text-teal-400" />
                        <span>Manage</span>
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    No complaints found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Status Management Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-slate-900 text-teal-400 rounded-xl">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-extrabold text-lg text-slate-900">
                      {selectedComplaint.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getSeverityBadge(selectedComplaint.severity)}`}>
                      {selectedComplaint.severity}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-700">
                    {selectedComplaint.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Body */}
            <div className="space-y-6 my-6 text-xs text-slate-700">
              
              {/* Incident Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Category</span>
                  <span className="font-bold text-slate-900">{selectedComplaint.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Location</span>
                  <span className="font-bold text-slate-900">{selectedComplaint.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Incident Date</span>
                  <span className="font-bold text-slate-900">{selectedComplaint.date} at {selectedComplaint.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Anonymity</span>
                  <span className="font-bold text-teal-700">
                    {selectedComplaint.isAnonymous ? '100% Anonymous' : 'Identified'}
                  </span>
                </div>
              </div>

              {/* Narrative Description */}
              <div className="space-y-1">
                <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                  Incident Narrative:
                </span>
                <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                  {selectedComplaint.description}
                </p>
              </div>

              {/* Perpetrators & Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-[10px] uppercase">Perpetrator Details</span>
                  <p className="text-slate-700">{selectedComplaint.perpetrators || 'Not specified'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-[10px] uppercase">Evidence Logged</span>
                  <p className="text-slate-700">{selectedComplaint.evidenceProvided || 'None attached'}</p>
                </div>
              </div>

              {/* Student Identity Section */}
              {selectedComplaint.isAnonymous ? (
                <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 flex items-center space-x-2">
                  <UserX className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    <strong>100% Anonymous Shield Active:</strong> No student name, roll number, or IP was stored for this complaint. Inquiries proceed via physical location inspection and CCTV review.
                  </span>
                </div>
              ) : selectedComplaint.contact ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 space-y-2">
                  <div className="font-bold flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>Confidential Student Information (Regulation 6.4):</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                    <div><strong>Name:</strong> {selectedComplaint.contact.fullName}</div>
                    <div><strong>Roll No:</strong> {selectedComplaint.contact.rollNumber}</div>
                    <div><strong>Dept:</strong> {selectedComplaint.contact.department}</div>
                    <div><strong>Email:</strong> {selectedComplaint.contact.email}</div>
                    <div><strong>Phone:</strong> {selectedComplaint.contact.phone}</div>
                    <div><strong>Preference:</strong> {selectedComplaint.contact.preferredContact}</div>
                  </div>
                </div>
              ) : null}

              {/* Committee Action & Status Update Form */}
              <form onSubmit={handleSaveStatusUpdate} className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <Building className="w-4 h-4 text-teal-600" />
                  <span>Update Disciplinary Inquiry Status</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                      New Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Hearing Scheduled">Hearing Scheduled</option>
                      <option value="Action Taken">Action Taken</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                      Action Directive / Penalty
                    </label>
                    <input
                      type="text"
                      value={newAction}
                      onChange={(e) => setNewAction(e.target.value)}
                      placeholder="e.g., Show-cause notice issued; 1-semester hostel suspension ordered."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                    Official Committee Remarks (Visible to Student in Tracking Portal)
                  </label>
                  <textarea
                    rows={3}
                    value={newRemarks}
                    onChange={(e) => setNewRemarks(e.target.value)}
                    placeholder="Enter official inquiry notes, committee findings, or next steps..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-400">
                    Changes are saved to local storage audit trail immediately.
                  </div>

                  <div className="flex items-center space-x-2">
                    {saveSuccess && (
                      <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Saved Successfully!</span>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedComplaint(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Close
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                    >
                      Save Updates
                    </button>
                  </div>
                </div>

              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
