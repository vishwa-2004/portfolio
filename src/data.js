export const ROLES = ['Mechanical Engineer','Robotics Enthusiast','CAD Designer','IEEE MDC Chair','Tech Innovator']

export const EDUCATION = [
  { year:'2023–2027', deg:'B.E. Mechanical Engineering', inst:'Basaveshwar Engineering College (Autonomous), Bagalkot', score:'6.91', label:'CGPA / 10', sub:'Automation · Mechatronics · Robotics · CAD/CAM · Manufacturing Processes' },
  { year:'2023', deg:'Pre-University – Science (PCM/B)', inst:'Tungal Science P.U. College, Bagalkot', score:'74.83%', label:'Percentage' },
  { year:'2021', deg:'SSLC – Secondary School', inst:"St. Anne's Convent High School, Vidyagiri, Bagalkot", score:'91.68%', label:'Percentage' },
]

export const SKILLS = [
  { cat:'CAD & Design',          items:['Autodesk Fusion 360','3D Modelling','Engineering Drawings','GD&T'],   pct:85 },
  { cat:'Robotics & Automation', items:['Motor Control','Sensor Integration','Mechatronics','CIM'],             pct:80 },
  { cat:'Programming',           items:['C','Python','HTML'],                                                    pct:65 },
  { cat:'Professional',          items:['Leadership','Peer Mentoring','Team Collaboration','Aptitude'],          pct:78 },
]

export const PROJECT = {
  title:'Human Following Robot with Load Carrier',
  award:'2nd Prize — Anveshana 2024',
  venue:'College-Level Project Competition, BEC Bagalkot',
  year:'2024',
  points:[
    'Built a fully autonomous robot that tracks a human target in real time while carrying a payload.',
    'Integrated IR proximity sensors, motor control circuits, and load-bearing chassis from scratch.',
    'End-to-end: mechanical design → electrical wiring → sensor logic → working prototype.',
    'Secured 2nd Prize at Anveshana 2024 among all competing engineering teams.',
  ],
  tags:['Robotics','IR Sensors','Motor Control','Mechanical Design','Embedded Systems'],
}

export const CERTS = [
  { name:'Autodesk Fusion 360 Training',        issuer:'Autodesk / Workshop', dur:'30 Hours', icon:'⚙️' },
  { name:'Python Programming Workshop',          issuer:'Workshop',            dur:'3 Days',   icon:'🐍' },
  { name:'GD&T Workshop',                        issuer:'Workshop',            dur:'1 Day',    icon:'📐' },
  { name:'Computer Integrated Mfg (CAM)',        issuer:'NPTEL',               dur:'12 Weeks', icon:'🏭' },
  { name:'Quantitative Aptitude & Prof. Skills', issuer:'Workshop',            dur:'32 Hours', icon:'📊' },
]

export const HACKATHONS = [
  { name:'Edu Vitality',  venue:'RV College of Engineering, Bengaluru', theme:'AI in Education' },
  { name:'Code Vault',    venue:'MIT Mysore',                           theme:'AI Tutor for Enhanced Learning' },
  { name:'WAVE 3.0',      venue:'BEC Bagalkot',                         theme:'AI in Agriculture' },
  { name:'IGNITRIX',      venue:'KLE-Tech, Hubli',                      theme:'AI for Employment' },
]

export const LEADERSHIP = [
  { role:'MDC Chair',    org:'IEEE Student Branch, BEC Bagalkot',       period:'2024–Present',    desc:'Organized technical workshops for 100+ students; drove structured membership growth and mentored juniors.' },
  { role:'Core Member',  org:'IIF BEC Student Chapter',                 period:'Apr 2026–2027',   desc:'Contributed to innovation ideation and entrepreneurial programs connecting students with real-world challenges.' },
  { role:'Vice Lead',    org:'BEC Creative Spectrum Innovate Club',     period:'2025–Present',    desc:'Co-led design-thinking workshops and creative engineering initiatives; built cross-team collaboration.' },
]
