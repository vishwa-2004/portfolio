import { useState, useEffect } from 'react'
import Portfolio2D from './mode2d/Portfolio2D.jsx'
import Portfolio3D from './mode3d/Portfolio3D.jsx'
import ModeToggle from './components/ModeToggle.jsx'

export default function App() {
  const [is3D, setIs3D] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const toggle = () => {
    setTransitioning(true)
    setTimeout(() => {
      setIs3D(p => !p)
      window.scrollTo({ top: 0 })
      setTransitioning(false)
    }, 400)
  }

  return (
    <>
      {/* Full-screen transition overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: is3D ? '#060912' : '#FAFAF9',
        opacity: transitioning ? 1 : 0,
        pointerEvents: transitioning ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: is3D ? "'Orbitron',monospace" : "'Playfair Display',serif",
          fontSize: '1.2rem', fontWeight: 700,
          color: is3D ? '#00d4aa' : '#1F3A5F',
          letterSpacing: '.1em',
          opacity: transitioning ? 1 : 0,
          transition: 'opacity 0.2s ease 0.1s',
        }}>
          {is3D ? '// loading_3D_mode...' : 'Switching to Classic View'}
        </div>
      </div>

      {/* Mode toggle */}
      <ModeToggle is3D={is3D} onToggle={toggle} />

      {/* Portfolio */}
      <div style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.4s ease' }}>
        {is3D ? <Portfolio3D /> : <Portfolio2D />}
      </div>
    </>
  )
}
