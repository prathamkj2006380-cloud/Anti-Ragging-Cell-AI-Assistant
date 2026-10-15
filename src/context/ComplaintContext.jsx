import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COMPLAINTS } from '../data/initialComplaints';

const ComplaintContext = createContext(null);
const STORAGE_KEY = 'safe_campus_complaints_v1';

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved complaints from localStorage', e);
    }
    return INITIAL_COMPLAINTS;
  });

  // Keep localStorage synced
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.error('Failed to save complaints to localStorage', e);
    }
  }, [complaints]);

  // Register a new complaint
  const registerComplaint = (formData) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `ARC-2026-${randomDigits}`;
    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newRecord = {
      id: newId,
      isSample: false, // User generated in prototype session
      isAnonymous: Boolean(formData.isAnonymous),
      title: formData.title.trim(),
      category: formData.category,
      severity: formData.severity || 'Medium',
      date: formData.date || now.toISOString().split('T')[0],
      time: formData.time || '12:00',
      location: formData.location.trim(),
      description: formData.description.trim(),
      perpetrators: formData.perpetrators?.trim() || 'Not specified',
      evidenceProvided: formData.evidenceProvided?.trim() || 'No files attached',
      contact: formData.isAnonymous ? null : {
        fullName: formData.fullName?.trim() || 'Student',
        rollNumber: formData.rollNumber?.trim() || 'N/A',
        department: formData.department?.trim() || 'General',
        email: formData.email?.trim() || '',
        phone: formData.phone?.trim() || '',
        preferredContact: formData.preferredContact || 'Confidential portal'
      },
      status: 'Submitted',
      createdAt: now.toISOString(),
      timeline: [
        {
          stage: 'Complaint Registered',
          timestamp: formattedTimestamp,
          note: formData.isAnonymous
            ? 'Anonymous report received. Zero personal identifying metadata recorded. Cryptographic tracking token generated.'
            : 'Identified complaint registered with student verification details.',
          by: 'Student Portal'
        }
      ],
      adminRemarks: 'Pending initial screening by the Chief Proctor office.',
      committeeAction: 'Assigned to Anti-Ragging Preliminary Assessment queue.'
    };

    setComplaints(prev => [newRecord, ...prev]);
    return newRecord;
  };

  // Update status and remarks by administrator
  const updateComplaintStatus = (id, newStatus, newRemarks = '', newAction = '') => {
    const now = new Date();
    const formattedTimestamp = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setComplaints(prev => prev.map(comp => {
      if (comp.id !== id) return comp;

      const updatedTimeline = [
        ...comp.timeline,
        {
          stage: `Status updated to ${newStatus}`,
          timestamp: formattedTimestamp,
          note: newRemarks || `Status transitioned to ${newStatus} by Committee Administration.`,
          by: 'Anti-Ragging Committee Admin'
        }
      ];

      return {
        ...comp,
        status: newStatus,
        adminRemarks: newRemarks || comp.adminRemarks,
        committeeAction: newAction || comp.committeeAction,
        timeline: updatedTimeline
      };
    }));
  };

  // Find complaint by tracking ID
  const getComplaintById = (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    return complaints.find(c => c.id.toUpperCase() === cleanId) || null;
  };

  // Reset to original demo dataset
  const resetDemoData = () => {
    setComplaints(INITIAL_COMPLAINTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
  };

  // Precomputed stats
  const stats = {
    total: complaints.length,
    submitted: complaints.filter(c => c.status === 'Submitted').length,
    underReview: complaints.filter(c => c.status === 'Under Review' || c.status === 'Hearing Scheduled').length,
    actionTaken: complaints.filter(c => c.status === 'Action Taken').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    anonymousCount: complaints.filter(c => c.isAnonymous).length,
    identifiedCount: complaints.filter(c => !c.isAnonymous).length,
    criticalCount: complaints.filter(c => c.severity === 'Critical').length,
    highCount: complaints.filter(c => c.severity === 'High').length,
    categories: complaints.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {})
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      registerComplaint,
      updateComplaintStatus,
      getComplaintById,
      resetDemoData,
      stats
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
