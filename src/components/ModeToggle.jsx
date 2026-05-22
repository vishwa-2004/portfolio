export default function ModeToggle({ is3D, onToggle }) {
  return (
    <div className="mode-toggle" onClick={onToggle} title="Switch portfolio mode">
      <span className="toggle-label" style={{ color: is3D ? '#aaa' : '#1F3A5F', fontFamily:"'Inter',sans-serif" }}>2D</span>
      <div className="toggle-track" style={{ background: is3D ? 'linear-gradient(135deg,#00d4aa,#0066ff)' : '#1F3A5F' }}>
        <div className={`toggle-thumb ${is3D ? 'active' : ''}`}>
          {is3D ? '🌐' : '📄'}
        </div>
      </div>
      <span className="toggle-label" style={{ color: is3D ? '#00d4aa' : '#aaa', fontFamily:"'Orbitron',monospace", fontSize:'.65rem' }}>3D</span>
    </div>
  )
}
