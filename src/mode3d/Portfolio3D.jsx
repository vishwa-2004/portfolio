import { useState, useRef, useEffect } from 'react'
import ThreeBackground from './ThreeBackground.jsx'
import { useTypewriter, useReveal, useSkillAnimate, useCounter } from '../components/hooks.js'
import { ROLES, EDUCATION, SKILLS, PROJECT, CERTS, HACKATHONS, LEADERSHIP } from '../data.js'

const T = '#00d4aa', GOLD = '#f0a500', BG = '#060912', BG2 = 'rgba(10,15,30,0.85)'
const BORDER = 'rgba(0,212,170,0.18)', MUTED = '#6b7a99', WHITE = '#e8edf5'

/* ── NAV ── */
function Nav3D() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h)
  }, [])
  const links = ['about','education','skills','project','certifications','hackathons','leadership','contact']
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:99,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'1.1rem 5rem',
      background: scrolled ? 'rgba(6,9,18,0.95)' : 'rgba(6,9,18,0.7)',
      backdropFilter:'blur(20px)',
      borderBottom:`1px solid ${scrolled ? BORDER : 'transparent'}`,
      transition:'all .3s',
    }}>
      <div style={{ fontFamily:"'Orbitron',monospace", fontWeight:900, fontSize:'1.1rem', color:T, letterSpacing:'.1em' }}>
        VD<span style={{color:'rgba(0,212,170,0.3)'}}>.exe</span>
      </div>
      <ul style={{ display:'flex', gap:'2rem', listStyle:'none' }}>
        {links.map(l => (
          <li key={l}><a href={`#${l}`} style={{
            color:MUTED, textDecoration:'none', fontSize:'.78rem', fontWeight:500,
            letterSpacing:'.1em', textTransform:'uppercase',
            fontFamily:"'JetBrains Mono',monospace", transition:'color .2s',
          }}
          onMouseEnter={e=>e.target.style.color=T}
          onMouseLeave={e=>e.target.style.color=MUTED}
          >{l}</a></li>
        ))}
      </ul>
    </nav>
  )
}

/* ── SECTION WRAPPER ── */
function Sec3D({ id, label, title, children, bg }) {
  const ref = useReveal()
  return (
    <section id={id} style={{ position:'relative', zIndex:1, padding:'7rem 5rem', background: bg || 'transparent' }}>
      <div ref={ref} className="reveal">
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.72rem', color:T, letterSpacing:'.2em', textTransform:'uppercase', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.8rem' }}>
          <span style={{opacity:.5}}>//</span>{label}<span style={{flex:'0 0 40px',height:1,background:T,display:'inline-block'}}/>
        </div>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, color:WHITE, marginBottom:'3.5rem', letterSpacing:'-.01em' }}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

