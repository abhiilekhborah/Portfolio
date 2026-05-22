import { useEffect, useRef } from 'react';

const COLORS = {
  stars: ['#FFFFFF', '#00FFFF', '#FFD700', '#FF6B9D', '#39FF14'],
  particles: ['#00FFFF', '#9B59B6', '#FF6B9D', '#FFD700', '#39FF14'],
  mountains: ['#0d0720', '#150b30', '#1a0e3d'],
};

export default function PixelBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    const isMobile = window.innerWidth < 768;

    const starCount = isMobile ? 60 : 150;
    const particleCount = isMobile ? 8 : 20;

    const stars = [];
    const particles = [];
    let shootingStar = null;
    let shootingTimer = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.3 ? 2 : 1,
          color: COLORS.stars[Math.floor(Math.random() * COLORS.stars.length)],
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: 0.5 + Math.random() * 0.5,
        });
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 100,
        size: 2 + Math.floor(Math.random() * 3),
        color: COLORS.particles[Math.floor(Math.random() * COLORS.particles.length)],
        speedY: -(0.3 + Math.random() * 0.7),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0.3 + Math.random() * 0.5,
        life: 0,
        maxLife: 300 + Math.random() * 400,
      };
    }

    function drawMountains(scrollY) {
      const layers = [
        { y: height * 0.7, h: height * 0.35, color: COLORS.mountains[0], speed: 0.02, segments: 8 },
        { y: height * 0.75, h: height * 0.3, color: COLORS.mountains[1], speed: 0.04, segments: 10 },
        { y: height * 0.82, h: height * 0.22, color: COLORS.mountains[2], speed: 0.06, segments: 12 },
      ];

      layers.forEach(layer => {
        ctx.fillStyle = layer.color;
        ctx.beginPath();
        const offset = scrollY * layer.speed;
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += Math.floor(width / layer.segments)) {
          const peakHeight = layer.h * (0.3 + 0.7 * Math.abs(Math.sin((x + offset) * 0.003)));
          const y = layer.y - peakHeight;
          // Pixelate the mountain shape
          ctx.lineTo(Math.floor(x / 4) * 4, Math.floor(y / 4) * 4);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });
    }

    function drawGrid() {
      const gridY = height * 0.88;
      const gridHeight = height - gridY;
      
      ctx.strokeStyle = 'rgba(155, 89, 182, 0.15)';
      ctx.lineWidth = 1;
      
      // Horizontal lines with perspective
      for (let i = 0; i < 8; i++) {
        const y = gridY + (gridHeight * (i / 8));
        const perspective = 1 - ((y - gridY) / gridHeight) * 0.5;
        ctx.globalAlpha = perspective * 0.3;
        ctx.beginPath();
        ctx.moveTo(0, Math.floor(y));
        ctx.lineTo(width, Math.floor(y));
        ctx.stroke();
      }

      // Vertical lines
      const spacing = 60;
      for (let x = 0; x < width; x += spacing) {
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.moveTo(Math.floor(x), gridY);
        ctx.lineTo(Math.floor(x), height);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function drawStars(time) {
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.brightness * (0.5 + 0.5 * twinkle);
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

    function drawParticles() {
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (p.life > p.maxLife || p.y < -20) {
          particles[i] = createParticle();
          return;
        }

        const fadeIn = Math.min(p.life / 30, 1);
        const fadeOut = Math.max(1 - (p.life / p.maxLife), 0);
        ctx.globalAlpha = p.opacity * fadeIn * fadeOut;
        ctx.fillStyle = p.color;
        ctx.fillRect(
          Math.floor(p.x / 2) * 2,
          Math.floor(p.y / 2) * 2,
          p.size,
          p.size
        );
      });
      ctx.globalAlpha = 1;
    }

    function drawShootingStar(time) {
      shootingTimer++;
      if (!shootingStar && shootingTimer > (isMobile ? 600 : 300) && Math.random() < 0.005) {
        shootingStar = {
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.3,
          vx: 4 + Math.random() * 3,
          vy: 2 + Math.random() * 2,
          life: 0,
          maxLife: 40 + Math.random() * 30,
        };
        shootingTimer = 0;
      }

      if (shootingStar) {
        const s = shootingStar;
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const fade = 1 - s.life / s.maxLife;
        const tailLength = 6;

        for (let i = 0; i < tailLength; i++) {
          const t = i / tailLength;
          ctx.globalAlpha = fade * (1 - t) * 0.8;
          ctx.fillStyle = i === 0 ? '#FFFFFF' : '#00FFFF';
          ctx.fillRect(
            Math.floor((s.x - s.vx * i * 1.5) / 2) * 2,
            Math.floor((s.y - s.vy * i * 1.5) / 2) * 2,
            2,
            2
          );
        }
        ctx.globalAlpha = 1;

        if (s.life > s.maxLife) {
          shootingStar = null;
        }
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#050510');
      gradient.addColorStop(0.4, '#0a0e27');
      gradient.addColorStop(0.7, '#0d1b3e');
      gradient.addColorStop(1, '#1a0533');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const scrollY = window.scrollY;

      drawStars(time * 0.001);
      drawShootingStar(time);
      drawMountains(scrollY);
      drawGrid();
      drawParticles();

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    initParticles();
    animRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', () => {
      resize();
      initStars();
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
