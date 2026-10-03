
export default function Polaroid({
  sketch,
  index,
  onClick,
  className = ""
}) {
  const rotation = sketch.rotation || (index % 2 === 0 ? -1.5 : 1.8);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative group cursor-pointer polaroid-frame select-none transition-all duration-300 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      data-cursor="OPEN"
      aria-label={`Open sketch: ${sketch.title}`}
    >
      {/* Hand-drawn masking tape strip on top */}
      <div className="tape-strip" />

      {/* Sketch number label in corner */}
      <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 bg-paper-card border border-ink/40 text-[10px] font-mono font-bold text-graphite rounded-sm">
        #{sketch.id}
      </div>

      {/* Artwork container */}
      <div className="relative overflow-hidden bg-[#ebe8df] border border-ink/40 aspect-[3/4] sm:aspect-[4/5] flex items-center justify-center">
        <img
          src={sketch.image}
          alt={sketch.title}
          loading="lazy"
          className="w-full h-full object-cover object-center filter contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Subtle vignette/paper grain overlay inside artwork frame */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(20,19,18,0.12)]" />
      </div>

      {/* Polaroid Caption bottom area */}
      <div className="pt-3 pb-1 px-1">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-display font-bold text-sm tracking-tight text-ink group-hover:underline">
            {sketch.title}
          </h4>
          <span className="text-[11px] font-mono text-graphite-light shrink-0">
            {sketch.aspect}
          </span>
        </div>

        <p className="font-sketch text-base text-graphite leading-tight mt-0.5">
          {sketch.caption}
        </p>

        {sketch.annotation && (
          <div className="mt-1 text-[11px] font-mono text-graphite-light border-t border-ink/10 pt-1 flex items-center justify-between">
            <span>{sketch.annotation}</span>
            <span className="text-ink font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              view →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