/* ── GLASS CARD ── */
function GCard({ children, style={}, tilt=false }) {
  const ref = useRef(null)
  const handle = e => {
    if (!tilt || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - .5) * 18
    const y = ((e.clientY - r.top)  / r.height - .5) * -18
    ref.current.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)' }
  return (
    <div ref={ref}
      onMouseMove={handle} onMouseLeave={reset}
      style={{
        background:'rgba(10,15,30,0.75)',
        border:`1px solid ${BORDER}`,
        borderRadius:8, backdropFilter:'blur(16px)',
        transition:'border-color .3s, box-shadow .3s, transform .15s',
        ...style,
      }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(0,212,170,0.45)'; e.currentTarget.style.boxShadow='0 20px 60px rgba(0,212,170,0.1)' }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor=BORDER; e.currentTarget.style.boxShadow='none'; reset() }}
    >{children}</div>
  )
}

/* ── SKILL BAR ── */
function SkillBar3D({ label, pct }) {
  const [ref, w] = useSkillAnimate(pct)
  return (
    <div ref={ref} style={{ marginBottom:'1.2rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.82rem', marginBottom:'.5rem', color:WHITE }}>
        <span>{label}</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", color:T, fontSize:'.78rem' }}>{pct}%</span>
      </div>
      <div style={{ height:6, background:'rgba(255,255,255,0.05)', borderRadius:3, overflow:'hidden', position:'relative' }}>
        <div style={{ height:'100%', width:`${w}%`, borderRadius:3, transition:'width 1.5s cubic-bezier(.25,.46,.45,.94)', background:`linear-gradient(90deg,${T},rgba(0,100,255,0.6))`, boxShadow:`0 0 12px rgba(0,212,170,0.4)` }}/>
      </div>
    </div>
  )
}

/* ── COUNTER ── */
function Counter3D({ target, suffix='' }) {
  const [ref, count] = useCounter(target)
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── HERO ── */
function Hero3D() {
  const role = useTypewriter(ROLES, 72, 2200)
  return (
    <section id="about" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'8rem 5rem 5rem', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:760 }}>
        {/* eyebrow */}
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.78rem', color:T, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'1rem' }}>
          <span style={{ width:8, height:8, background:T, borderRadius:'50%', boxShadow:`0 0 12px ${T}`, animation:'pulse 2s infinite', display:'inline-block' }}/>
          Available for Internships · Bagalkot, Karnataka
        </div>

        {/* name */}
        <h1 style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(3.5rem,10vw,8rem)', fontWeight:900, lineHeight:.9, letterSpacing:'-.02em', marginBottom:'1.5rem' }}>
          <span style={{ display:'block', color:WHITE, textShadow:'0 0 40px rgba(255,255,255,0.1)' }}>VISHWA</span>
          <span style={{ display:'block', color:T, textShadow:`0 0 40px ${T}` }}>NATH</span>
          <span style={{ display:'block', color:'rgba(255,255,255,0.25)', fontSize:'40%', letterSpacing:'.15em', marginTop:'1rem', fontWeight:400 }}>DIGGAVI</span>
        </h1>

        {/* typewriter */}
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'1.05rem', color:MUTED, marginBottom:'2.5rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
          <span style={{color:T}}>&gt;&gt;</span>&nbsp;{role}<span style={{animation:'blink 1s infinite', color:T}}>_</span>
        </div>

        <p style={{ color:MUTED, fontSize:'1rem', maxWidth:500, lineHeight:1.85, marginBottom:'3rem' }}>
          B.E. Mechanical Engineering · BEC Bagalkot · Robotics builder, IEEE MDC Chair, CAD designer, and precision engineering enthusiast.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'1rem', marginBottom:'3.5rem', flexWrap:'wrap' }}>
          <a href="mailto:diggavivishwanathd@gmail.com" style={{
            background:`linear-gradient(135deg,${T},#008866)`,
            color:'#060912', padding:'.85rem 2rem', borderRadius:4,
            textDecoration:'none', fontWeight:800, fontSize:'.85rem',
            fontFamily:"'Orbitron',monospace", letterSpacing:'.05em',
            textTransform:'uppercase', boxShadow:`0 4px 20px rgba(0,212,170,0.35)`,
            transition:'transform .2s, box-shadow .2s',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 30px rgba(0,212,170,0.5)` }}
          onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,212,170,0.35)` }}
          >[ GET IN TOUCH ]</a>
          <a href="#project" style={{
            border:`1px solid rgba(0,212,170,0.4)`, color:T,
            padding:'.85rem 2rem', borderRadius:4,
            textDecoration:'none', fontWeight:700, fontSize:'.85rem',
            fontFamily:"'Orbitron',monospace", letterSpacing:'.05em',
            textTransform:'uppercase', background:'rgba(0,212,170,0.04)',
            transition:'all .2s',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(0,212,170,0.12)'; e.currentTarget.style.borderColor=T }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(0,212,170,0.04)'; e.currentTarget.style.borderColor='rgba(0,212,170,0.4)' }}
          >[ VIEW WORK ]</a>
        </div>

        {/* stats */}
        <div style={{ display:'flex', gap:0, borderTop:`1px solid ${BORDER}`, paddingTop:'2.5rem', flexWrap:'wrap' }}>
          {[['6.91','CGPA / 10',false],[4,'+ Hackathons',true],[3,' Leadership Roles',true],[5,' Certifications',true]].map(([v,l,c],i)=>(
            <div key={l} style={{ flex:1, minWidth:120, padding:'0 2rem 0 0', borderRight: i<3?`1px solid ${BORDER}`:'none', marginRight:i<3?'2rem':0 }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:'2rem', fontWeight:900, color:T, textShadow:`0 0 20px rgba(0,212,170,0.5)` }}>
                {c ? <Counter3D target={v}/> : v}
              </div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.68rem', color:MUTED, textTransform:'uppercase', letterSpacing:'.1em', marginTop:'.3rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating 3D badge */}
      <div style={{ position:'absolute', right:'5rem', bottom:'10rem', animation:'float 5s ease-in-out infinite' }}>
        <GCard tilt style={{ padding:'1.5rem 2rem', textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:'.5rem' }}>🏆</div>
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:'.75rem', color:GOLD, fontWeight:700 }}>2nd Prize</div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:MUTED, marginTop:'.3rem' }}>Anveshana 2024</div>
        </GCard>
      </div>
    </section>
  )
}

