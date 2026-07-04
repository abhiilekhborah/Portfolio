import { useEffect, useRef } from 'react';

const COLORS = {
  stars: ['#FFE8A3', '#FFD700', '#FFA500', '#FFFFFF', '#FF8C00'],
  fireflies: ['#FFE8A3', '#FFD700', '#ADFF2F', '#39FF14'],
  // Deep warm twilight gradient elements
  sky: ['#0f0b1e', '#16112d', '#2c1e4a', '#4e335f', '#8b516c'],
  mountains: ['#16112d', '#241a3a', '#32224c'],
  forest: ['#14241d', '#1d3528', '#2a4835'],
};

export default function PixelBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    const isMobile = window.innerWidth < 768;

    const starCount = isMobile ? 40 : 100;
    const fireflyCount = isMobile ? 12 : 30;

    const stars = [];
    const fireflies = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.7, // Keep stars in upper sky
          size: Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1,
          color: COLORS.stars[Math.floor(Math.random() * COLORS.stars.length)],
          twinkleSpeed: 0.01 + Math.random() * 0.03,
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: 0.3 + Math.random() * 0.7,
        });
      }
    }

    function initFireflies() {
      fireflies.length = 0;
      for (let i = 0; i < fireflyCount; i++) {
        fireflies.push(createFirefly());
      }
    }

    function createFirefly() {
      return {
        x: Math.random() * width,
        y: height * 0.5 + Math.random() * height * 0.5, // Spawn in lower half
        size: 1.5 + Math.floor(Math.random() * 2),
        color: COLORS.fireflies[Math.floor(Math.random() * COLORS.fireflies.length)],
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.4,
        driftSpeed: 0.01 + Math.random() * 0.02,
        opacity: 0.2 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    }

    // Draws custom pixelated trees on the hills
    function drawPixelTree(x, y, scale, color) {
      ctx.fillStyle = color;
      const baseW = 12 * scale;
      const baseH = 20 * scale;

      // Trunk
      ctx.fillRect(Math.floor(x - baseW/6), Math.floor(y - baseH/4), Math.floor(baseW/3), Math.floor(baseH/4));

      // Leaves (layered triangles)
      for (let i = 0; i < 3; i++) {
        const layerW = baseW * (1 - i * 0.25);
        const layerH = baseH * 0.4;
        const layerY = y - baseH/4 - i * baseH * 0.25;
        
        ctx.beginPath();
        ctx.moveTo(Math.floor(x), Math.floor(layerY - layerH));
        ctx.lineTo(Math.floor(x - layerW/2), Math.floor(layerY));
        ctx.lineTo(Math.floor(x + layerW/2), Math.floor(layerY));
        ctx.closePath();
        ctx.fill();
      }
    }

    function drawLandscape(scrollY) {
      // 1. Far Silhouette Mountains
      const mY = height * 0.5;
      const mH = height * 0.3;
      const mOffset = scrollY * 0.05; // slow parallax

      ctx.fillStyle = COLORS.mountains[1];
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 16) {
        const peakHeight = mH * (0.35 + 0.65 * Math.abs(Math.sin((x + mOffset) * 0.0015) * Math.cos((x + mOffset) * 0.0008)));
        const y = mY - peakHeight;
        // Step size of 4 for pixelated block contour
        ctx.lineTo(Math.floor(x / 6) * 6, Math.floor(y / 6) * 6);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // 2. Mid Hills (with scattered trees)
      const hY = height * 0.62;
      const hH = height * 0.25;
      const hOffset = scrollY * 0.15; // mid parallax
      const forestColor = COLORS.forest[1];

      ctx.fillStyle = forestColor;
      ctx.beginPath();
      ctx.moveTo(0, height);
      const hillPoints = [];
      for (let x = 0; x <= width + 24; x += 24) {
        const peakHeight = hH * (0.4 + 0.6 * Math.abs(Math.sin((x + hOffset) * 0.002) + 0.5 * Math.cos((x + hOffset) * 0.004)));
        const y = hY - peakHeight;
        const px = Math.floor(x / 8) * 8;
        const py = Math.floor(y / 8) * 8;
        hillPoints.push({ x: px, y: py });
        ctx.lineTo(px, py);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Scattered trees on mid hills
      ctx.fillStyle = COLORS.forest[0];
      hillPoints.forEach((pt, index) => {
        if (index % 3 === 0 && pt.x > 20 && pt.x < width - 20) {
          drawPixelTree(pt.x, pt.y + 4, 1.2, COLORS.forest[0]);
        }
      });

      // 3. Near Forest Layer
      const nY = height * 0.78;
      const nH = height * 0.18;
      const nOffset = scrollY * 0.35; // fast parallax
      const nearColor = COLORS.forest[0];

      ctx.fillStyle = nearColor;
      ctx.beginPath();
      ctx.moveTo(0, height);
      const foregroundPoints = [];
      for (let x = 0; x <= width + 32; x += 32) {
        const peakHeight = nH * (0.5 + 0.5 * Math.sin((x + nOffset) * 0.004));
        const y = nY - peakHeight;
        const px = Math.floor(x / 10) * 10;
        const py = Math.floor(y / 10) * 10;
        foregroundPoints.push({ x: px, y: py });
        ctx.lineTo(px, py);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Foreground foliage & trees
      foregroundPoints.forEach((pt, index) => {
        if (index % 2 === 0 && pt.x > 30 && pt.x < width - 30) {
          drawPixelTree(pt.x, pt.y + 6, 2.0, '#0c1712');
        }
      });
    }

    function drawStars(time) {
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.brightness * (0.4 + 0.6 * twinkle);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(
          Math.floor(star.x),
          Math.floor(star.y),
          star.size,
          star.size
        );
      });
      ctx.globalAlpha = 1;
    }

    function drawFireflies(time) {
      fireflies.forEach((f, i) => {
        // Drift movement
        f.angle += f.driftSpeed;
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle + time * f.pulseSpeed) * f.speed * 0.8;

        // Wrap around boundaries
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        if (f.y < height * 0.4) f.y = height + 10;
        if (f.y > height + 10) f.y = height * 0.4;

        // Pulsing glow
        const pulse = Math.sin(time * f.pulseSpeed + f.phase);
        const alpha = f.opacity * (0.3 + 0.7 * pulse);

        // Drawing a pixelated firefly
        ctx.fillStyle = f.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(
          Math.floor(f.x / 2) * 2,
          Math.floor(f.y / 2) * 2,
          f.size,
          f.size
        );
      });
      ctx.globalAlpha = 1;
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // Warm Twilight Sky Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, COLORS.sky[0]); // Deepest night
      gradient.addColorStop(0.3, COLORS.sky[1]);
      gradient.addColorStop(0.6, COLORS.sky[2]); // Purple twilight
      gradient.addColorStop(0.85, COLORS.sky[3]); // Dusk lavender
      gradient.addColorStop(1, COLORS.sky[4]); // Warm sunset rose
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const scrollY = window.scrollY;

      drawStars(time * 0.05);
      drawLandscape(scrollY);
      drawFireflies(time * 0.05);

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    initFireflies();
    animRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', () => {
      resize();
      initStars();
      initFireflies();
    });

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
