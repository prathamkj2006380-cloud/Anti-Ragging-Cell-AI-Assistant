# Anti-Ragging Cell Assistant | Student Safety & AI Advisory Portal

A modern, responsive, and secure web application designed for higher education institutions to combat campus ragging, promote student safety, and uphold the **UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions (2009)** alongside Hon'ble Supreme Court directives.

Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Core Features & Modules

### 1. Home Page (Student Safety & Awareness)
- **Hero Banner:** Reassuring institutional theme with zero-tolerance policy declaration.
- **Interactive Category Explorer:** Explains what constitutes ragging under Indian law:
  - *Hostel & Room Intimidation* (late-night summons, forced introductions, standing in bizarre postures)
  - *Verbal Abuse & Slurs* (humiliating titles, public ridicule, regional/caste slurs)
  - *Physical Assault & Violence* (confinement, forced labor, physical injury)
  - *Cyber-Ragging & Online Harassment* (unofficial WhatsApp groups, unauthorized memes, digital intimidation)
  - *Financial Extortion* (forced treats, canteen bill coercion, unauthorized collections)
- **4-Step Resolution Roadmap:** Clear visualization from incident lodging to committee hearing and resolution.
- **Statutory Penalties Summary:** Institutional consequences (suspension, expulsion, debarment) and mandatory police FIR provisions.

### 2. AI Chatbot (UGC Regulatory Advisor)
- **Interactive Knowledge Base:** Answers queries regarding UGC 2009 regulations, student rights, reporting steps, and anti-ragging bylaws.
- **Quick Topic Chips:** One-click prompts for common questions.
- **Empathetic & Supportive:** Provides guidance on preserving evidence and connecting with campus wellness counselors.
- **Statutory AI Disclaimer:** Clearly specifies that the AI assistant provides informational guidance and **does not make disciplinary or legal decisions**.

### 3. Complaint Registration & 4. Anonymous Mode
- **Dual Reporting Modes:**
  - **100% Anonymous Mode (Default):** Zero personal identification footprint. Omits name, roll number, email, phone, and hostel room. Generates a unique tracking token (`ARC-2026-XXXX`).
  - **Identified Reporting:** Allows students who wish to receive direct in-person assistance, counseling follow-ups, and academic accommodations to provide contact credentials under **Regulation 6.4** confidentiality protection.
- **Incident Particulars:** Date, time, campus zone/hostel block, severity indicator (Low, Medium, High, Critical), and detailed narrative description.
- **Evidence Uploader Simulation:** Mock support for attaching screenshots, audio recordings, or transaction proofs.

### 5. Complaint Tracking (Live Case Dossier)
- Search any case using its unique tracking token (e.g., `ARC-2026-8821`, `ARC-2026-1775`).
- **Audit Trail & Timeline:** Chronological log showing stages from submission to preliminary screening, squad inspection, hearing, and resolution.
- **Committee Remarks:** Real-time visibility into directives issued by the Anti-Ragging Committee.
- **Printable Acknowledgment:** One-click receipt generation for student records.

### 6. Emergency Help & SOS Dispatch
- **National Anti-Ragging 24x7 Helpline:** `1800-180-5522` (Toll-Free, Multi-lingual).
- **Official UGC Email:** `helpline@antiragging.in`.
- **Campus Hotlines:** Chief Proctor & Squad Convener (+91 98765 43210), Security Control Room (Ext 100 / 011-2659-1000), Ambulance (108), Local Police (112), and Student Wellness Counselor.
- **Quick Distress SMS / WhatsApp Generator:** Pre-formats an emergency alert message with the student's campus location for instant 1-click copying.
- **Survival Protocols & Safe Zones:** Immediate safety instructions if trapped or physically confronted.

### 7. Disciplinary Committee Admin Console
- **Executive KPI Dashboard:** Total complaints, pending initial review, active hearings, resolved cases, and anonymous breakdown percentage.
- **Category & Severity Visualizer:** Graphical distribution of reported incidents.
- **Search & Multi-Filter Table:** Filter by status, severity, and anonymity type.
- **Dossier Review & Status Transition Modal:** Disciplinary committee members can update investigation status, record official remarks, and issue action directives.
- **Export CSV:** Export case audit logs for statutory compliance records.

### 8. Panic Disguise / Quick Hide Button
- Present in the top navigation bar. If a student is browsing in a public terminal or hostel common area and needs privacy, clicking **Quick Hide** instantly disguises the interface as a neutral *"Central Academic Digital Library"* syllabus screen, with a discreet "Resume Portal" button.

---

## 💻 Tech Stack & Architecture

- **Frontend Framework:** React 19 (Functional components & hooks)
- **Build Tool:** Vite 8 (Ultra-fast HMR and optimized production bundle)
- **Styling:** Tailwind CSS v4 (Modern color palette of Navy `#0a192f`, Royal Blue `#0f3460`, and Teal `#0d9488` with responsive utilities)
- **Icons:** Lucide React
- **Client Persistence:** LocalStorage state management engine with preloaded simulated prototype datasets.

---

## 🚀 How to Run the Application Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Launch

1. Open PowerShell or your terminal in this project root:
   ```bash
   cd "Anti Ragging AI Assistant"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

5. Build for production:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

---

## 🔒 Privacy, Security & AI Governance Safeguards

1. **AI Decision-Making Constraint:** The AI Assistant functions purely in an advisory capacity. In strict compliance with regulatory ethics, the AI does *not* issue disciplinary verdicts or assign institutional punishments.
2. **Identity Compartmentalization:** Anonymous complaints strictly exclude any personal identifying information (PII) from form structures and local storage schemas.
3. **Prototype Notice:** All sample complaints are labeled as simulated demonstration data for academic and evaluation purposes.