/* ── EDUCATION 3D ── */
function Edu3D() {
  return (
    <Sec3D id="education" label="academic_background" title="Education.json">
      {EDUCATION.map((e, i) => (
        <GCard key={i} tilt style={{ padding:'1.6rem 2rem', marginBottom:'1rem', display:'grid', gridTemplateColumns:'140px 1fr auto', gap:'2rem', alignItems:'center' }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.8rem', color:T }}>{e.year}</div>
          <div>
            <div style={{ fontWeight:600, color:WHITE, marginBottom:'.3rem' }}>{e.deg}</div>
            <div style={{ fontSize:'.85rem', color:MUTED }}>{e.inst}</div>
            {e.sub && <div style={{ fontSize:'.75rem', color:MUTED, marginTop:'.3rem', opacity:.6 }}>{e.sub}</div>}
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:"'Orbitron',monospace", fontSize:'1.6rem', fontWeight:700, color:T, textShadow:`0 0 20px rgba(0,212,170,0.4)` }}>{e.score}</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:MUTED, textTransform:'uppercase', letterSpacing:'.08em' }}>{e.label}</div>
          </div>
        </GCard>
      ))}
    </Sec3D>
  )
}

/* ── SKILLS 3D ── */
function Skills3D() {
  return (
    <Sec3D id="skills" label="capabilities.init()" title="Skills_Matrix" bg="rgba(10,15,30,0.5)">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem' }}>
        <div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:T, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:'1.5rem', opacity:.7 }}>// proficiency_scan</div>
          {SKILLS.map(s=><SkillBar3D key={s.cat} label={s.cat} pct={s.pct}/>)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', alignContent:'start' }}>
          {SKILLS.map(sk=>(
            <GCard key={sk.cat} tilt style={{ padding:'1.2rem 1.4rem' }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:T, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'.8rem' }}>{sk.cat}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.35rem' }}>
                {sk.items.map(t=>(
                  <span key={t} style={{ background:'rgba(0,212,170,0.07)', border:`1px solid rgba(0,212,170,0.2)`, color:T, fontSize:'.7rem', padding:'.2rem .55rem', borderRadius:3, fontFamily:"'JetBrains Mono',monospace" }}>{t}</span>
                ))}
              </div>
            </GCard>
          ))}
        </div>
      </div>
    </Sec3D>
  )
}

