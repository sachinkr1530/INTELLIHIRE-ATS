import { useState } from "react";

/* ── Types ───────────────────────────────────────────────────────────────── */
interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

type Screen  = "input" | "quiz" | "result";
type Answers = Record<number, number>;

/* ── ENV ─────────────────────────────────────────────────────────────────── */

// import.meta.env may not be typed in some TS setups — cast to any to avoid TS errors here
const OPENROUTER_KEY: string | undefined = (import.meta as any)?.env?.VITE_OPENROUTER_API_KEY;
/* ── API ─────────────────────────────────────────────────────────────────── */
async function generateMCQs(topic: string, count: number): Promise<Question[]> {
  if (!OPENROUTER_KEY) throw new Error("Missing VITE_OPENROUTER_API_KEY in your .env file.");

  const prompt = `Generate exactly ${count} multiple choice questions about: "${topic}".
Return ONLY a valid JSON array — no markdown, no code blocks, no extra text.
[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation (1-2 sentences)."
  }
]
Rules: correctIndex is 0-based. Exactly 4 options per question. Vary difficulty.`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Question Practice",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      temperature: 0.7,
      messages: [
        { role: "system", content: "You are a quiz generator. Always respond with valid JSON only. No markdown." },
        { role: "user",   content: prompt },
      ],
    }),
  });

  if (!res.ok) { const e = await res.json(); throw new Error(e?.error?.message || "OpenRouter API error"); }
  const data = await res.json();
  const raw: string = data.choices?.[0]?.message?.content ?? "";
  const qs: Question[] = JSON.parse(raw.replace(/```json|```/g, "").trim());
  if (!Array.isArray(qs)) throw new Error("Invalid response format");
  return qs;
}

/* ── Constants ───────────────────────────────────────────────────────────── */
const LABELS = ["A", "B", "C", "D"] as const;
const SUGGESTED = [
  "Data Science", "React", "JavaScript", "NextJS",
  "C++", "Java", "Machine Learning", "NodeJS",
];

/* ══════════════════════════════════════════════════════════════════════════
   SCREEN 1 — Topic Input
══════════════════════════════════════════════════════════════════════════ */
interface TopicInputProps {
  onStart: (questions: Question[], topic: string) => void;
}

