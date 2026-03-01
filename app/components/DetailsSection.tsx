'use client'

import React, { useEffect, useState } from 'react'

// ─── Breakpoints (px) ────────────────────────────────────────────────────────
const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 } as const
type Breakpoint = keyof typeof BREAKPOINTS
// ─── Position type ────────────────────────────────────────────────────────────
// top / left / right are CSS strings: px, %, vh, vw — anything you want
type ScreenPos = {
  top: string
  left?: string
  right?: string
}

// ─── Feature definitions ─────────────────────────────────────────────────────
// Edit the positions per breakpoint freely.
// The component picks the largest breakpoint that fits the current width.
// Fallback (default) is used when width < sm.
const features: {
  id: number
  title: string
  description: string
  side: 'left' | 'right'
  positions: { default: ScreenPos; sm?: ScreenPos; md?: ScreenPos; lg?: ScreenPos; xl?: ScreenPos; '2xl'?: ScreenPos }
}[] = [
  {
    id: 1,
    title: 'Memory Retention',
    description: "Remembers your last preferred\ntemperature, so it's ready when you are.",
    side: 'left',
    positions: {
      default: { top: '18%', left: '2%' },
      sm:      { top: '20%', left: '3%' },
      md:      { top: '22%', left: '4%' },
      lg:      { top: '22%', left: '23%' },
      xl:      { top: '22%', left: '25%' },
      '2xl':   { top: '29%', left: '26%' },
    },
  },
  {
    id: 2,
    title: 'Automatic Sleep Mode',
    description: 'It "wakes up" intelligently when hot\nliquid is poured in and "sleeps" when empty or unused.',
    side: 'left',
    positions: {
      default: { top: '54%', left: '2%' },
      sm:      { top: '56%', left: '3%' },
      md:      { top: '58%', left: '4%' },
      lg:      { top: '58%', left: '17%' },
      xl:      { top: '60%', left: '20%' },
      '2xl':   { top: '60%', left: '22%' },
    },
  },
  {
    id: 3,
    title: 'Latest Intelligence',
    description: 'Firmware and software updates\nmake your cup smarter than ever.',
    side: 'right',
    positions: {
      default: { top: '34%', right: '2%' },
      sm:      { top: '36%', right: '3%' },
      md:      { top: '38%', right: '4%' },
      lg:      { top: '38%', right: '20%' },
      xl:      { top: '40%', right: '20%' },
      '2xl':   { top: '40%', right: '22%' },
    },
  },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

// Returns the position config for the current width
function resolvePosition(
  positions: (typeof features)[0]['positions'],
  width: number
): ScreenPos {
  const order: (Breakpoint | 'default')[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'default']
  for (const bp of order) {
    if (bp === 'default') return positions.default
    if (width >= BREAKPOINTS[bp] && positions[bp]) return positions[bp]!
  }
  return positions.default
}

// ─── Component ────────────────────────────────────────────────────────────────
const DetailsSection = () => {
  const { width } = useWindowSize()

  const bottleWidth = Math.round(Math.min(Math.max(width * 0.22, 160), 320))
  const lineWidth   = Math.round(Math.min(Math.max(width * 0.055, 40), 80))
  const titleSize   = Math.round(Math.min(Math.max(width * 0.012, 12), 16))
  const descSize    = Math.round(Math.min(Math.max(width * 0.009, 10), 13))

  return (
    <section className="emigo-technology h-screen relative overflow-hidden bg-white">

      {/* Title top-right */}
      <div className="title-description absolute top-6 right-6 z-10 text-right">
        <h1
          className="title uppercase font-semibold leading-tight"
          style={{ fontSize: `clamp(20px, ${width * 0.022}px, 34px)` }}
        >
          emigo <br /> advanced <br /> technology
        </h1>
        <p
          className="font-light uppercase mt-2 leading-snug"
          style={{ fontSize: `clamp(10px, ${width * 0.009}px, 14px)` }}
        >
          The emiGo container combines built in <br />
          heating and smart sensors for precise <br />
          temperature control every time
        </p>
      </div>

      {/* Center bottle */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <img
          src="/images/bottle.png"
          alt="emiGo container"
          style={{ width: bottleWidth }}
          className="h-auto rotate-15 drop-shadow-2xl"
        />
      </div>

      {/* Feature annotations */}
      {features.map((feature) => {
        const pos = resolvePosition(feature.positions, width)
        return (
          <div
            key={feature.id}
            className="absolute z-10"
            style={{ top: pos.top, left: pos.left, right: pos.right }}
          >
            <div className={`flex items-start gap-2 ${feature.side === 'right' ? 'flex-row-reverse' : ''}`}>
              {/* Text block */}
              <div
                className={feature.side === 'right' ? 'text-left' : 'text-right'}
                style={{ maxWidth: `${Math.round(Math.min(width * 0.18, 220))}px` }}
              >
                <p className="font-semibold leading-tight mb-1" style={{ fontSize: titleSize }}>
                  {feature.title}
                </p>
                <p className="font-light leading-snug whitespace-pre-line text-gray-500 text-[14px]" style={{ fontSize: descSize }}>
                  {feature.description}
                </p>
              </div>

              {/* Line + dot */}
              <div className={`flex items-center gap-1 mt-1 ${feature.side === 'right' ? 'flex-row-reverse' : ''}`}>
                <svg height="1" style={{ width: lineWidth }} className="overflow-visible">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,10" />
                </svg>
                <div className="dots relative w-5 h-5 flex justify-center items-center rounded-full bg-[#11111133] ">
                <div className=" absolute w-4 h-4 rounded-full bg-[#11111199] shrink-0" />
                <div className="absolute  w-2 h-2 rounded-full bg-[#111111] shrink-0" />

                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default DetailsSection