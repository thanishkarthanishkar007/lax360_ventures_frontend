import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function HeroBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const isLight = theme === "light";

    // Particles configuration
    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 14000), 90);
    const particles = [];

    const colors = isLight
      ? ["rgba(109, 40, 217, 0.45)", "rgba(124, 58, 237, 0.5)", "rgba(99, 102, 241, 0.4)", "rgba(14, 165, 233, 0.35)"]
      : ["rgba(167, 139, 250, 0.75)", "rgba(139, 92, 246, 0.7)", "rgba(192, 132, 252, 0.6)", "rgba(56, 189, 248, 0.6)"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    // Interactive mouse state
    let mouse = { x: null, y: null, maxDist: 140 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let step = 0;

    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Glowing Nebula Gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.35 + Math.sin(step * 0.5) * 60,
        height * 0.3 + Math.cos(step * 0.4) * 40,
        10,
        width * 0.35,
        height * 0.3,
        width * 0.55
      );
      if (isLight) {
        grad1.addColorStop(0, "rgba(221, 214, 254, 0.65)");
        grad1.addColorStop(0.5, "rgba(238, 242, 255, 0.35)");
        grad1.addColorStop(1, "rgba(248, 249, 253, 0)");
      } else {
        grad1.addColorStop(0, "rgba(109, 40, 217, 0.32)");
        grad1.addColorStop(0.5, "rgba(76, 29, 149, 0.18)");
        grad1.addColorStop(1, "rgba(10, 7, 20, 0)");
      }
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(step * 0.6) * 50,
        height * 0.65 + Math.sin(step * 0.5) * 50,
        10,
        width * 0.75,
        height * 0.65,
        width * 0.5
      );
      if (isLight) {
        grad2.addColorStop(0, "rgba(199, 210, 254, 0.55)");
        grad2.addColorStop(0.6, "rgba(224, 231, 255, 0.25)");
        grad2.addColorStop(1, "rgba(248, 249, 253, 0)");
      } else {
        grad2.addColorStop(0, "rgba(56, 189, 248, 0.16)");
        grad2.addColorStop(0.6, "rgba(124, 58, 237, 0.12)");
        grad2.addColorStop(1, "rgba(10, 7, 20, 0)");
      }
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw subtle undulating wave lines
      ctx.beginPath();
      ctx.lineWidth = isLight ? 1 : 1.2;
      for (let x = 0; x < width; x += 15) {
        const y =
          height * 0.5 +
          Math.sin(x * 0.006 + step) * 35 +
          Math.cos(x * 0.012 + step * 0.7) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isLight
        ? "rgba(124, 58, 237, 0.18)"
        : "rgba(167, 139, 250, 0.22)";
      ctx.stroke();

      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y =
          height * 0.58 +
          Math.sin(x * 0.005 - step * 0.8) * 45 +
          Math.cos(x * 0.01 + step * 0.5) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isLight
        ? "rgba(99, 102, 241, 0.14)"
        : "rgba(139, 92, 246, 0.18)";
      ctx.stroke();

      // 3. Connect nearby particles with lines
      const maxConnDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDist) {
            const alpha = (1 - dist / maxConnDist) * (isLight ? 0.25 : 0.35);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLight
              ? `rgba(109, 40, 217, ${alpha})`
              : `rgba(167, 139, 250, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 4. Update and draw particles
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouse.maxDist) {
            const force = (1 - mdist / mouse.maxDist) * 1.5;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        // Pulsing radius
        p.pulse += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = isLight ? "rgba(109, 40, 217, 0.4)" : "rgba(167, 139, 250, 0.8)";
        ctx.shadowBlur = isLight ? 4 : 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-void-fade to-transparent pointer-events-none" />
    </div>
  );
}
