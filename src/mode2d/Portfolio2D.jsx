import { useState } from 'react'
import { useTypewriter, useReveal, useSkillAnimate, useCounter } from '../components/hooks.js'
import { ROLES, EDUCATION, SKILLS, PROJECT, CERTS, HACKATHONS, LEADERSHIP } from '../data.js'

const N = '#1F3A5F', A = '#C9962A', W = '#FAFAF9', INK = '#111827', MUT = '#6B7280', RUL = '#E5E7EB'

const s = {
  body: { background: W, color: INK, fontFamily: "'Inter',sans-serif", minHeight:'100vh' },
  nav: {
    position:'fixed', top:0, left:0, right:0, zIndex:99,
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'1.1rem 5rem',
    background:'rgba(250,250,249,0.95)', backdropFilter:'blur(16px)',
    borderBottom:`1px solid ${RUL}`,
  },
  logo: { fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'1.2rem', color:N },
  navLinks: { display:'flex', gap:'2.5rem', listStyle:'none' },
  section: { padding:'6rem 5rem' },
  secLabel: {
    fontFamily:"'Inter',sans-serif", fontSize:'.72rem', color:A,
    letterSpacing:'.15em', textTransform:'uppercase',
    marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.8rem',
  },
  secTitle: {
    fontFamily:"'Playfair Display',serif",
    fontSize:'clamp(1.8rem,3.5vw,2.8rem)',
    color:INK, fontWeight:700, marginBottom:'3rem', letterSpacing:'-0.02em',
  },
  card: {
    background:'#fff', border:`1px solid ${RUL}`, borderRadius:4,
    transition:'border-color .25s, transform .25s, box-shadow .25s',
  },
}

function NavLink({ href, children }) {
  return (
    <li><a href={href} style={{ color:MUT, textDecoration:'none', fontSize:'.82rem', fontWeight:500, letterSpacing:'.06em', textTransform:'uppercase', transition:'color .2s' }}
      onMouseEnter={e=>e.target.style.color=N} onMouseLeave={e=>e.target.style.color=MUT}
    >{children}</a></li>
  )
}

function Card({ children, style={}, hover=true }) {
  const [h, setH] = useState(false)
  return (
    <div style={{ ...s.card, ...style, ...(hover && h ? { borderColor:N, transform:'translateY(-3px)', boxShadow:`0 12px 40px rgba(31,58,95,0.1)` } : {}) }}
      onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>setH(false)}
    >{children}</div>
  )
}

