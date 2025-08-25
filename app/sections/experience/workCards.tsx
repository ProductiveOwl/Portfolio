'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experienceData } from './experienceData'

type ExperienceType = 'Work' | 'Club' | 'Volunteer'

export default function WorkCards() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const [pathD, setPathD] = useState('M0 0')
  const [leftWallD, setLeftWallD] = useState('M0 0')
  const [rightWallD, setRightWallD] = useState('M0 0')
  const [pathLength, setPathLength] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  // refs for measuring each card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const experienceTypeStyle: Record<ExperienceType, string> = {
    Work: 'bg-red-400 text-white',
    Club: 'bg-blue-400 text-white',
    Volunteer: 'bg-purple-400 text-white',
  }

  /**
   * computePath builds:
   *  - main center zig-zag
   *  - leftWall (shifted left)
   *  - rightWall (shifted right)
   */
  const computePath = () => {
    const container = containerRef.current
    if (!container) return
    const containerBox = container.getBoundingClientRect()
    const offsetX = Math.round(containerBox.width / 2)
    const spacing = 20;

    let main = `M ${offsetX} 0`
    let left = `M ${offsetX} ${+spacing}`   // starts below
    let right = `M ${offsetX} ${-spacing}` // starts above

    let leftShorten = true
    let rightShorten = false

    // TOP HORIZONTAL
    // move left and right walls out horizontally so they don't look open
    left += ` L ${offsetX - spacing} ${+spacing}`
    right += ` L ${offsetX + spacing} ${-spacing}`

    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return
      const box = cardEl.getBoundingClientRect()

      const relTop = Math.round(Math.max(0, box.top - containerBox.top))
      const relBottom = Math.round(Math.max(0, box.bottom - containerBox.top))
      const isLeftAligned = i % 2 === 0

      const fullOffset = box.width / 2
      const reducedOffset = fullOffset * 0.9
      const sideX = Math.round(isLeftAligned ? offsetX + reducedOffset : offsetX - reducedOffset)

      // ---- MAIN PATH
      main += ` L ${offsetX} ${relTop}`
      main += ` L ${sideX} ${relTop}`
      main += ` L ${sideX} ${relBottom}`
      main += ` L ${offsetX} ${relBottom}`

      // ---- LEFT WALL
      {

        let horizontalRight = 0;
        let vertEnd = 0;
        let topOffset = 0;

        if (leftShorten) {
          horizontalRight = sideX - spacing;
          vertEnd = relBottom - spacing;
          topOffset = relTop + spacing;
        } else {
          horizontalRight = sideX + spacing;
          vertEnd = relBottom + spacing;
          topOffset = relTop - spacing;
        }
        leftShorten = !leftShorten

        left += ` L ${horizontalRight} ${topOffset}`
        left += ` L ${sideX - spacing} ${topOffset}`
        left += ` L ${sideX - spacing} ${vertEnd}`
        left += ` L ${horizontalRight} ${vertEnd}`
      }

      // ---- RIGHT WALL
      {
        let horizontalRight = 0;
        let vertEnd = 0;
        let topOffset = 0;

        if (rightShorten) {
          horizontalRight = sideX + spacing;
          vertEnd = relBottom - spacing;
          topOffset = relTop + spacing;
        } else {
          horizontalRight = sideX - spacing;
          vertEnd = relBottom + spacing;
          topOffset = relTop - spacing;
        }
        rightShorten = !rightShorten

        right += ` L ${horizontalRight} ${topOffset}`
        right += ` L ${sideX + spacing} ${topOffset}`
        right += ` L ${sideX + spacing} ${vertEnd}`
        right += ` L ${horizontalRight} ${vertEnd}`
      }
    })

    // --- BOTTOM HORIZONTAL
    const containerHeight = Math.round(containerBox.height)
    left += ` L ${offsetX} ${containerHeight - spacing}`
    right += ` L ${offsetX} ${containerHeight + spacing}`

    setPathD(main)
    setLeftWallD(left)
    setRightWallD(right)

    requestAnimationFrame(() => {
      if (pathRef.current) {
        try {
          setPathLength(pathRef.current.getTotalLength())
        } catch { }
      }
    })
  }

  // compute first time and on resize
  useEffect(() => {
    const run = () => computePath()
    requestAnimationFrame(run)
    window.addEventListener('resize', run)
    return () => window.removeEventListener('resize', run)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceData.workExperience.length])

  useEffect(() => {
    const id = requestAnimationFrame(() => computePath())
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const distance = useTransform(scrollYProgress, [0, 1], [0, pathLength || 0])

  useEffect(() => {
    const unsub = distance.on('change', (val) => {
      const p = pathRef.current
      if (!p) return
      const length = Math.max(0, Math.min(val, pathLength || 0))
      try {
        const pt = p.getPointAtLength(length)
        setPos({ x: pt.x, y: pt.y })
      } catch { }
    })
    return () => unsub()
  }, [distance, pathLength])

  return (
    <div ref={containerRef} className="relative container mt-4">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
        <path d={leftWallD} stroke="white" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <path d={rightWallD} stroke="white" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <path ref={pathRef} d={pathD} stroke="white" strokeDasharray="3, 20" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <motion.circle cx={pos.x} cy={pos.y} r="8" fill="white" stroke="black" />
      </svg>

      {experienceData.workExperience.map((experience, index) => {
        const isLeft = index % 2 === 0
        const alignment = isLeft ? 'justify-start' : 'justify-end'

        return (
          <div key={index} className={`flex ${alignment}`}>
            <div
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative w-10/11 py-10 rounded-xl"
            >
              <div className={`flex ${alignment}`} style={{ wordBreak: 'break-word' }}>
                <div className="container w-[90%] bg-emerald-400 text-black rounded-xl p-4 shadow-md">
                  <p className="font-bold">
                    {experience.title} @ {experience.company}
                  </p>
                  <div className="flex flex-wrap items-center">
                    {experience.date && (
                      <p className='text-sm'>{experience.date}</p>
                    )}
                    <p className={`mx-2 rounded-xl px-2 ${experienceTypeStyle[experience.experienceType]}`}>
                      {experience.experienceType}
                    </p>
                  </div>
                  {experience.link && experience.linkDescription && (
                    <a href={experience.link} className='text-black hover:text-blue-400 underline decoration-1'>{experience.linkDescription}</a>
                  )}
                  {experience.description && (
                    <p>{experience.description}</p>
                  )}
                  <div>
                    {experience.details && experience.details.length > 0 && (
                      <ul className={`list-disc pl-5`}>
                        {experience.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
