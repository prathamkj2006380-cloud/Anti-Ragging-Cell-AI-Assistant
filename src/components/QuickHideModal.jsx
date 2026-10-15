import React, { useState } from 'react';
import { EyeOff, BookOpen, ExternalLink, ArrowRight, Shield } from 'lucide-react';

export const QuickHideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Fake Academic Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-teal-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Central Academic Digital Library</h1>
              <p className="text-xs text-slate-400">Higher Education Research & Course Syllabus Repository</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-lg shadow transition-all flex items-center space-x-2"
          >
            <span>Resume Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Fake Academic Search */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8 shadow-inner">
          <label className="block text-sm font-medium text-slate-300 mb-2">Search Course Modules, Lecture Notes, & Research Journals</label>
          <div className="flex gap-3">
            <input
              type="text"
              readOnly
              value="Engineering Mathematics III - Differential Equations & Fourier Analysis"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 text-sm focus:outline-none"
            />
            <button className="px-5 py-3 bg-slate-700 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-600">
              Search
            </button>
          </div>
        </div>

        {/* Fake Academic Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/80 p-5 rounded-lg border border-slate-700">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">Module 1.4</div>
            <h3 className="font-semibold text-white mb-2">Linear Algebra & Orthogonal Projections</h3>
            <p className="text-xs text-slate-400 line-clamp-3">Vector spaces, eigenspaces, singular value decomposition, and iterative numerical solvers for complex matrix approximations.</p>
          </div>
          <div className="bg-slate-800/80 p-5 rounded-lg border border-slate-700">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">Module 2.1</div>
            <h3 className="font-semibold text-white mb-2">Thermodynamics & Heat Transfer Rates</h3>
            <p className="text-xs text-slate-400 line-clamp-3">Steady state conduction, boundary layer equations, convective boundary coefficients, and Carnot cycle efficiencies.</p>
          </div>
          <div className="bg-slate-800/80 p-5 rounded-lg border border-slate-700">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">Module 3.2</div>
            <h3 className="font-semibold text-white mb-2">Data Structures & Graph Traversal</h3>
            <p className="text-xs text-slate-400 line-clamp-3">Asymptotic analysis, balanced AVL trees, Dijkstra shortest paths, and dynamic programming optimization paradigms.</p>
          </div>
        </div>

        {/* Security Note */}
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-slate-500" />
            <span>Safe Exit Mode active. Your anti-ragging complaint draft and session remain saved locally.</span>
          </div>
          <button
            onClick={onClose}
            className="text-teal-400 hover:underline font-medium text-xs ml-4"
          >
            Click here to safely return to Anti-Ragging Cell
          </button>
        </div>
      </div>
    </div>
  );
};