function SecWrap({ id, label, title, bg, children }) {
  const ref = useReveal()
  return (
    <section id={id} style={{ ...s.section, background: bg||W }}>
      <div ref={ref} className="reveal">
        <div style={s.secLabel}>{label}<span style={{width:30,height:1,background:A,display:'inline-block'}}/></div>
        <h2 style={s.secTitle}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function SkillBar2D({ label, pct }) {
  const [ref, w] = useSkillAnimate(pct)
  return (
    <div ref={ref} style={{ marginBottom:'1rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.85rem', marginBottom:'.4rem', color:INK }}>
        <span>{label}</span>
        <span style={{ color:N, fontWeight:600 }}>{pct}%</span>
      </div>
      <div style={{ height:5, background:RUL, borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${w}%`, background:`linear-gradient(90deg,${N},${A})`, borderRadius:3, transition:'width 1.4s cubic-bezier(.25,.46,.45,.94)' }}/>
      </div>
    </div>
  )
}

function CounterNum({ target, suffix='' }) {
  const [ref, count] = useCounter(target)
  return <span ref={ref}>{count}{suffix}</span>
}

export default function Portfolio2D() {
  const role = useTypewriter(ROLES, 75, 2200)

  return (
    <div style={s.body}>
      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.logo}>V<span style={{color:A}}>.</span>D<span style={{color:A}}>.</span></div>
        <ul style={s.navLinks}>
          {['about','education','skills','project','certifications','hackathons','leadership','contact'].map(l =>
            <NavLink key={l} href={`#${l}`}>{l}</NavLink>)}
        </ul>
      </nav>

      {/* HERO */}
      <section id="about" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'8rem 5rem 5rem', position:'relative', overflow:'hidden' }}>
        {/* right block */}
        <div style={{ position:'absolute', top:0, right:0, width:'42%', height:'100%', background:N, zIndex:0 }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:680 }}>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:'.75rem', color:A, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'1rem' }}>
            <span style={{ width:28, height:1, background:A, display:'inline-block' }}/> Available for Internships
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(3.5rem,8vw,6.5rem)', fontWeight:900, lineHeight:.95, letterSpacing:'-0.03em', marginBottom:'1.2rem', color:INK }}>
            Vishwanath<br/><span style={{color:N}}>Diggavi</span>
          </h1>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:'1rem', color:MUT, marginBottom:'2.5rem', display:'flex', alignItems:'center', gap:'.5rem' }}>
            <span style={{color:A}}>→</span>{role}<span style={{animation:'blink 1s infinite',color:A}}>|</span>
          </div>
          <p style={{ color:MUT, fontSize:'1rem', maxWidth:480, lineHeight:1.8, marginBottom:'2.5rem' }}>
            B.E. Mechanical Engineering · BEC Bagalkot · Robotics builder, IEEE leader, and precision engineering enthusiast.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            {[['Get In Touch','mailto:diggavivishwanathd@gmail.com',true],['View Project','#project',false]].map(([t,h,primary])=>(
              <a key={t} href={h} style={{
                background:primary?N:'transparent', color:primary?'#fff':N,
                border:`1.5px solid ${N}`, padding:'.8rem 2rem', borderRadius:2,
                textDecoration:'none', fontWeight:600, fontSize:'.85rem',
                letterSpacing:'.05em', textTransform:'uppercase', display:'inline-block',
                transition:'all .2s',
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background=primary?'#0D2240':N; e.currentTarget.style.color='#fff' }}
              onMouseLeave={e=>{ e.currentTarget.style.background=primary?N:'transparent'; e.currentTarget.style.color=primary?'#fff':N }}
              >{t}</a>
            ))}
          </div>
          <div style={{ display:'flex', gap:'3rem', marginTop:'3rem', paddingTop:'3rem', borderTop:`1px solid ${RUL}` }}>
            {[['6.91','CGPA',false],[4,'+  Hackathons',true],[3,'  Roles',true],[5,'  Certs',true]].map(([v,l,count])=>(
              <div key={l}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.2rem', fontWeight:700, color:N }}>
                  {count ? <CounterNum target={v} suffix=""/> : v}
                </div>
                <div style={{ fontSize:'.7rem', color:MUT, textTransform:'uppercase', letterSpacing:'.08em', marginTop:'.3rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right panel content */}
        <div style={{ position:'absolute', right:0, top:0, width:'42%', height:'100%', zIndex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'4rem 4rem' }}>
          <div style={{ marginBottom:'2rem' }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:'.7rem', color:'rgba(255,255,255,0.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.4rem' }}>CGPA</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:900, color:'#fff' }}>6.91<span style={{fontSize:'1rem', color:'rgba(255,255,255,0.4)'}}>/10</span></div>
          </div>
          <div style={{ marginBottom:'2rem' }}>
            <div style={{ fontSize:'.7rem', color:'rgba(255,255,255,0.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.4rem', fontFamily:"'Inter',sans-serif" }}>Graduation</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:700, color:'#fff' }}>2027</div>
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'rgba(201,150,42,0.15)', border:'1px solid rgba(201,150,42,0.3)', borderRadius:3, padding:'.6rem 1.2rem', marginBottom:'2.5rem' }}>
            <span>🏆</span><span style={{ color:A, fontWeight:700, fontSize:'.85rem' }}>2nd Prize — Anveshana 2024</span>
          </div>
          <div style={{ paddingTop:'2rem', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            {[['Email','diggavivishwanathd@gmail.com'],['Phone','+91-9686937392'],['Location','Bagalkot, Karnataka']].map(([k,v])=>(
              <div key={k} style={{ fontSize:'.78rem', color:'rgba(255,255,255,0.45)', marginBottom:'.5rem' }}>
                <strong style={{color:'rgba(255,255,255,0.8)'}}>{k}: </strong>{v}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <SecWrap id="education" label="Academic" title="Education" bg="#fff">
        {EDUCATION.map((e,i)=>(
          <Card key={i} style={{ padding:'1.6rem 2rem', marginBottom:'1rem', display:'grid', gridTemplateColumns:'150px 1fr auto', gap:'2rem', alignItems:'center' }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:'.82rem', color:A }}>{e.year}</div>
            <div>
              <div style={{ fontWeight:600, color:INK, marginBottom:'.3rem' }}>{e.deg}</div>
              <div style={{ fontSize:'.85rem', color:MUT }}>{e.inst}</div>
              {e.sub && <div style={{ fontSize:'.78rem', color:MUT, marginTop:'.3rem', opacity:.7 }}>{e.sub}</div>}
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, color:N }}>{e.score}</div>
              <div style={{ fontSize:'.68rem', color:MUT, textTransform:'uppercase', letterSpacing:'.08em' }}>{e.label}</div>
            </div>
          </Card>
        ))}
      </SecWrap>

      {/* SKILLS */}
      <SecWrap id="skills" label="Capabilities" title="Technical Skills">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem' }}>
          <div>{SKILLS.map(s=><SkillBar2D key={s.cat} label={s.cat} pct={s.pct}/>)}</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {SKILLS.map(sk=>(
              <Card key={sk.cat} style={{ padding:'1.2rem' }}>
                <div style={{ fontSize:'.7rem', color:A, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'.8rem', fontWeight:600 }}>{sk.cat}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'.3rem' }}>
                  {sk.items.map(t=><span key={t} style={{ background:'#EEF2F7', color:N, fontSize:'.72rem', padding:'.2rem .6rem', borderRadius:2 }}>{t}</span>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </SecWrap>

      {/* PROJECT */}
      <SecWrap id="project" label="Featured Work" title="Project" bg="#fff">
        <Card hover={false} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', overflow:'hidden' }}>
          <div style={{ padding:'3rem', background:N }}>
            <div style={{ fontSize:'.7rem', color:'rgba(255,255,255,0.4)', letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'1.5rem', fontFamily:"'Inter',sans-serif" }}>Project · 2024</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.7rem', fontWeight:700, color:'#fff', lineHeight:1.25, marginBottom:'1rem' }}>{PROJECT.title}</h3>
            <p style={{ fontSize:'.88rem', color:'rgba(255,255,255,0.5)', lineHeight:1.75, marginBottom:'2rem' }}>{PROJECT.venue}</p>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'rgba(201,150,42,0.15)', border:'1px solid rgba(201,150,42,0.35)', borderRadius:3, padding:'.6rem 1.2rem' }}>
              <span>🏆</span><span style={{ color:A, fontWeight:700, fontSize:'.82rem' }}>{PROJECT.award}</span>
            </div>
          </div>
          <div style={{ padding:'3rem' }}>
            <ul style={{ listStyle:'none' }}>
              {PROJECT.points.map((p,i)=>(
                <li key={i} style={{ display:'flex', gap:'.8rem', padding:'.7rem 0', borderBottom:`1px solid ${RUL}`, fontSize:'.9rem', color:MUT, lineHeight:1.7 }}>
                  <span style={{ color:N, flexShrink:0 }}>→</span>{p}
                </li>
              ))}
            </ul>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginTop:'1.5rem' }}>
              {PROJECT.tags.map(t=><span key={t} style={{ background:'#EEF2F7', color:N, fontSize:'.72rem', padding:'.25rem .7rem', borderRadius:2 }}>{t}</span>)}
            </div>
          </div>
        </Card>
      </SecWrap>

      {/* CERTS */}
      <SecWrap id="certifications" label="Credentials" title="Certifications">
        {CERTS.map((c,i)=>(
          <Card key={i} style={{ display:'flex', alignItems:'center', gap:'1.2rem', padding:'1.1rem 1.5rem', marginBottom:'.7rem', borderLeft:`3px solid ${i===0?A:RUL}` }}>
            <span style={{ fontSize:'1.4rem' }}>{c.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:'.92rem', color:INK }}>{c.name}</div>
              <div style={{ fontSize:'.8rem', color:MUT }}>{c.issuer}</div>
            </div>
            <div style={{ fontWeight:700, fontSize:'.82rem', color:N, whiteSpace:'nowrap' }}>{c.dur}</div>
          </Card>
        ))}
      </SecWrap>

      {/* HACKATHONS */}
      <SecWrap id="hackathons" label="Competitions" title="Hackathon Participation" bg="#fff">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1.2rem' }}>
          {HACKATHONS.map((h,i)=>(
            <Card key={i} style={{ padding:'1.8rem' }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem', fontWeight:900, color:RUL, lineHeight:1, marginBottom:'.5rem' }}>
                {String(i+1).padStart(2,'0')}
              </div>
              <div style={{ fontSize:'.7rem', color:A, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'.6rem', fontWeight:600 }}>{h.theme}</div>
              <div style={{ fontWeight:700, color:INK, marginBottom:'.3rem' }}>{h.name}</div>
              <div style={{ fontSize:'.82rem', color:MUT }}>{h.venue}</div>
            </Card>
          ))}
        </div>
      </SecWrap>

      {/* LEADERSHIP */}
      <SecWrap id="leadership" label="Responsibility" title="Leadership">
        <div style={{ paddingLeft:'2rem', position:'relative' }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:1, background:RUL }}/>
          {LEADERSHIP.map((l,i)=>(
            <div key={i} style={{ position:'relative', marginBottom:'1.5rem' }}>
              <div style={{ position:'absolute', left:'-2.35rem', top:'.5rem', width:10, height:10, borderRadius:'50%', border:`2px solid ${N}`, background:W }}/>
              <Card style={{ padding:'1.5rem 2rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'.5rem', marginBottom:'.5rem' }}>
                  <div>
                    <span style={{ fontWeight:700, color:N, fontSize:'.9rem' }}>{l.role}</span>
                    <div style={{ fontWeight:600, color:INK, marginTop:'.2rem' }}>{l.org}</div>
                  </div>
                  <span style={{ fontSize:'.75rem', color:MUT, background:'#F3F4F6', padding:'.25rem .8rem', borderRadius:2 }}>{l.period}</span>
                </div>
                <p style={{ fontSize:'.88rem', color:MUT, lineHeight:1.7 }}>{l.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </SecWrap>

      {/* CONTACT */}
      <SecWrap id="contact" label="Connect" title={<>Open to<br/>Internships</>} bg="#fff">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center' }}>
          <div>
            <p style={{ color:MUT, lineHeight:1.8, marginBottom:'2rem' }}>Seeking internships in core engineering, automation, and robotics. Get in touch — I respond fast.</p>
            <a href="mailto:diggavivishwanathd@gmail.com" style={{ background:N, color:'#fff', padding:'.9rem 2rem', borderRadius:2, textDecoration:'none', fontWeight:700, fontSize:'.85rem', letterSpacing:'.05em', textTransform:'uppercase', display:'inline-block' }}>Send Email →</a>
          </div>
          <div>
            {[['✉','diggavivishwanathd@gmail.com','mailto:diggavivishwanathd@gmail.com'],
              ['📞','+91-9686937392','tel:+919686937392'],
              ['🔗','linkedin.com/in/vishwanath-diggavi','https://linkedin.com/in/vishwanath-diggavi'],
              ['📍','Bagalkot, Karnataka, India','#']].map(([icon,label,href])=>(
              <Card key={label} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem 1.5rem', marginBottom:'.8rem', textDecoration:'none' }}>
                <a href={href} target={href.startsWith('http')?'_blank':undefined} style={{ display:'flex', alignItems:'center', gap:'1rem', textDecoration:'none', color:'inherit', width:'100%' }}>
                  <span style={{ width:36, height:36, background:N, borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>{icon}</span>
                  <span style={{ fontSize:'.88rem', color:INK }}>{label}</span>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </SecWrap>

      <footer style={{ textAlign:'center', padding:'2rem', borderTop:`1px solid ${RUL}`, fontSize:'.78rem', color:MUT, fontFamily:"'Inter',sans-serif" }}>
        Vishwanath Diggavi · Mechanical Engineering · BEC Bagalkot · 2025
      </footer>
    </div>
  )
}
