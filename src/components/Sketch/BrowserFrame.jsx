
export default function BrowserFrame({
  children,
  title = "notebook://abhilekh.borah/overview",
  label = "ME",
  className = "",
  actions = true
}) {
  return (
    <div className={`relative browser-window ${className}`}>
      {/* Floating sketched label pill */}
      {label && (
        <div className="absolute -top-3.5 left-8 z-20 px-3 py-0.5 bg-[#141312] text-[#f6f5f1] text-[11px] font-mono font-bold tracking-widest uppercase rounded-full shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          {label}
        </div>
      )}

      {/* Browser chrome header */}
      <div className="browser-header select-none">
        <div className="flex items-center gap-2">
          {actions && (
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full border border-ink/70 bg-transparent inline-block" />
              <span className="w-2.5 h-2.5 rounded-full border border-ink/70 bg-transparent inline-block" />
              <span className="w-2.5 h-2.5 rounded-full border border-ink/70 bg-transparent inline-block" />
            </div>
          )}
          <span className="text-[11px] font-mono text-graphite tracking-tight truncate max-w-[200px] sm:max-w-md">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-graphite">
          <span className="cursor-default hover:text-ink font-bold">−</span>
          <span className="cursor-default hover:text-ink">□</span>
          <span className="cursor-default hover:text-ink font-bold">✕</span>
        </div>
      </div>

      {/* Browser canvas content */}
      <div className="p-6 sm:p-8 bg-[#fdfcf9]">
        {children}
      </div>
    </div>
  );
}
