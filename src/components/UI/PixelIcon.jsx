const icons = import.meta.glob('/node_modules/pixelarticons/svg/*.svg', { query: '?raw', import: 'default', eager: true });

export default function PixelIcon({ name, size = 24, className = '', color = 'currentColor' }) {
  const path = `/node_modules/pixelarticons/svg/${name}.svg`;
  const svgContent = icons[path];

  if (!svgContent) {
    console.warn(`PixelIcon: Icon '${name}' not found.`);
    return <span className={className} style={{ width: size, height: size, display: 'inline-block' }} />;
  }

  // Replace default dimensions and inject currentColor
  const formattedSvg = svgContent
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`);

  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedSvg }} 
      style={{ color }}
    />
  );
}
