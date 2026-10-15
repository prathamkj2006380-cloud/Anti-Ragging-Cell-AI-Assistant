import React, { useState } from 'react';
import {
  FilePlus,
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Upload,
  CheckCircle,
  Copy,
  Check,
  ArrowRight,
  Info,
  Calendar,
  Clock,
  MapPin,
  Paperclip,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export const ComplaintRegistrationPage = ({ setCurrentPage, onComplaintCreated }) => {
  const { registerComplaint } = useComplaints();

  // Form State
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hostel Intimidation');
  const [severity, setSeverity] = useState('Medium');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('22:00');
  const [location, setLocation] = useState('Hostel Block C');
  const [locationDetail, setLocationDetail] = useState('');
  const [description, setDescription] = useState('');
  const [perpetrators, setPerpetrators] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  
  // Identified Contact Info (Disabled in Anonymous mode)
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState('Confidential in-person meeting with Counselor');

  // Submission & Modal State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  const categories = [
    'Hostel Intimidation',
    'Verbal Abuse & Slurs',
    'Physical Assault',
    'Cyberbullying',
    'Financial Extortion',
    'Forced Chores / Demeanor',
    'Sexual Harassment / Indecency',
    'Other / Uncategorized'
  ];

  const locations = [
    'Hostel Block A (Boys)',
    'Hostel Block B (Boys)',
    'Hostel Block C (Boys)',
    'Hostel Block D (Girls)',
    'Central Student Canteen',
    'Campus Library & Study Area',
    'Main Academic Block / Corridor',
    'Sports Complex / Playground',
    'College Bus Stop / Gate 1 & 2',
    'Online (WhatsApp, Instagram, Social Media)',
    'Off-Campus P.G. Accommodation'
  ];

  // Mock Evidence Upload
  const handleAddSampleEvidence = (filename) => {
    if (!evidenceFiles.includes(filename)) {
      setEvidenceFiles(prev => [...prev, filename]);
    }
  };

  const handleRemoveEvidence = (filename) => {
    setEvidenceFiles(prev => prev.filter(f => f !== filename));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out the incident title and description.');
      return;
    }

    setIsSubmitting(true);

    const fullLocation = locationDetail.trim() 
      ? `${location} (${locationDetail.trim()})` 
      : location;

    const evidenceSummary = evidenceFiles.length > 0
      ? evidenceFiles.join(', ')
      : 'No files attached';

    const formData = {
      isAnonymous,
      title,
      category,
      severity,
      date,
      time,
      location: fullLocation,
      description,
      perpetrators,
      evidenceProvided: evidenceSummary,
      fullName: isAnonymous ? '' : fullName,
      rollNumber: isAnonymous ? '' : rollNumber,
      department: isAnonymous ? '' : department,
      email: isAnonymous ? '' : email,
      phone: isAnonymous ? '' : phone,
      preferredContact: isAnonymous ? '' : preferredContact
    };

    // Save using context
    setTimeout(() => {
      const record = registerComplaint(formData);
      setIsSubmitting(false);
      setCreatedComplaint(record);
    }, 600);
  };

  const handleCopyId = () => {
    if (createdComplaint?.id) {
      navigator.clipboard?.writeText(createdComplaint.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
          <FilePlus className="w-3.5 h-3.5 text-teal-600" />
          <span>Confidential Incident Lodging</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Register Anti-Ragging Complaint
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Every report receives a unique tracking ID and is placed directly before the Chief Proctor & Anti-Ragging Squad.
        </p>
      </div>

      {/* Mode Selector Card: Anonymous vs Identified */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Step 1: Choose Your Anonymity & Privacy Level
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Anonymous Card */}
          <div
            onClick={() => setIsAnonymous(true)}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              isAnonymous
                ? 'border-teal-500 bg-teal-50/50 shadow-md'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-lg ${isAnonymous ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <UserX className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">100% Anonymous Mode</h4>
                  <span className="text-[11px] text-teal-700 font-semibold bg-teal-100 px-2 py-0.5 rounded">
                    Zero Identity Trace
                  </span>
                </div>
              </div>
              <input
                type="radio"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(true)}
                className="w-4 h-4 text-teal-600"
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              No name, roll number, phone, email, or IP address is saved. You will receive a unique cryptographic tracking ID to monitor committee action in complete secrecy.
            </p>
          </div>

          {/* Identified Card */}
          <div
            onClick={() => setIsAnonymous(false)}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              !isAnonymous
                ? 'border-blue-500 bg-blue-50/50 shadow-md'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-lg ${!isAnonymous ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Identified Reporting</h4>
                  <span className="text-[11px] text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded">
                    Personal Redressal
                  </span>
                </div>
              </div>
              <input
                type="radio"
                checked={!isAnonymous}
                onChange={() => setIsAnonymous(false)}
                className="w-4 h-4 text-blue-600"
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provide student credentials for direct committee follow-up, personal counseling sessions, and academic accommodations. Strictly protected under Regulation 6.4.
            </p>
          </div>
        </div>

        {/* Dynamic Privacy Banner */}
        <div className={`mt-4 p-3 rounded-xl border flex items-center space-x-3 text-xs ${
          isAnonymous
            ? 'bg-teal-900/10 border-teal-500/30 text-teal-900'
            : 'bg-blue-900/10 border-blue-500/30 text-blue-900'
        }`}>
          <Lock className="w-4 h-4 shrink-0 text-teal-600" />
          <span>
            {isAnonymous
              ? '🛡️ Anonymous Shield Active: Personal contact fields are completely disabled below. Keep your generated Tracking ID safe.'
              : '🔒 Confidential Identified Mode: Your contact details will only be accessible to the Head of Anti-Ragging Committee.'}
          </span>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Incident Details Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            Step 2: Incident Particulars
          </h3>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Incident Summary / Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Seniors forced juniors to assemble in hostel corridor after midnight"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
            />
          </div>

          {/* Category & Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Ragging Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Severity Level <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSeverity(level)}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                      severity === level
                        ? level === 'Critical'
                          ? 'bg-rose-600 text-white shadow-md'
                          : level === 'High'
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-teal-600 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date, Time, Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Date of Incident
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Approximate Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Campus Location <span className="text-rose-500">*</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
              >
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Specific Spot / Room */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Specific Room / Landmark (Optional)
            </label>
            <input
              type="text"
              value={locationDetail}
              onChange={(e) => setLocationDetail(e.target.value)}
              placeholder="e.g. 2nd Floor Staircase, Common Washroom, Near Table 14"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
            />
          </div>

          {/* Narrative Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Detailed Narrative Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe what happened in as much detail as possible: what was said, what was demanded, how many students were involved, and any immediate actions taken..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all leading-relaxed"
            ></textarea>
            <p className="text-[11px] text-slate-500 mt-1">
              Be objective and include factual details. Exact timestamps assist in reviewing security footage.
            </p>
          </div>

          {/* Known Perpetrators */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Perpetrator Details (If Known)
            </label>
            <input
              type="text"
              value={perpetrators}
              onChange={(e) => setPerpetrators(e.target.value)}
              placeholder="e.g., 3 students from 3rd year Mechanical, Room 412, or 'Unknown seniors in blue hoodies'"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
            />
          </div>

          {/* Evidence Upload Section (Mock Simulation) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Attach Supporting Evidence (Screenshots, Audio, Documents)
            </label>
            
            <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-6 text-center bg-slate-50 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">
                Prototype Evidence Simulator: Click below to attach sample evidence records
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => handleAddSampleEvidence('WhatsApp_Chat_Screenshot.png')}
                  className="px-3 py-1 bg-white hover:bg-teal-50 border border-slate-300 hover:border-teal-400 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  + Add Screenshot (Mock)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddSampleEvidence('Audio_Recording_Hostel_Corridor.mp3')}
                  className="px-3 py-1 bg-white hover:bg-teal-50 border border-slate-300 hover:border-teal-400 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  + Add Audio Clip (Mock)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddSampleEvidence('UPI_Transaction_Proof.pdf')}
                  className="px-3 py-1 bg-white hover:bg-teal-50 border border-slate-300 hover:border-teal-400 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  + Add UPI Receipt (Mock)
                </button>
              </div>
            </div>

            {/* Attached Files List */}
            {evidenceFiles.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {evidenceFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-100 rounded-lg text-xs text-slate-700">
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-3.5 h-3.5 text-teal-600" />
                      <span className="font-medium">{file}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">Attached</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEvidence(file)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Information (Only visible if NOT anonymous) */}
        {!isAnonymous ? (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-md space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900">
                Step 3: Student Identification & Contact Details
              </h3>
              <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-0.5 rounded-full">
                Protected Under Reg. 6.4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required={!isAnonymous}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aditya Verma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Student Roll / Registration Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required={!isAnonymous}
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 2026-CS-042"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Department & Academic Year
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Science, 1st Year"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Campus Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required={!isAnonymous}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aditya.cs26@campus.edu"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Emergency Mobile Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required={!isAnonymous}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Confidential Follow-up
                </label>
                <select
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="Confidential in-person meeting with Counselor">Confidential in-person meeting with Counselor</option>
                  <option value="Encrypted Email updates only">Encrypted Email updates only</option>
                  <option value="Phone call from Chief Proctor only">Phone call from Chief Proctor only</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100/70 p-5 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center space-x-3">
            <Lock className="w-5 h-5 text-teal-600 shrink-0" />
            <span>
              <strong>Identity Shield Active:</strong> Contact information fields are hidden because you chose Anonymous Mode. Your privacy is mathematically protected.
            </span>
          </div>
        )}

        {/* Submit Button & Statutory Declaration */}
        <div className="pt-2">
          <div className="mb-4 text-xs text-slate-500 flex items-start space-x-2">
            <input type="checkbox" required id="declaration" className="mt-0.5 rounded text-teal-600" />
            <label htmlFor="declaration">
              I affirm that the information provided in this report is truthful to the best of my knowledge. I understand that filing false complaints is subject to institutional review.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-600 to-slate-900 hover:from-teal-700 hover:to-slate-950 text-white font-bold shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center space-x-2 text-base disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Registering Secure Incident...</span>
            ) : (
              <>
                <FilePlus className="w-5 h-5" />
                <span>Submit Official Complaint & Generate Tracking Token</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Modal with Generated Token */}
      {createdComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-center text-slate-900">
              Complaint Registered Successfully
            </h3>
            <p className="text-xs text-center text-slate-600 mt-1">
              Your report has been logged into the secure institutional queue and forwarded to the Anti-Ragging Disciplinary Office.
            </p>

            {/* Generated ID Box */}
            <div className="bg-slate-900 text-white p-5 rounded-xl my-6 text-center border border-slate-800">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-1 font-semibold">
                Your Unique Tracking ID
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-teal-400 tracking-wider">
                {createdComplaint.id}
              </div>
              <div className="flex items-center justify-center space-x-2 mt-3">
                <button
                  onClick={handleCopyId}
                  className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Tracking Token</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Crucial Instructions */}
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 space-y-1 mb-6">
              <div className="font-bold flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Save This Tracking ID!</span>
              </div>
              <p>
                Because this report is {createdComplaint.isAnonymous ? '100% Anonymous' : 'Protected'}, this unique ID is your only key to check committee status updates, squad inspection notes, and disciplinary resolutions.
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onComplaintCreated(createdComplaint.id);
                  setCreatedComplaint(null);
                }}
                className="py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1 shadow-md"
              >
                <span>Track This Incident Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setCreatedComplaint(null);
                  setTitle('');
                  setDescription('');
                  setEvidenceFiles([]);
                }}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
