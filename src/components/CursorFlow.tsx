import { useEffect, useRef } from 'react';

/**
 * CursorFlow — a premium "river of light" that trails the cursor.
 *
 * A full-viewport canvas draws braided white / silver ribbons that flow and
 * undulate along the path of the cursor, like moving water. They converge at
 * the cursor (the source), spread and weave through the middle, then taper
 * and fade behind it. The waves travel along the ribbons so it keeps flowing.
 *
 * Active only while the cursor is over the home page's Hero (#home) section —
 * it fades out elsewhere on the page. Disabled on touch / coarse-pointer
 * devices and for `prefers-reduced-motion`.
 */
export default function CursorFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // pointer target + eased head
    const pointer = { x: w / 2, y: h / 2 };
    const head = { x: w / 2, y: h / 2 };
    let started = false;
    let inside = true;
    let intensity = 0; // 0..1 — eases in / out as the cursor enters / leaves

    // a rope of points trailing the head (follow-the-leader)
    const N = 58;
    const rope = Array.from({ length: N }, () => ({ x: head.x, y: head.y }));

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      inside = true;
      if (!started) {
        started = true;
        head.x = pointer.x;
        head.y = pointer.y;
        for (const p of rope) {
          p.x = head.x;
          p.y = head.y;
        }
      }
    };
    const onLeave = () => {
      inside = false;
    };
    const onEnter = () => {
      inside = true;
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // ribbon layers — together they braid into a flowing river
    const ribbons = [
      { freq: 0.4, phase: 0.0, amp: 19, width: 5.5, alpha: 0.62, tint: '255,255,255' },
      { freq: 0.3, phase: 2.4, amp: 33, width: 3.2, alpha: 0.42, tint: '224,230,244' },
      { freq: 0.55, phase: 4.6, amp: 13, width: 2.2, alpha: 0.66, tint: '245,248,255' },
    ];

    let time = 0;
    let raf = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      time += 0.06;

      // the river only flows while the cursor is over the Hero (#home) section
      let inHero = false;
      const hero = document.getElementById('home');
      if (hero) {
        const r = hero.getBoundingClientRect();
        inHero = pointer.y >= r.top && pointer.y <= r.bottom;
      }
      intensity +=
        ((started && inside && inHero ? 1 : 0) - intensity) * 0.08;

      // ease the head toward the pointer; the rope follows the leader
      head.x += (pointer.x - head.x) * 0.24;
      head.y += (pointer.y - head.y) * 0.24;
      rope[0].x = head.x;
      rope[0].y = head.y;
      for (let i = 1; i < N; i++) {
        rope[i].x += (rope[i - 1].x - rope[i].x) * 0.34;
        rope[i].y += (rope[i - 1].y - rope[i].y) * 0.34;
      }

      ctx.clearRect(0, 0, w, h);
      if (intensity < 0.01) return;

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (const r of ribbons) {
        // wavy points offset perpendicular to the rope
        const pts: { x: number; y: number }[] = [];
        for (let i = 0; i < N; i++) {
          const prev = rope[Math.max(0, i - 1)];
          const next = rope[Math.min(N - 1, i + 1)];
          let dx = next.x - prev.x;
          let dy = next.y - prev.y;
          const len = Math.hypot(dx, dy) || 1;
          dx /= len;
          dy /= len;
          const t = i / (N - 1);
          const env = Math.sin(t * Math.PI); // 0 at head & tail, 1 mid
          const wave =
            Math.sin(i * r.freq + r.phase - time * 2.4) * r.amp * env;
          pts.push({ x: rope[i].x - dy * wave, y: rope[i].y + dx * wave });
        }
        // draw tapered, fading segments — a soft glow pass + a bright core
        for (let i = 1; i < N; i++) {
          const t = i / (N - 1);
          const taper = 1 - t;
          const a = r.alpha * taper * intensity;
          if (a < 0.003) continue;
          const lw = r.width * (0.2 + taper * 0.8);
          const p0 = pts[i - 1];
          const p1 = pts[i];

          ctx.strokeStyle = `rgba(255,255,255,${a * 0.45})`;
          ctx.lineWidth = lw + 16 * taper;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();

          ctx.strokeStyle = `rgba(${r.tint},${a})`;
          ctx.lineWidth = lw;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }

      // glowing source at the head
      const rad = 64;
      const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, rad);
      g.addColorStop(0, `rgba(255,255,255,${0.5 * intensity})`);
      g.addColorStop(0.35, `rgba(255,255,255,${0.16 * intensity})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(head.x, head.y, rad, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] mix-blend-screen"
    />
  );
}
