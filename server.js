import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

// Determine directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env with absolute path and override support
const envPath = path.resolve(__dirname, '.env');
const envExamplePath = path.resolve(__dirname, '.env.example');

function loadEnvironment() {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
  } else if (fs.existsSync(envExamplePath)) {
    dotenv.config({ path: envExamplePath, override: true });
  } else {
    dotenv.config({ override: true });
  }
}
loadEnvironment();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// System Instruction for the Anti-Ragging Cell Assistant
const SYSTEM_INSTRUCTION = `You are the official Anti-Ragging Cell AI Assistant for higher education institutions in India.
Your mission is to provide accurate, reassuring, and legally grounded guidance to students, freshers, and parents regarding ragging prevention, student rights, and reporting procedures.

CORE PRINCIPLES & STATUTORY GUARDRAILS:
1. LEGAL & REGULATORY GROUNDING:
   - Ground all guidance strictly in the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions (2009) and the Hon'ble Supreme Court of India directives (Raghavan Committee).
   - What constitutes ragging: Teasing, rude behavior, physical abuse, psychological bullying, forced chores/errands, financial extortion (demanding canteen bills/party money), humiliating dress codes, forced introductions, late-night hostel summons, and cyber-ragging.
   - Legal penalties: Suspension, cancellation of admission, withholding scholarships, expulsion from hostel, rustication for 1-4 semesters, debarment from placements, institutional fine up to ₹2.5 Lakhs, and mandatory criminal First Information Report (FIR) under BNS / IPC.

2. IMMEDIATE SAFETY & HUMAN ASSISTANCE FIRST:
   - If the student indicates active physical danger, violence, being trapped or locked in a room, or severe psychological distress:
     * Put immediate survival and safety first.
     * Direct them to call the National Anti-Ragging 24x7 Toll-Free Helpline: 1800-180-5522.
     * Direct them to dial Police Emergency: 112 (or 100).
     * Urge them to immediately alert their Hostel Warden, floor proctor, or nearest security post, and move to a safe public space.

3. DO NOT INVENT SPECIFIC COLLEGE DETAILS:
   - Do NOT invent fake campus phone numbers, fake individual staff names, or non-existent specific patrol schedules.
   - Always refer students to standard institutional roles: Hostel Warden, Chief Proctor, Anti-Ragging Squad, Anti-Ragging Committee, and Head of the Institution.

4. MULTILINGUAL SUPPORT (English, Hindi, Hinglish):
   - Seamlessly detect and respond in the language or mix used by the student:
     * English queries -> Clear, empathetic, professional English.
     * Hindi (Devanagari) queries -> Respectful, supportive, and clear Hindi.
     * Hinglish queries (e.g., "seniors mujhe harass kar rahe hain kya karu", "ragging ki complaint kaise kare") -> Natural, reassuring Hinglish/Hindi with clear steps.

5. NON-ADJUDICATION DISCLAIMER:
   - You provide institutional guidance, emotional support, and regulatory clarity.
   - You do NOT make disciplinary, administrative, or judicial decisions. Real investigations are conducted solely by the institution's Anti-Ragging Committee following due process.

6. PRIVACY & ANONYMITY:
   - Remind students that they can lodge 100% Anonymous Complaints on this portal without disclosing their name, roll number, or IP address.
   - Never solicit personal identification (like roll numbers or passwords) in this chat window.
`;

// Helper: Retrieve and sanitize the Gemini API key
function getGeminiApiKey() {
  let key = process.env.GEMINI_API_KEY;
  // If not configured in process.env, reload in case .env was added/updated while running
  if (!key || key === 'your_actual_gemini_api_key_here' || key === 'your_actual_key_here') {
    loadEnvironment();
    key = process.env.GEMINI_API_KEY;
  }
  if (!key) return null;
  // Clean potential quotes or whitespace
  key = String(key).trim().replace(/^["']|["']$/g, '');
  if (!key || key === 'your_actual_gemini_api_key_here' || key === 'your_actual_key_here') {
    return null;
  }
  return key;
}

// Helper: Initialize Gemini Client safely
function getGeminiClient() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const apiKey = getGeminiApiKey();
  const isConfigured = Boolean(apiKey);
  res.json({
    status: 'online',
    service: 'Anti-Ragging Cell AI Server',
    geminiConfigured: isConfigured,
    model: process.env.GEMINI_MODEL || 'gemini-3-flash-preview'
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server.',
        code: 'API_KEY_MISSING',
        guidance: 'Please set your GEMINI_API_KEY in the server .env file.'
      });
    }

    const configuredModel = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
    // List candidate models to fallback gracefully if a model is unavailable or deprecated
    const candidateModels = [
      configuredModel,
      'gemini-3-flash-preview',
      'gemini-3.8-flash',
      'gemini-flash-latest'
    ];
    const uniqueModels = [...new Set(candidateModels.filter(Boolean))];

    // Format conversation history for multi-turn context
    // Filter history strictly to message content without any PII
    const contents = [];

    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        if (turn.role && turn.text && typeof turn.text === 'string') {
          contents.push({
            role: turn.role === 'bot' ? 'model' : 'user',
            parts: [{ text: turn.text }]
          });
        }
      }
    }

    // Append the current student message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }]
    });

    // Call Gemini API with automatic candidate model fallback
    let response = null;
    let successfulModel = configuredModel;
    let lastError = null;

    for (const modelToAttempt of uniqueModels) {
      try {
        response = await ai.models.generateContent({
          model: modelToAttempt,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4,
            maxOutputTokens: 1024,
          }
        });
        successfulModel = modelToAttempt;
        break;
      } catch (err) {
        lastError = err;
        const errMsg = err.message || '';
        // If it's an authentication error, don't retry other models
        if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('invalid api key')) {
          throw err;
        }
        console.warn(`[Gemini Model ${modelToAttempt} failed]:`, errMsg.slice(0, 100));
      }
    }

    if (!response) {
      throw lastError || new Error('No model response generated');
    }

    const replyText = response.text || 'I am here to help. Could you please rephrase your query?';

    // Return response without storing sensitive content in server logs
    return res.json({
      reply: replyText,
      model: successfulModel
    });

  } catch (error) {
    // Log minimal operational error without student message content
    console.error('[Gemini API Error]:', error.message || error);

    const errorMessage = error.message || '';
    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('invalid api key')) {
      return res.status(401).json({
        error: 'The provided Gemini API key is invalid or unauthorized.',
        code: 'INVALID_API_KEY'
      });
    }

    if (errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('quota')) {
      return res.status(429).json({
        error: 'The Gemini API quota limit was exceeded. Please try again in a few moments.',
        code: 'QUOTA_EXCEEDED'
      });
    }

    return res.status(500).json({
      error: 'Unable to communicate with the AI service at this moment.',
      code: 'GEMINI_SERVER_ERROR',
      details: errorMessage.slice(0, 200)
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`[Anti-Ragging AI Server] Running on http://localhost:${PORT}`);
  const apiKey = getGeminiApiKey();
  console.log(`[Anti-Ragging AI Server] Gemini API Status: ${apiKey ? 'Configured (Key detected)' : 'Missing API Key (Please check .env)'}`);
  console.log(`[Anti-Ragging AI Server] Primary Model: ${process.env.GEMINI_MODEL || 'gemini-3-flash-preview'}`);
});
