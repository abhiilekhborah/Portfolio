import { useState } from 'react';
import { Play, RotateCcw, ArrowLeft, Copy, Check, Terminal as TerminalIcon } from 'lucide-react';

const LANGUAGES = [
  { id: 'python', name: 'PYTHON', version: '3.10.0', template: 'print("Hello from Abhilekh\'s Technical Notebook!")\n\n# Try writing some Python code here\nfor i in range(5):\n    print(f"Loop iteration: {i}")' },
  { id: 'javascript', name: 'JAVASCRIPT', version: '18.15.0', template: 'console.log("Hello from Abhilekh\'s Technical Notebook!");\n\n// Try writing some JS code here\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log("Doubled numbers:", doubled);' },
  { id: 'cpp', name: 'C++', version: '10.2.0', template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from Abhilekh\'s Technical Notebook!" << endl;\n    \n    // Try writing C++ code here\n    int sum = 0;\n    for(int i = 1; i <= 5; ++i) {\n        sum += i;\n    }\n    cout << "Sum from 1 to 5: " << sum << endl;\n    return 0;\n}' },
  { id: 'java', name: 'JAVA', version: '15.0.2', template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Abhilekh\'s Technical Notebook!");\n        \n        // Try writing Java code here\n        int fact = 1;\n        for(int i = 1; i <= 5; i++) {\n            fact *= i;\n        }\n        System.out.println("Factorial of 5: " + fact);\n    }\n}' }
];

export default function Compiler() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].template);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runStats, setRunStats] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing on sandbox server...');
    setRunStats(null);

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLang.id,
          version: selectedLang.version,
          files: [{ content: code }],
        }),
      });

      if (response.status === 401) throw new Error('The Piston execution service requires authorization. The public endpoint is currently unavailable.');
      if (!response.ok) throw new Error(`Execution service returned HTTP ${response.status}`);
      const data = await response.json();

      if (data.run) {
        const stdout = data.run.stdout || '';
        const stderr = data.run.stderr || '';
        setOutput(stdout + stderr || 'Program finished with no output.');
        setRunStats({
          code: data.run.code,
          signal: data.run.signal,
          time: new Date().toLocaleTimeString(),
        });
      } else {
        setOutput('Error executing code. Please try again.');
      }
    } catch (error) {
      setOutput(`Code execution unavailable.\n${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(selectedLang.template);
    setOutput('');
    setRunStats(null);
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setOutput('Copy is unavailable. Select the source text and copy it manually.'); }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f1] flex flex-col relative z-10 p-4 md:p-8 technical-grid-bg">
      {/* Header Panel */}
      <header className="paper-card p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-ink/40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { window.location.hash = ''; }}
            className="sketch-btn p-2 text-ink hover:bg-paper-dark cursor-pointer"
            aria-label="Back to Portfolio"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink leading-none">
              CODE RUNNER.
            </h1>
            <span className="font-mono text-[11px] font-semibold tracking-wider text-graphite uppercase">
              SANDBOXED CODE RUNNER
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Language Selector */}
          <select
            value={selectedLang.id}
            onChange={(e) => {
              const language = LANGUAGES.find(l => l.id === e.target.value);
              setSelectedLang(language); setCode(language.template); setOutput(''); setRunStats(null);
            }}
            aria-label="Programming language" disabled={isRunning}
            className="bg-paper-card border-1.5 border-ink font-mono font-bold text-xs uppercase px-3 py-2 focus-visible:outline-2 cursor-pointer rounded-sm shadow-[2px_2px_0px_#141312]"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>

          <button onClick={handleReset} disabled={isRunning} className="sketch-btn text-xs py-1.5 px-3">
            <RotateCcw size={13} /> RESET
          </button>

          <button onClick={handleCopy} className="sketch-btn text-xs py-1.5 px-3">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
      </header>

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        {/* Code Editor Column */}
        <div className="lg:col-span-3 paper-card p-0 flex flex-col overflow-hidden min-h-[420px] border border-ink/40">
          <div className="bg-[#edeae2] p-3 border-b-2 border-ink flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-ink tracking-wider">
              SOURCE_BUFFER.{selectedLang.id === 'cpp' ? 'cpp' : selectedLang.id === 'java' ? 'java' : selectedLang.id === 'javascript' ? 'js' : 'py'}
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-ink" />
              <span className="w-2.5 h-2.5 rounded-full border border-ink" />
              <span className="w-2.5 h-2.5 rounded-full border border-ink" />
            </div>
          </div>

          <div className="flex-1 flex font-mono text-sm relative bg-[#fdfcf9]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-transparent text-ink focus-visible:outline-2 resize-none leading-relaxed"
              spellCheck="false"
              aria-label="Code Editor"
            />
          </div>

          <div className="p-3 bg-[#edeae2] border-t-2 border-ink flex items-center justify-between">
            <span className="font-mono text-xs text-graphite">
              LANG: {selectedLang.name} {selectedLang.version}
            </span>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="sketch-btn sketch-btn-solid text-xs py-1.5 px-4 font-bold flex items-center gap-1.5"
            >
              <Play size={13} />
              {isRunning ? 'EXECUTING...' : 'RUN SCRIPT'}
            </button>
          </div>
        </div>

        {/* Output Console Column */}
        <div className="lg:col-span-2 paper-card p-0 flex flex-col overflow-hidden min-h-[420px] border border-ink/40">
          <div className="bg-[#141312] text-[#f6f5f1] p-3 border-b-2 border-ink flex items-center justify-between font-mono text-xs">
            <span className="font-bold tracking-wider flex items-center gap-1.5">
              <TerminalIcon size={14} /> TERMINAL_STDOUT
            </span>
            {runStats && (
              <span className="text-[10px] text-graphite-light">
                EXIT {runStats.code} • {runStats.time}
              </span>
            )}
          </div>

          <div aria-live="polite" role="status" className="flex-1 p-4 bg-[#141312] text-[#f6f5f1] font-mono text-xs overflow-auto leading-relaxed select-text whitespace-pre-wrap">
            {output || (
              <span className="text-gray-500 font-mono italic">
                Press "RUN SCRIPT" to compile and execute output here...
              </span>
            )}
          </div>

          <div className="p-3 bg-[#1e1c1b] border-t border-gray-800 text-[11px] font-mono text-gray-400 flex items-center justify-between">
            <span>PISTON RUNTIME ENGINE</span>
            <span>STATUS: {isRunning ? 'BUSY' : 'READY'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