function TopicInput({ onStart }: TopicInputProps) {
  const [topic,   setTopic]   = useState<string>("");
  const [count,   setCount]   = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error,   setError]   = useState<string>("");

  const go = async (): Promise<void> => {
    if (!topic.trim()) return setError("Please enter a topic.");
    setError(""); setLoading(true);
    try {
      const qs = await generateMCQs(topic.trim(), count);
      onStart(qs, topic.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate questions.");
    } finally { setLoading(false); }
  };

  return (
    <div style={S.page}>
      <div style={{...S.orb, top:"-15%",    left:"-8%",  background:"radial-gradient(circle,#6c47ff22,transparent 70%)", width:600, height:600}} />
      <div style={{...S.orb, bottom:"-15%", right:"-8%", background:"radial-gradient(circle,#ff478522,transparent 70%)", width:500, height:500}} />

      <div style={S.center}>
        {/* Header */}
        <div style={{textAlign:"center", marginBottom:48}}>
          <div style={S.badge}>
            <span style={{width:6, height:6, borderRadius:"50%", background:"#ff6b35", display:"inline-block", marginRight:8}} />
            OpenRouter · Free AI
          </div>
          <h1 style={S.logo}>Question<span style={S.logoAccent}> Practice</span></h1>
          <p style={S.sub}>Type any topic. Get a sharp, intelligent quiz in seconds.</p>
        </div>

        <div style={S.card}>
          {/* Topic */}
          <label style={S.label}>Topic</label>
          <input
            type="text" value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === "Enter" && go()}
            placeholder="e.g. Java, React Hooks, C++..."
            style={S.input}
          />

          {/* Suggestions */}
          <p style={{...S.label, marginTop:20, marginBottom:10}}>Quick Suggestions</p>
          <div style={{display:"flex", flexWrap:"wrap", gap:8, marginBottom:28}}>
            {SUGGESTED.map(s => (
              <button key={s} onClick={() => setTopic(s)} style={topic === s ? S.chipActive : S.chip}>{s}</button>
            ))}
          </div>

          {/* Count slider */}
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
            <label style={S.label}>Number of Questions</label>
            <span style={{color:"#6c47ff", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:24}}>{count}</span>
          </div>
          <input type="range" min={5} max={20} step={5} value={count}
            onChange={e => setCount(Number(e.target.value))} style={S.range} />
          <div style={{display:"flex", justifyContent:"space-between", color:"rgba(255,255,255,0.2)", fontSize:11, marginTop:6, marginBottom:28}}>
            {[5, 10, 15, 20].map(n => <span key={n}>{n}</span>)}
          </div>

          {error && <div style={S.errorBox}>{error}</div>}

          <button onClick={go} disabled={loading}
            style={loading ? {...S.btn, opacity:0.6, cursor:"not-allowed"} : S.btn}>
            {loading
              ? <span style={{display:"flex", alignItems:"center", gap:10, justifyContent:"center"}}><Spinner /> Generating {count} Questions…</span>
              : "Generate Quiz →"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCREEN 2 — Quiz
══════════════════════════════════════════════════════════════════════════ */
interface QuizScreenProps {
  questions: Question[];
  topic: string;
  onSubmit: (answers: Answers) => void;
  onBack: () => void;
}

function QuizScreen({ questions, topic, onSubmit, onBack }: QuizScreenProps) {
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [confirm, setConfirm] = useState<boolean>(false);

  const q        = questions[current];
  const answered = Object.keys(answers).length;
  const pct      = (answered / questions.length) * 100;

  const submit = (): void => {
    if (answered < questions.length) setConfirm(true);
    else onSubmit(answers);
  };

  return (
    <div style={S.page}>
      <div style={{...S.orb, top:"-15%", left:"-8%", background:"radial-gradient(circle,#6c47ff22,transparent 70%)", width:500, height:500}} />
      <div style={{...S.center, maxWidth:680}}>

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28}}>
          <button onClick={onBack} style={S.ghost}>← Back</button>
          <div style={{textAlign:"center"}}>
            <div style={{color:"rgba(255,255,255,0.25)", fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase"}}>Quiz</div>
            <div style={{color:"#fff", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:14}}>{topic}</div>
          </div>
          <div style={{color:"rgba(255,255,255,0.3)", fontSize:12}}>{answered}/{questions.length} answered</div>
        </div>

        <div style={{height:3, background:"rgba(255,255,255,0.06)", borderRadius:99, marginBottom:28, overflow:"hidden"}}>
          <div style={{height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#6c47ff,#ff4785)", borderRadius:99, transition:"width 0.4s ease"}} />
        </div>

        <div style={{display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:28}}>
          {questions.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={
              i === current ? {...S.pill, background:"#6c47ff", color:"#fff", boxShadow:"0 0 12px #6c47ff88"}
              : answers[i] !== undefined ? {...S.pill, background:"rgba(108,71,255,0.15)", color:"#a78bfa", border:"1px solid rgba(108,71,255,0.3)"}
              : S.pill
            }>{i + 1}</button>
          ))}
        </div>

        <div style={{...S.card, marginBottom:16}}>
          <div style={{display:"flex", gap:16, alignItems:"flex-start"}}>
            <div style={S.qNum}>{current + 1}</div>
            <p style={{color:"#fff", fontSize:17, lineHeight:1.7, margin:0, fontWeight:500}}>{q.question}</p>
          </div>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom:28}}>
          {q.options.map((opt, i) => {
            const sel = answers[current] === i;
            return (
              <button key={i} onClick={() => setAnswers(p => ({...p, [current]: i}))}
                style={sel ? {...S.option, ...S.optionSel} : S.option}>
                <span style={sel ? {...S.optLetter, background:"#6c47ff", color:"#fff"} : S.optLetter}>{LABELS[i]}</span>
                <span style={{fontSize:14, color: sel ? "#fff" : "rgba(255,255,255,0.6)"}}>{opt}</span>
                {sel && <span style={{marginLeft:"auto", color:"#6c47ff", fontSize:16}}>✓</span>}
              </button>
            );
          })}
        </div>

        <div style={{display:"flex", justifyContent:"space-between"}}>
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
            style={current === 0 ? {...S.navBtn, opacity:0.3, cursor:"not-allowed"} : S.navBtn}>← Prev</button>
          {current < questions.length - 1
            ? <button onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))} style={S.navBtn}>Next →</button>
            : <button onClick={submit} style={S.btn}>Submit Quiz ✓</button>
          }
        </div>
      </div>

      {confirm && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <h3 style={{color:"#fff", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:22, margin:"0 0 8px"}}>Submit anyway?</h3>
            <p style={{color:"rgba(255,255,255,0.4)", fontSize:14, margin:"0 0 28px"}}>
              {questions.length - answered} unanswered question{questions.length - answered !== 1 ? "s" : ""} will be marked incorrect.
            </p>
            <div style={{display:"flex", gap:12}}>
              <button onClick={() => setConfirm(false)} style={{...S.navBtn, flex:1, justifyContent:"center"}}>Go Back</button>
              <button onClick={() => { setConfirm(false); onSubmit(answers); }} style={{...S.btn, flex:1}}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SCREEN 3 — Results
══════════════════════════════════════════════════════════════════════════ */
interface ResultScreenProps {
  questions: Question[];
  answers: Answers;
  topic: string;
  onRestart: () => void;
  onRetake: () => void;
}

function ResultScreen({ questions, answers, topic, onRestart, onRetake }: ResultScreenProps) {
  const [open, setOpen] = useState<number | null>(null);

  const score   = questions.reduce((a, q, i) => a + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const pct     = Math.round((score / questions.length) * 100);
  const skipped = questions.length - Object.keys(answers).length;
  const wrong   = questions.length - score - skipped;

  const grade =
    pct >= 90 ? { label: "Excellent!",      color: "#22c55e", emoji: "🏆" }
  : pct >= 70 ? { label: "Good Job!",       color: "#6c47ff", emoji: "🎯" }
  : pct >= 50 ? { label: "Not Bad",         color: "#f59e0b", emoji: "📚" }
  :             { label: "Keep Practicing", color: "#ff4785", emoji: "💪" };

  const r = 42, circ = 2 * Math.PI * r;

  return (
    <div style={S.page}>
      <div style={{...S.orb, top:"-15%",    left:"-8%",  background:"radial-gradient(circle,#6c47ff22,transparent 70%)", width:500, height:500}} />
      <div style={{...S.orb, bottom:"-15%", right:"-8%", background:"radial-gradient(circle,#ff478518,transparent 70%)", width:400, height:400}} />
      <div style={{...S.center, maxWidth:680}}>

        <div style={{...S.card, textAlign:"center", marginBottom:16, position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(108,71,255,0.05),rgba(255,71,133,0.05))"}} />
          <div style={{position:"relative"}}>
            <div style={{fontSize:48, marginBottom:8}}>{grade.emoji}</div>
            <h2 style={{color:"#fff", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:36, margin:"0 0 4px"}}>{grade.label}</h2>
            <p style={{color:"rgba(255,255,255,0.3)", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:32}}>{topic}</p>

            <div style={{position:"relative", width:140, height:140, margin:"0 auto 24px"}}>
              <svg width="140" height="140" viewBox="0 0 100 100" style={{transform:"rotate(-90deg)"}}>
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle cx="50" cy="50" r={r} fill="none" stroke={grade.color} strokeWidth="8"
                  strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
                  style={{ filter: `drop-shadow(0 0 8px ${grade.color})`, transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <span style={{color:"#fff", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:28}}>{pct}%</span>
                <span style={{color:"rgba(255,255,255,0.35)", fontSize:12}}>{score}/{questions.length}</span>
              </div>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, maxWidth:320, margin:"0 auto"}}>
              {([["Correct", score, "#22c55e"], ["Wrong", wrong, "#ff4785"], ["Skipped", skipped, "#f59e0b"]] as [string, number, string][]).map(([lbl, val, col]) => (
                <div key={lbl} style={{background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"12px 0"}}>
                  <div style={{color:col, fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:22}}>{val}</div>
                  <div style={{color:"rgba(255,255,255,0.3)", fontSize:11}}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"flex", gap:12, marginBottom:36}}>
          <button onClick={onRetake}  style={{...S.navBtn, flex:1, justifyContent:"center", padding:"14px"}}>Retake Quiz</button>
          <button onClick={onRestart} style={{...S.btn, flex:1}}>New Topic →</button>
        </div>

        <p style={{color:"rgba(255,255,255,0.25)", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16}}>Review All Questions</p>
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {questions.map((q, i) => {
            const ua = answers[i], correct = ua === q.correctIndex, skip = ua === undefined, isOpen = open === i;
            const borderC = correct ? "rgba(34,197,94,0.25)" : skip ? "rgba(245,158,11,0.25)" : "rgba(255,71,133,0.25)";
            const bg      = correct ? "rgba(34,197,94,0.05)" : skip ? "rgba(245,158,11,0.05)" : "rgba(255,71,133,0.05)";
            const iconCol = correct ? "#22c55e" : skip ? "#f59e0b" : "#ff4785";
            const icon    = correct ? "✓" : skip ? "–" : "✗";
            return (
              <div key={i} style={{border:`1px solid ${borderC}`, background:bg, borderRadius:14, overflow:"hidden"}}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  style={{width:"100%", display:"flex", alignItems:"flex-start", gap:14, padding:18, background:"none", border:"none", cursor:"pointer", textAlign:"left"}}>
                  <span style={{flexShrink:0, width:24, height:24, borderRadius:"50%", background:`${iconCol}22`, color:iconCol, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, marginTop:2}}>{icon}</span>
                  <div style={{flex:1}}>
                    <p style={{color:"rgba(255,255,255,0.8)", fontSize:14, lineHeight:1.6, margin:0}}>{q.question}</p>
                    {!correct && !skip && (
                      <p style={{color:"rgba(255,255,255,0.3)", fontSize:12, margin:"4px 0 0"}}>
                        Your answer: <span style={{color:"rgba(255,71,133,0.7)"}}>{LABELS[ua]}. {q.options[ua]}</span>
                      </p>
                    )}
                  </div>
                  <span style={{color:"rgba(255,255,255,0.2)", fontSize:12, marginTop:4, flexShrink:0, display:"inline-block", transform:isOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s"}}>▼</span>
                </button>
                {isOpen && (
                  <div style={{padding:"0 18px 18px", borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                    <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:16, marginBottom:12}}>
                      {q.options.map((opt, j) => (
                        <div key={j} style={{
                          display:"flex", gap:12, alignItems:"center", padding:"10px 14px", borderRadius:10, fontSize:13,
                          background: j === q.correctIndex ? "rgba(34,197,94,0.1)" : j === ua && !correct ? "rgba(255,71,133,0.1)" : "transparent",
                          border:     j === q.correctIndex ? "1px solid rgba(34,197,94,0.25)" : j === ua && !correct ? "1px solid rgba(255,71,133,0.2)" : "1px solid transparent",
                          color:      j === q.correctIndex ? "#22c55e" : j === ua && !correct ? "#ff4785" : "rgba(255,255,255,0.3)",
                        }}>
                          <span style={{fontWeight:900, fontSize:11}}>{LABELS[j]}</span>
                          <span>{opt}</span>
                          {j === q.correctIndex && <span style={{marginLeft:"auto", fontSize:11}}>✓ Correct</span>}
                        </div>
                      ))}
                    </div>
                    {q.explanation && (
                      <div style={{background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"10px 14px", color:"rgba(255,255,255,0.4)", fontSize:12, lineHeight:1.6}}>
                        <span style={{color:"rgba(255,255,255,0.6)", fontWeight:600}}>Explanation: </span>{q.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{height:48}} />
      </div>
    </div>
  );
}

/* ── Spinner ─────────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{animation:"spin 0.8s linear infinite"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
      <path fill="rgba(255,255,255,0.8)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────── */
const S: Record<string, React.CSSProperties> = {
  page:    { minHeight:"100vh", background:"#09090f", backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize:"56px 56px", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#fff", position:"relative", overflowX:"hidden" },
  orb:     { position:"fixed", borderRadius:"50%", pointerEvents:"none", filter:"blur(80px)" },
  center:  { maxWidth:560, margin:"0 auto", padding:"60px 20px 80px", position:"relative", zIndex:1 },
  badge:   { display:"inline-flex", alignItems:"center", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:99, padding:"5px 14px", fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:20 },
  logo:    { fontFamily:"'Syne','Segoe UI',sans-serif", fontWeight:900, fontSize:"clamp(48px,8vw,72px)", margin:"0 0 12px", lineHeight:1, color:"#fff" },
  logoAccent: { background:"linear-gradient(90deg,#6c47ff,#ff4785)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  sub:     { color:"rgba(255,255,255,0.35)", fontSize:16, fontWeight:300, margin:0 },
  card:    { background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:32, backdropFilter:"blur(12px)" },
  label:   { display:"block", fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:8 },
  input:   { width:"100%", boxSizing:"border-box", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:12, padding:"13px 16px", color:"#fff", fontSize:14, outline:"none", fontFamily:"inherit", marginBottom:4 },
  chip:       { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:8, padding:"6px 12px", color:"rgba(255,255,255,0.4)", fontSize:12, cursor:"pointer", fontFamily:"inherit" },
  chipActive: { background:"rgba(108,71,255,0.15)", border:"1px solid rgba(108,71,255,0.4)", borderRadius:8, padding:"6px 12px", color:"#a78bfa", fontSize:12, cursor:"pointer", fontFamily:"inherit" },
  range:    { width:"100%", accentColor:"#6c47ff", cursor:"pointer", display:"block" },
  errorBox: { background:"rgba(255,71,133,0.08)", border:"1px solid rgba(255,71,133,0.25)", borderRadius:12, padding:"12px 16px", color:"#ff4785", fontSize:13, marginBottom:16 },
  btn:      { width:"100%", background:"linear-gradient(90deg,#6c47ff,#8b5cf6)", border:"none", borderRadius:14, padding:"15px 24px", color:"#fff", fontFamily:"'Syne','Segoe UI',sans-serif", fontWeight:900, fontSize:16, cursor:"pointer", boxShadow:"0 0 30px rgba(108,71,255,0.35)", display:"block" },
  ghost:    { background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:13, fontFamily:"inherit" },
  pill:     { width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", color:"rgba(255,255,255,0.3)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" },
  qNum:     { flexShrink:0, width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#6c47ff,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:14, color:"#fff", boxShadow:"0 0 16px rgba(108,71,255,0.4)" },
  option:    { display:"flex", alignItems:"center", gap:14, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"14px 18px", cursor:"pointer", fontFamily:"inherit", width:"100%", textAlign:"left" },
  optionSel: { background:"rgba(108,71,255,0.12)", border:"1px solid rgba(108,71,255,0.5)", boxShadow:"0 0 16px rgba(108,71,255,0.12)" },
  optLetter: { flexShrink:0, width:30, height:30, borderRadius:8, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900 },
  navBtn:   { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"11px 20px", color:"rgba(255,255,255,0.5)", fontSize:13, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 },
  overlay:  { position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:20 },
  modal:    { background:"#111118", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:36, maxWidth:380, width:"100%", boxShadow:"0 25px 60px rgba(0,0,0,0.6)" },
};

/* ══════════════════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [screen,    setScreen]    = useState<Screen>("input");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers,   setAnswers]   = useState<Answers>({});
  const [topic,     setTopic]     = useState<string>("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#09090f; }
        input:focus { border-color:rgba(108,71,255,0.5) !important; background:rgba(255,255,255,0.06) !important; }
        input[type=range] { -webkit-appearance:none; height:4px; background:rgba(255,255,255,0.08); border-radius:99px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#6c47ff; cursor:pointer; box-shadow:0 0 10px rgba(108,71,255,0.6); }
      `}</style>

      {screen === "input" && (
        <TopicInput onStart={(qs, t) => { setQuestions(qs); setTopic(t); setAnswers({}); setScreen("quiz"); }} />
      )}
      {screen === "quiz" && (
        <QuizScreen questions={questions} topic={topic}
          onSubmit={a => { setAnswers(a); setScreen("result"); }}
          onBack={() => setScreen("input")}
        />
      )}
      {screen === "result" && (
        <ResultScreen questions={questions} answers={answers} topic={topic}
          onRestart={() => { setScreen("input"); setQuestions([]); setAnswers({}); setTopic(""); }}
          onRetake={() => { setAnswers({}); setScreen("quiz"); }}
        />
      )}
    </>
  );
}