import React, { useState } from 'react';
import {
  ShieldCheck,
  Bot,
  FilePlus,
  Search,
  PhoneCall,
  LayoutDashboard,
  Menu,
  X,
  EyeOff,
  Shield,
  HelpCircle,
  AlertOctagon
} from 'lucide-react';

export const Navbar = ({ currentPage, setCurrentPage, onQuickHide }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: ShieldCheck },
    { id: 'chatbot', label: 'AI Assistant', icon: Bot, highlight: true },
    { id: 'register', label: 'Register Complaint', icon: FilePlus },
    { id: 'track', label: 'Track Status', icon: Search },
    { id: 'emergency', label: 'Emergency Help', icon: PhoneCall, urgent: true },
    { id: 'admin', label: 'Admin Portal', icon: LayoutDashboard }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-500 via-teal-600 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  Anti-Ragging Cell
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 px-1.5 py-0.5 rounded">
                  AI Assistant
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Institutional Safety & Confidential Redressal Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              if (item.urgent) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'bg-rose-500/15 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/30'
                    }`}
                  >
                    <Icon className="w-4 h-4 animate-pulse" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                      : item.highlight
                      ? 'text-teal-300 hover:bg-slate-800 hover:text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Safe Exit / Quick Hide & Mobile Toggle */}
          <div className="flex items-center space-x-2">
            {/* Quick Hide Button for Privacy in Public/Hostel */}
            <button
              onClick={onQuickHide}
              title="Disguise screen immediately if someone approaches"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs font-medium transition-all duration-150"
            >
              <EyeOff className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Hide</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="p-2 mb-2 bg-slate-800/60 rounded-lg flex items-center justify-between text-xs text-slate-400">
            <span>Confidential Student Session</span>
            <button
              onClick={onQuickHide}
              className="inline-flex items-center space-x-1 text-amber-400 font-semibold"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Panic Disguise</span>
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? item.urgent
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-teal-600 text-white font-semibold'
                    : item.urgent
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-bold">
                    AI
                  </span>
                )}
                {item.urgent && (
                  <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                    SOS 24x7
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