/* ── PROJECT 3D ── */
function Project3D() {
  const [flipped, setFlipped] = useState(false)
  return (
    <Sec3D id="project" label="featured_project.exe" title="Project_Database">
      <div style={{ perspective:1200 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, border:`1px solid ${BORDER}`, borderRadius:8, overflow:'hidden', backdropFilter:'blur(16px)' }}>
          {/* LEFT */}
          <div style={{ padding:'3rem', background:'linear-gradient(135deg,rgba(26,58,110,0.5),rgba(0,212,170,0.06))', borderRight:`1px solid ${BORDER}` }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:'rgba(0,212,170,0.4)', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'1.5rem' }}>// project_2024.mechanical</div>
            <h3 style={{ fontFamily:"'Orbitron',monospace", fontSize:'1.5rem', fontWeight:700, color:WHITE, lineHeight:1.3, marginBottom:'1rem' }}>{PROJECT.title}</h3>
            <p style={{ fontSize:'.88rem', color:MUTED, lineHeight:1.75, marginBottom:'2rem' }}>{PROJECT.venue}</p>

            {/* animated circuit */}
            <svg viewBox="0 0 220 70" style={{ width:'100%', opacity:.5, marginBottom:'2rem' }}>
              <path d="M10 35 H50 V15 H110 V55 H160 V35 H210" stroke={T} strokeWidth="1.2" fill="none" strokeDasharray="250" strokeDashoffset="250"
                style={{ animation:'dash 2.5s ease forwards .3s', animationFillMode:'forwards' }}/>
              {[50,110,160].map((x,i)=><circle key={i} cx={x} cy={i===1?55:i===0?15:35} r="4" fill="none" stroke={T} strokeWidth="1.5"/>)}
            </svg>

            <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'rgba(240,165,0,0.1)', border:'1px solid rgba(240,165,0,0.3)', borderRadius:4, padding:'.6rem 1.2rem' }}>
              <span>🏆</span><span style={{ color:GOLD, fontWeight:700, fontSize:'.82rem', fontFamily:"'Orbitron',monospace" }}>{PROJECT.award}</span>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ padding:'3rem', background:'rgba(6,9,18,0.6)' }}>
            <ul style={{ listStyle:'none', marginBottom:'2rem' }}>
              {PROJECT.points.map((p,i)=>(
                <li key={i} style={{ display:'flex', gap:'.8rem', padding:'.75rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:'.88rem', color:MUTED, lineHeight:1.7 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", color:T, fontSize:'.72rem', flexShrink:0, marginTop:'.15rem' }}>{String(i+1).padStart(2,'0')}.</span>{p}
                </li>
              ))}
            </ul>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.45rem' }}>
              {PROJECT.tags.map(t=>(
                <span key={t} style={{ background:'rgba(0,212,170,0.06)', border:`1px solid rgba(0,212,170,0.18)`, color:T, fontSize:'.72rem', padding:'.25rem .7rem', borderRadius:3, fontFamily:"'JetBrains Mono',monospace" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Sec3D>
  )
}

/* ── CERTS 3D ── */
function Certs3D() {
  return (
    <Sec3D id="certifications" label="credentials.verify()" title="Certifications" bg="rgba(10,15,30,0.5)">
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1rem' }}>
        {CERTS.map((c,i)=>(
          <GCard key={i} tilt style={{ padding:'1.5rem', borderLeft:`2px solid rgba(0,212,170,0.3)` }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
              <span style={{ fontSize:'1.6rem' }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:'.9rem', color:WHITE, marginBottom:'.25rem' }}>{c.name}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:T }}>{c.dur} · {c.issuer}</div>
              </div>
            </div>
          </GCard>
        ))}
      </div>
    </Sec3D>
  )
}

/* ── HACKATHONS 3D ── */
function Hackathons3D() {
  return (
    <Sec3D id="hackathons" label="competitions.log" title="Hackathon_Records">
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:'1.2rem' }}>
        {HACKATHONS.map((h,i)=>(
          <GCard key={i} tilt style={{ padding:'2rem', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:10, right:16, fontFamily:"'Orbitron',monospace", fontSize:'3.5rem', fontWeight:900, color:'rgba(0,212,170,0.05)', lineHeight:1 }}>{String(i+1).padStart(2,'0')}</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:T, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:'.8rem' }}>{h.theme}</div>
            <div style={{ fontFamily:"'Orbitron',monospace", fontWeight:700, fontSize:'1rem', color:WHITE, marginBottom:'.4rem' }}>{h.name}</div>
            <div style={{ fontSize:'.82rem', color:MUTED }}>{h.venue}</div>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${T},transparent)`, opacity:.3 }}/>
          </GCard>
        ))}
      </div>
    </Sec3D>
  )
}

/* ── LEADERSHIP 3D ── */
function Leadership3D() {
  return (
    <Sec3D id="leadership" label="positions.active()" title="Leadership_Stack" bg="rgba(10,15,30,0.5)">
      <div style={{ paddingLeft:'2.5rem', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:1, background:`linear-gradient(to bottom,${T},rgba(0,212,170,0.1))` }}/>
        {LEADERSHIP.map((l,i)=>(
          <div key={i} style={{ position:'relative', marginBottom:'1.5rem' }}>
            <div style={{ position:'absolute', left:'-2.85rem', top:'.5rem', width:12, height:12, borderRadius:'50%', border:`2px solid ${T}`, background:BG, boxShadow:`0 0 12px ${T}` }}/>
            <GCard tilt style={{ padding:'1.5rem 2rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'.5rem', marginBottom:'.5rem' }}>
                <div>
                  <span style={{ fontFamily:"'Orbitron',monospace", fontSize:'.8rem', color:T, fontWeight:700 }}>{l.role}</span>
                  <div style={{ fontWeight:600, color:WHITE, marginTop:'.2rem' }}>{l.org}</div>
                </div>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:T, background:'rgba(0,212,170,0.07)', border:`1px solid rgba(0,212,170,0.2)`, padding:'.25rem .8rem', borderRadius:3 }}>{l.period}</span>
              </div>
              <p style={{ fontSize:'.88rem', color:MUTED, lineHeight:1.75 }}>{l.desc}</p>
            </GCard>
          </div>
        ))}
      </div>
    </Sec3D>
  )
}

/* ── CONTACT 3D ── */
function Contact3D() {
  const ref = useReveal()
  return (
    <section id="contact" style={{ position:'relative', zIndex:1, padding:'7rem 5rem', background:'rgba(10,15,30,0.5)' }}>
      <div ref={ref} className="reveal" style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.72rem', color:T, letterSpacing:'.2em', textTransform:'uppercase', marginBottom:'1rem' }}>// connection.init()</div>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, color:WHITE, marginBottom:'1rem', textShadow:`0 0 40px rgba(0,212,170,0.2)` }}>
          Let's Build<br/><span style={{color:T}}>Something</span>
        </h2>
        <p style={{ color:MUTED, marginBottom:'3rem', lineHeight:1.85 }}>Open to internships in core engineering, automation, and robotics. Get in touch — I respond fast.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'.8rem', maxWidth:440, margin:'0 auto' }}>
          {[['✉','diggavivishwanathd@gmail.com','mailto:diggavivishwanathd@gmail.com','Email'],
            ['📞','+91-9686937392','tel:+919686937392','Phone'],
            ['🔗','linkedin.com/in/vishwanath-diggavi','https://linkedin.com/in/vishwanath-diggavi','LinkedIn'],
          ].map(([icon,val,href,label])=>(
            <a key={label} href={href} target={href.startsWith('http')?'_blank':undefined} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.5rem', background:'rgba(0,212,170,0.04)', border:`1px solid rgba(0,212,170,0.15)`, borderRadius:6, textDecoration:'none', transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=T; e.currentTarget.style.background='rgba(0,212,170,0.1)'; e.currentTarget.style.boxShadow=`0 0 20px rgba(0,212,170,0.15)` }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(0,212,170,0.15)'; e.currentTarget.style.background='rgba(0,212,170,0.04)'; e.currentTarget.style.boxShadow='none' }}
            >
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.68rem', color:T, minWidth:56, textTransform:'uppercase' }}>{label}</span>
              <span style={{ fontSize:'1rem' }}>{icon}</span>
              <span style={{ fontSize:'.85rem', color:MUTED }}>{val}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── MAIN 3D ── */
export default function Portfolio3D() {
  return (
    <div style={{ background:BG, color:WHITE, fontFamily:"'Inter',sans-serif", minHeight:'100vh' }}>
      <ThreeBackground/>
      <Nav3D/>
      <Hero3D/>
      <Edu3D/>
      <Skills3D/>
      <Project3D/>
      <Certs3D/>
      <Hackathons3D/>
      <Leadership3D/>
      <Contact3D/>
      <footer style={{ position:'relative', zIndex:1, textAlign:'center', padding:'2rem', borderTop:`1px solid ${BORDER}`, fontFamily:"'JetBrains Mono',monospace", fontSize:'.75rem', color:MUTED }}>
        <span style={{color:T}}>vishwanath_diggavi</span>.exe · BEC Bagalkot · 2025
      </footer>
    </div>
  )
}
