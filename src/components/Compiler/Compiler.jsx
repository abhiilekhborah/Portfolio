import { useState, useEffect } from 'react';
import { Play, RotateCcw, Share2, ArrowLeft, Terminal as TerminalIcon, Copy, Check } from 'lucide-react';

const LANGUAGES = [
  { id: 'python', name: 'PYTHON', version: '3.10.0', template: 'print("Hello, World!")\n\n# Try writing some Python code here\nfor i in range(5):\n    print(f"Loop iteration: {i}")' },
  { id: 'javascript', name: 'JAVASCRIPT', version: '18.15.0', template: 'console.log("Hello, World!");\n\n// Try writing some JS code here\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log("Doubled numbers:", doubled);' },
  { id: 'cpp', name: 'C++', version: '10.2.0', template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    \n    // Try writing C++ code here\n    int sum = 0;\n    for(int i = 1; i <= 5; ++i) {\n        sum += i;\n    }\n    cout << "Sum from 1 to 5: " << sum << endl;\n    return 0;\n}' },
  { id: 'java', name: 'JAVA', version: '15.0.2', template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        \n        // Try writing Java code here\n        int fact = 1;\n        for(int i = 1; i <= 5; i++) {\n            fact *= i;\n        }\n        System.out.println("Factorial of 5: " + fact);\n    }\n}' }
];

export default function Compiler() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].template);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runStats, setRunStats] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Sync template when language changes
    setCode(selectedLang.template);
    setOutput('');
    setRunStats(null);
  }, [selectedLang]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and running...');
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
          files: [
            {
              content: code,
            },
          ],
        }),
      });

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
      setOutput(`Connection Error: Unable to reach code execution server.\n${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(selectedLang.template);
    setOutput('');
    setRunStats(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neo-bg flex flex-col relative z-10 p-4 md:p-6 texture-grid">
      {/* Header Panel */}
      <header className="neo-card p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { window.location.hash = ''; }}
            className="neo-btn neo-btn-outline p-2.5"
            style={{ width: '42px', height: '42px' }}
          >
            <ArrowLeft size={16} strokeWidth={3} />
          </button>
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight leading-none">NEO.COMPILER</h1>
            <span className="text-[10px] font-bold tracking-widest opacity-60 uppercase">SANDBOXED RUNTIME</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Language Dropdown */}
          <div className="relative">
            <select
              value={selectedLang.id}
              onChange={(e) => setSelectedLang(LANGUAGES.find(l => l.id === e.target.value))}
              className="bg-neo-secondary border-4 border-black font-bold text-xs uppercase px-4 py-2.5 outline-none cursor-pointer"
              style={{ boxShadow: '3px 3px 0px 0px #000' }}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>

          <button onClick={handleReset} className="neo-btn neo-btn-outline text-xs py-2 px-3 flex items-center gap-1.5">
            <RotateCcw size={12} strokeWidth={3} /> RESET
          </button>

          <button onClick={handleCopy} className="neo-btn neo-btn-outline text-xs py-2 px-3 flex items-center gap-1.5">
            {copied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} strokeWidth={3} />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
      </header>

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        {/* Code Editor Column */}
        <div className="lg:col-span-3 neo-card p-0 flex flex-col overflow-hidden min-h-[400px]">
          <div className="bg-black text-white p-3 border-b-4 border-black flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-neo-secondary">
              source_code.{selectedLang.id === 'cpp' ? 'cpp' : selectedLang.id === 'java' ? 'java' : selectedLang.id === 'javascript' ? 'js' : 'py'}
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-neo-accent" />
              <div className="w-2.5 h-2.5 rounded-full bg-neo-secondary" />
              <div className="w-2.5 h-2.5 rounded-full bg-neo-muted" />
            </div>
          </div>
          <div className="flex-1 flex font-mono text-sm relative">
            {/* Line numbers dummy column */}
            <div className="bg-neo-bg/50 border-r-2 border-black/10 select-none text-right py-4 px-3 text-black/30 font-bold leading-relaxed w-10 text-xs">
              {code.split('\n').map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
            {/* Real Textarea Editor */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-4 outline-none border-none resize-none font-mono text-sm leading-relaxed text-black font-bold placeholder:text-black/30"
              style={{ minHeight: '100%' }}
              spellCheck="false"
            />
          </div>
        </div>

        {/* Console / Output Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Action Trigger Card */}
          <div className="neo-card p-4 bg-neo-accent/10 border-4 border-black">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="w-full neo-btn neo-btn-primary py-3.5 text-base flex items-center justify-center gap-2"
            >
              <Play size={16} strokeWidth={3} fill="#000" />
              {isRunning ? 'RUNNING...' : 'RUN CODE'}
            </button>
          </div>

          {/* Console Card */}
          <div className="neo-card p-0 flex flex-col overflow-hidden bg-black text-white flex-1 min-h-[300px]">
            <div className="bg-black border-b-4 border-black p-3 flex items-center justify-between text-white/50">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} strokeWidth={3} />
                <span className="font-bold text-xs uppercase tracking-wider">TERMINAL OUTPUT</span>
              </div>
              {runStats && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-neo-secondary">
                  EXIT CODE: {runStats.code}
                </span>
              )}
            </div>

            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto leading-relaxed text-neo-secondary whitespace-pre-wrap">
              {output || 'Click "RUN CODE" above to compile and run your program.'}
            </div>

            {runStats && (
              <div className="p-3 border-t border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-white/40 flex justify-between">
                <span>TIME: {runStats.time}</span>
                <span>STATUS: SUCCESS</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
