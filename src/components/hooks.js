import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, speed = 75, pause = 2000) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const w = words[wi]
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, ci + 1))
        if (ci + 1 === w.length) setTimeout(() => setDel(true), pause)
        else setCi(c => c + 1)
      } else {
        setText(w.slice(0, ci - 1))
        if (ci === 0) { setDel(false); setWi(i => (i + 1) % words.length) }
        else setCi(c => c - 1)
      }
    }, del ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [ci, del, wi, words, speed, pause])

  return text
}

export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

export function useSkillAnimate(pct) {
  const [w, setW] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(pct), 300); obs.disconnect() }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])
  return [ref, w]
}

export function useCounter(target) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0; const step = target / 50
        const t = setInterval(() => {
          n += step; if (n >= target) { setCount(target); clearInterval(t) }
          else setCount(Math.floor(n))
        }, 25)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return [ref, count]
}
