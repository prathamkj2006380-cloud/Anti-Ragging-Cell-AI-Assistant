// Realistic sample complaints for Anti-Ragging Cell prototype evaluation
// Clearly marked as simulated prototype data for academic/demonstration purposes

export const INITIAL_COMPLAINTS = [
  {
    id: "ARC-2026-8821",
    isSample: true,
    isAnonymous: true,
    title: "Late-night hostel summons and forced physical tasks",
    category: "Hostel Intimidation",
    severity: "High",
    date: "2026-10-10",
    time: "23:45",
    location: "Hostel Block C, 3rd Floor Common Corridor",
    description: "A group of 3 senior students summoned freshers from rooms 301-308 at midnight and ordered them to stand in unusual postures for 45 minutes and perform pushups. Threatened that refusal would lead to social boycott in the department.",
    perpetrators: "3 3rd-year students (identified by room numbers 412, 415)",
    evidenceProvided: "Audio recording of verbal coercion attached (mock)",
    contact: null, // Zero PII for anonymous complaints
    status: "Under Review",
    createdAt: "2026-10-11T08:30:00Z",
    timeline: [
      {
        stage: "Complaint Registered",
        timestamp: "2026-10-11 08:30 AM",
        note: "Anonymous report received via Secure Student Portal. System generated unique cryptographic token.",
        by: "System / Student Portal"
      },
      {
        stage: "Preliminary Screening",
        timestamp: "2026-10-11 11:15 AM",
        note: "Hostel Warden & Chief Proctor notified. Initial video footage of Block C corridor requested from security room.",
        by: "Chief Proctor Office"
      },
      {
        stage: "Anti-Ragging Squad Assigned",
        timestamp: "2026-10-12 02:00 PM",
        note: "Patrol team dispatched. Surprise inspection schedule instituted for Block C. Preliminary report submitted to Committee.",
        by: "Prof. S. K. Raman (Squad Convener)"
      }
    ],
    adminRemarks: "CCTV footage confirms gathering at 23:50 on 10th Oct. Notices issued to residents of rooms 412 and 415 for inquiry appearance.",
    committeeAction: "Formal inquiry session scheduled with Warden and Disciplinary Committee."
  },
  {
    id: "ARC-2026-7419",
    isSample: true,
    isAnonymous: false,
    title: "Verbal abuse and extortion for canteen bills",
    category: "Financial Extortion",
    severity: "Medium",
    date: "2026-10-08",
    time: "14:15",
    location: "Central Student Canteen (Rear Dining Area)",
    description: "During lunch break, two senior students cornered me and demanded payment for their group meal (approx ₹650). When I explained I had limited money, they used abusive language and threatened to damage my laboratory records.",
    perpetrators: "2 senior students from Mechanical Engineering Department",
    evidenceProvided: "UPI transaction screenshot showing coerced payment to UPI ID",
    contact: {
      fullName: "Aditya Verma",
      rollNumber: "2026-CS-042",
      department: "Computer Science & Engineering (1st Year)",
      email: "aditya.cs26@campus.edu",
      phone: "+91 98112 34567",
      preferredContact: "Confidential in-person meeting with Counselor"
    },
    status: "Hearing Scheduled",
    createdAt: "2026-10-08T16:00:00Z",
    timeline: [
      {
        stage: "Complaint Registered",
        timestamp: "2026-10-08 04:00 PM",
        note: "Identified complaint filed with verified student credentials.",
        by: "Student Portal"
      },
      {
        stage: "Counselor Consultation",
        timestamp: "2026-10-09 10:30 AM",
        note: "Student met with campus counselor; emotional support provided and safety plan instituted.",
        by: "Dr. Ananya Roy (Mental Health Counselor)"
      },
      {
        stage: "Perpetrator Summoned",
        timestamp: "2026-10-10 03:30 PM",
        note: "Identified senior students summoned to Chief Proctor's office with parents notified.",
        by: "Disciplinary Committee"
      },
      {
        stage: "Disciplinary Hearing Scheduled",
        timestamp: "2026-10-13 11:00 AM",
        note: "Hearing scheduled before the 5-member Anti-Ragging Committee in Boardroom 2.",
        by: "Anti-Ragging Committee"
      }
    ],
    adminRemarks: "UPI statement reviewed. Coerced transfer confirmed. Student's identity protected under Regulation 6.4.",
    committeeAction: "Refund arranged. Senior students issued show-cause notice regarding campus suspension."
  },
  {
    id: "ARC-2026-5532",
    isSample: true,
    isAnonymous: true,
    title: "Unauthorized WhatsApp group creating defamatory memes of 1st years",
    category: "Cyberbullying",
    severity: "Medium",
    date: "2026-10-04",
    time: "19:00",
    location: "Online / Unofficial WhatsApp Group",
    description: "A private WhatsApp group titled 'Freshers Roasting 2026' was created by some 2nd-year students where morphed photos of freshers and derogatory commentary on their appearances and backgrounds are being shared without consent.",
    perpetrators: "Group Admins (Phone numbers ending in 4410 and 9923)",
    evidenceProvided: "Multiple screenshots of group chat and admin phone numbers attached",
    contact: null,
    status: "Resolved",
    createdAt: "2026-10-04T20:10:00Z",
    timeline: [
      {
        stage: "Complaint Registered",
        timestamp: "2026-10-04 08:10 PM",
        note: "Anonymous cyber-harassment report logged.",
        by: "Student Portal"
      },
      {
        stage: "Cyber Cell & Proctor Review",
        timestamp: "2026-10-05 09:30 AM",
        note: "Campus IT Security verified the phone numbers and traced owners through college database.",
        by: "IT & Security Cell"
      },
      {
        stage: "Action Initiated",
        timestamp: "2026-10-06 01:00 PM",
        note: "Group admins summoned. Group immediately deleted. Written unconditional apology and undertaking obtained.",
        by: "Proctorial Board"
      },
      {
        stage: "Resolved & Closed",
        timestamp: "2026-10-07 05:00 PM",
        note: "Offending students suspended from hostel for 1 semester; counseling mandated. Case marked resolved.",
        by: "Anti-Ragging Committee Chairman"
      }
    ],
    adminRemarks: "Complete audit of group content conducted. Disciplinary sanction recorded on academic transcripts.",
    committeeAction: "Sanctions enforced: 1 semester hostel expulsion & non-negotiable community service."
  },
  {
    id: "ARC-2026-9104",
    isSample: true,
    isAnonymous: false,
    title: "Aggressive confrontation and dress code enforcement in bus queue",
    category: "Verbal Harassment",
    severity: "Low",
    date: "2026-10-12",
    time: "17:10",
    location: "College Bus Bay 3 (Main Gate)",
    description: "While waiting for Route 12 bus, senior students made derogatory remarks about junior attire, insisting freshers must tuck shirts in and look at the ground while passing seniors.",
    perpetrators: "Group of 4 students, Electrical Engineering 2nd Year",
    evidenceProvided: "Witness statement from bus coordinator",
    contact: {
      fullName: "Rahul Mehra",
      rollNumber: "2026-EE-089",
      department: "Electrical Engineering",
      email: "rahul.ee26@campus.edu",
      phone: "+91 97234 56789",
      preferredContact: "Email notification"
    },
    status: "Submitted",
    createdAt: "2026-10-12T18:00:00Z",
    timeline: [
      {
        stage: "Complaint Registered",
        timestamp: "2026-10-12 06:00 PM",
        note: "Complaint submitted successfully. Verification token sent to student email.",
        by: "Student Portal"
      }
    ],
    adminRemarks: "Pending initial allocation. Security guard at Gate 3 requested to submit observation report.",
    committeeAction: "To be reviewed in next weekly proctor meeting (Thursday)."
  },
  {
    id: "ARC-2026-3208",
    isSample: true,
    isAnonymous: true,
    title: "Attempted physical assault outside campus library after hours",
    category: "Physical Harm / Assault",
    severity: "Critical",
    date: "2026-10-13",
    time: "21:30",
    location: "Pathway behind Central Library towards Sports Complex",
    description: "Two masked individuals confronted a junior returning from late library study, pushed him to the ground, confiscated his backpack, and warned him not to report earlier ragging incidents. Campus guard heard commotion and perpetrators fled.",
    perpetrators: "Unknown (wearing hoodies, fled towards Gate 4)",
    evidenceProvided: "Security guard log report referenced",
    contact: null,
    status: "Action Taken",
    createdAt: "2026-10-13T22:15:00Z",
    timeline: [
      {
        stage: "Emergency Report Logged",
        timestamp: "2026-10-13 10:15 PM",
        note: "Critical severity alert triggered. Proctor and Security Chief alerted via SMS dispatch.",
        by: "Emergency Dispatch Automation"
      },
      {
        stage: "Immediate Security Response",
        timestamp: "2026-10-13 10:30 PM",
        note: "Guards deployed along Library perimeter; perimeter lighting upgraded.",
        by: "Campus Security Team"
      },
      {
        stage: "Local Police Intimation",
        timestamp: "2026-10-14 09:00 AM",
        note: "Police station briefed as per UGC mandatory 24-hr reporting clause. PCR van patrolling increased around Gate 4.",
        by: "Registrar & Chief Proctor"
      }
    ],
    adminRemarks: "CCTV footage from Library exterior cameras undergoing forensic analysis. Zero tolerance protocol activated.",
    committeeAction: "Police liaison established; special security checkpoint placed outside Library until 23:00."
  }
];
