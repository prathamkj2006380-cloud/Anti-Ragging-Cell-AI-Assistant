import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  RotateCcw,
  Copy,
  Check,
  ArrowRight,
  FilePlus,
  PhoneCall,
  Lock,
  ExternalLink,
  WifiOff,
  KeyRound
} from 'lucide-react';
import { FREQUENT_QUESTIONS } from '../data/knowledgeBase';

export const ChatbotPage = ({ setCurrentPage }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      id: 'welcome-1',
      text: `Hello! I am the **SafeCampus Anti-Ragging AI Assistant**, powered by **Google Gemini**.\n\nI can assist you with:\n- **UGC Regulations on Curbing the Menace of Ragging (2009)** & Supreme Court directives.\n- **Understanding what acts constitute ragging** (verbal, physical, cyber, extortion, hostel intimidation).\n- **Guidance on filing 100% Anonymous complaints** without revealing your identity.\n- **Emergency helplines** and immediate safety procedures.\n\n*Supports English, Hindi, and Hinglish!*\n\n*Advisory Notice: I provide regulatory guidance and safety information. I do not make disciplinary, punitive, or legal decisions.*`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [serverStatus, setServerStatus] = useState({ checked: false, online: false, geminiConfigured: false });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Check backend server health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setServerStatus({
          checked: true,
          online: true,
          geminiConfigured: Boolean(data.geminiConfigured),
          model: data.model || 'gemini-3-flash-preview'
        });
      })
      .catch(() => {
        setServerStatus({
          checked: true,
          online: false,
          geminiConfigured: false
        });
      });
  }, []);

  // Send message to backend Gemini API
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMessage = {
      sender: 'user',
      id: `user-${Date.now()}`,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Pass recent conversation context (without any client-side PII or complaints data)
      const historyPayload = messages
        .filter(m => m.id !== 'welcome-1' && m.id !== 'welcome-reset' && !m.isError)
        .slice(-6)
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'bot',
          text: m.text
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.error || 'The AI service encountered an error.';

        if (data.code === 'API_KEY_MISSING') {
          errorMsg = `⚠️ **Gemini API Key Required**\n\nThe server cannot connect to Gemini because the API key is not configured in \`.env\`.\n\n**To enable Gemini:**\n1. Copy \`.env.example\` to \`.env\` in your project root.\n2. Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey):\n   \`GEMINI_API_KEY=your_actual_key_here\`\n3. Restart the backend server (\`npm run server\`).\n\n*If you are in immediate danger, call the National Anti-Ragging Helpline at **1800-180-5522** or Police at **112**.*`;
        } else if (data.code === 'INVALID_API_KEY') {
          errorMsg = `⚠️ **Invalid Gemini API Key**\n\nThe API key in your server \`.env\` file was not accepted by Google Gemini. Please check your key at [Google AI Studio](https://aistudio.google.com/app/apikey).`;
        } else if (data.code === 'QUOTA_EXCEEDED') {
          errorMsg = `⏳ **Quota Limit Reached**\n\nThe Gemini API rate limit or quota has been reached. Please wait a few moments and try again.`;
        }

        const botErrorMessage = {
          sender: 'bot',
          id: `bot-err-${Date.now()}`,
          text: errorMsg,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botErrorMessage]);
      } else {
        const botMessage = {
          sender: 'bot',
          id: `bot-${Date.now()}`,
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      console.error('Error contacting /api/chat:', err);
      const networkError = {
        sender: 'bot',
        id: `bot-err-${Date.now()}`,
        text: `⚠️ **AI Backend Service Offline**\n\nUnable to connect to the backend server at \`/api/chat\`.\n\n**To run the backend server:**\n\`\`\`bash\nnpm run server\n\`\`\`\n\n*For immediate emergency help, dial **1800-180-5522** or go to the **Emergency Help** page.*`,
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, networkError]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        sender: 'bot',
        id: 'welcome-reset',
        text: `Chat reset. I am ready to assist you. Ask me any question in English, Hindi, or Hinglish regarding UGC regulations, anonymous reporting, emergency contacts, or hostel safety protocols.`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title & Advisory Bar */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Google Gemini AI Advisory Agent</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Anti-Ragging AI Advisor
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Real-time conversational intelligence trained on UGC Regulations 2009, legal mandates, and reporting workflows.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={resetChat}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs font-medium flex items-center space-x-1 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Chat</span>
            </button>
            <button
              onClick={() => setCurrentPage('register')}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>File Formal Complaint</span>
            </button>
          </div>
        </div>

        {/* Backend Configuration Notice if Key is Missing */}
        {serverStatus.checked && (!serverStatus.online || !serverStatus.geminiConfigured) && (
          <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-900 flex items-start space-x-3 shadow-sm">
            <KeyRound className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-bold text-amber-950">Backend Gemini Setup Notice:</strong>{' '}
              {!serverStatus.online ? (
                <span>
                  The backend API server is currently not detected on port 5000. Start it by running <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">npm run server</code> in a new terminal.
                </span>
              ) : (
                <span>
                  The backend server is online, but <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">GEMINI_API_KEY</code> is not yet configured in your <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">.env</code> file. Add your API key to activate Gemini intelligence.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Legal & Privacy Disclaimers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl flex items-start space-x-2.5 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">No Disciplinary Rulings:</strong> This AI agent provides legal and regulatory education. It does <em>not</em> adjudicate guilt or enforce penalties. Formal inquiries are conducted solely by the Institutional Disciplinary Committee.
            </div>
          </div>

          <div className="bg-teal-50/80 border border-teal-200 p-3 rounded-xl flex items-start space-x-2.5 text-teal-900">
            <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Strict Privacy Safeguard:</strong> Never enter your personal identification (roll number, password, full name, or phone number) in this conversational chat. To file an official complaint with full confidentiality or complete anonymity, use the <span className="underline font-semibold cursor-pointer" onClick={() => setCurrentPage('register')}>Complaint Registration</span> portal.
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col h-[650px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">SafeCampus AI (Gemini)</span>
                <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                  serverStatus.online
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {serverStatus.online ? 'Backend Connected' : 'Waiting for Server'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                UGC 2009 Regulations • English, Hindi, Hinglish
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <span className="hidden sm:inline">Emergency? Dial</span>
            <a
              href="tel:18001805522"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-2.5 py-1 rounded text-xs transition-colors flex items-center space-x-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>1800-180-5522</span>
            </a>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/60">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className={`w-8 h-8 rounded-lg text-white flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                    msg.isError ? 'bg-amber-600' : 'bg-teal-600'
                  }`}>
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] group relative ${
                  isBot ? 'text-left' : 'text-left'
                }`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                      isBot
                        ? msg.isError
                          ? 'bg-amber-50/90 text-amber-950 border border-amber-300'
                          : 'bg-white text-slate-800 border border-slate-200'
                        : 'bg-teal-600 text-white rounded-br-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className={`flex items-center space-x-2 mt-1 px-1 text-[11px] text-slate-400 ${
                    isBot ? 'justify-start' : 'justify-end'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {isBot && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center space-x-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
                <span className="text-xs text-slate-500 font-medium">Gemini is analyzing your question...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="bg-white border-t border-slate-200 px-4 py-2.5 overflow-x-auto">
          <div className="flex items-center space-x-2 text-xs text-slate-500 whitespace-nowrap">
            <span className="font-semibold text-slate-400 shrink-0">Quick Topics:</span>
            {FREQUENT_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(question)}
                disabled={isTyping}
                className="px-3 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 text-slate-700 border border-slate-200 rounded-full transition-all text-xs disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
              placeholder="Ask anything in English, Hindi, or Hinglish (e.g., 'seniors mujhe hostel me pareshan kar rahe hain')..."
              className="flex-1 bg-slate-50 border border-slate-300 focus:border-teal-500 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl shadow-md transition-all font-semibold flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
            <span>Powered by Google Gemini & UGC Regulations (2009)</span>
            <button
              onClick={() => setCurrentPage('register')}
              className="text-teal-600 hover:underline font-medium flex items-center space-x-1"
            >
              <span>Need to lodge an official complaint? Click here</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
