import { useEffect, useRef } from 'react'

export default function ThreeBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf, t = 0
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    // Particles
    const pts = Array.from({ length: 140 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.8 + .4,
      col: Math.random() > .65 ? '#00d4aa' : '#1a4a8a',
      a: Math.random() * .6 + .1,
    }))

    // Grid lines
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0,212,170,0.03)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
    }

    // Gear
    const drawGear = (cx, cy, or, ir, teeth, rot, alpha, col) => {
      ctx.save(); ctx.globalAlpha = alpha
      ctx.strokeStyle = col; ctx.lineWidth = 1.2
      ctx.beginPath()
      for (let i = 0; i < teeth * 2; i++) {
        const a = (i / (teeth * 2)) * Math.PI * 2 + rot
        const r2 = i % 2 === 0 ? or : ir
        if (i === 0) ctx.moveTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2)
        else ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2)
      }
      ctx.closePath(); ctx.stroke()
      ctx.beginPath(); ctx.arc(cx, cy, ir * .55, 0, Math.PI * 2); ctx.stroke()
      ctx.restore()
    }

    // Scanline
    let scanY = -canvas.height * .1
    const drawScanline = () => {
      scanY += 1.5
      if (scanY > canvas.height * 1.1) scanY = -canvas.height * .1
      const g = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      g.addColorStop(0, 'rgba(0,212,170,0)')
      g.addColorStop(.5, 'rgba(0,212,170,0.04)')
      g.addColorStop(1, 'rgba(0,212,170,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, scanY - 40, canvas.width, 80)
    }

    const frame = () => {
      t += .008
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = '#060912'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      drawScanline()

      // Gears
      drawGear(canvas.width - 160, 200, 110, 85, 18, t, .18, '#00d4aa')
      drawGear(canvas.width - 280, 130, 50, 38, 10, -t * 2.2, .14, '#1a6aaa')
      drawGear(canvas.width - 80,  310, 45, 34, 9,  -t * 2.4, .12, '#00d4aa')
      drawGear(80, canvas.height - 180, 80, 60, 14, t * 1.3, .1, '#00d4aa')
      drawGear(160, canvas.height - 100, 38, 28, 8, -t * 2.8, .08, '#1a6aaa')

      // Orbit ring
      ctx.save()
      ctx.translate(canvas.width - 160, 200)
      ctx.strokeStyle = 'rgba(0,212,170,0.06)'
      ctx.lineWidth = 1
      for (let r = 140; r <= 200; r += 30) {
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke()
      }
      // orbit dots
      for (let i = 0; i < 5; i++) {
        const a = t * 1.2 + (i / 5) * Math.PI * 2
        const ox = Math.cos(a) * 155, oy = Math.sin(a) * 155
        ctx.beginPath(); ctx.arc(ox, oy, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,170,0.7)'; ctx.fill()
      }
      ctx.restore()

      // Particles
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        const dx = mouse.x - p.x, dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) { p.x -= dx * .025; p.y -= dy * .025 }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.globalAlpha = p.a; ctx.fillStyle = p.col; ctx.fill()
        ctx.globalAlpha = 1
      })

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = '#00d4aa'
            ctx.globalAlpha = (1 - d / 120) * .1; ctx.lineWidth = .5; ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }}/>
}
