'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWindowSize } from '../hooks/useWindowSize'
import { features } from './details/types'
import FeatureAnnotation from './details/FeatureAnnotation'

gsap.registerPlugin(ScrollTrigger)

const DetailsSection = () => {
  const { width } = useWindowSize()
  const isMobile = width > 0 && width < 768

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLImageElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  const bottleWidth = Math.round(Math.min(Math.max(width * 0.22, 160), 320))
  const lineWidth = Math.round(Math.min(Math.max(width * 0.055, 40), 80))
  const titleSize = Math.round(Math.min(Math.max(width * 0.012, 12), 16))
  const descSize = Math.round(Math.min(Math.max(width * 0.009, 10), 13))

 useLayoutEffect(() => {
  if (!width || isMobile) return
  if (!bottleRef.current) return

  const ctx = gsap.context(() => {
    const bottle = bottleRef.current
    const section = sectionRef.current
    
    // Get the section's padding
    const sectionStyles = section ? window.getComputedStyle(section) : null
    const paddingLeft = sectionStyles ? parseFloat(sectionStyles.paddingLeft) : 0
    const paddingRight = sectionStyles ? parseFloat(sectionStyles.paddingRight) : 0
    
    // Calculate available width accounting for padding
    const availableWidth = width - paddingLeft - paddingRight
    
    // Calculate moveX based on available width, not total width
    const moveX = (availableWidth * 0.3) + paddingLeft // Add paddingLeft to offset from left edge
    
    const moveY = window.innerHeight * 0.35
    
    // Let GSAP control transforms
    gsap.set(bottle, {
      rotate: 15,
      x: 0,
      y: 0,
      transformOrigin: "center center",
      willChange: "transform",
    })

    // Move bottle to right-center (30% of available width)
    gsap.to(bottle, {
      x: moveX,
      rotate: 0,  
      y: moveY + 400,
      scrollTrigger: {
        trigger: ".emigo-techmology",
        start: "top+=30% top",
        endTrigger: ".emigo-technology-details",
        end: "top center",
        scrub: 1.5,
      },
    })

  }, sectionRef)

  return () => ctx.revert()
}, [width, isMobile])

  return (
    <section ref={sectionRef} className="min-h-screen relative px-10">

      {/* FIRST SECTION */}
      <div className="emigo-techmology relative min-h-screen w-full">

        <div className="absolute w-full h-full opacity-5 right-1/2">
          <img
            src="/images/background.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {isMobile ? (
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 pt-10 pb-16">
            <div ref={titleRef} className="text-center flex flex-col items-center gap-3">
              <h1
                className="uppercase font-semibold leading-[100%]"
                style={{ fontSize: 'clamp(26px, 8vw, 34px)' }}
              >
                emigo <br /> advanced <br /> technology
              </h1>
              <p className="font-light uppercase leading-snug text-[13px] text-gray-500">
                The emiGo container combines built-in <br />
                heating and smart sensors for precise <br />
                temperature control every time
              </p>
            </div>

            <img
              src="/images/bottle.png"
              alt="emiGo container"
              style={{ width: Math.min(width * 0.55, 240) }}
              className="h-auto drop-shadow-2xl"
            />

            <div className="w-full flex flex-col gap-5">
              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  ref={(el) => { featureRefs.current[i] = el }}
                  className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm"
                >
                  <div className="relative w-5 h-5 mt-0.5 flex-shrink-0 flex justify-center items-center rounded-full bg-[#11111133]">
                    <div className="absolute w-4 h-4 rounded-full bg-[#11111199]" />
                    <div className="absolute w-2 h-2 rounded-full bg-[#111111]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] leading-tight mb-0.5">
                      {feature.title}
                    </p>
                    <p className="font-light text-[12px] leading-snug text-gray-500 whitespace-pre-line">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div
              ref={titleRef}
              className="absolute top-6 right-6 z-10 text-right flex flex-col gap-4"
            >
              <h1
                className="uppercase font-semibold leading-[100%]"
                style={{ fontSize: `clamp(20px, ${width * 0.022}px, 34px)` }}
              >
                emigo <br /> advanced <br /> technology
              </h1>
              <p className="font-light uppercase leading-snug text-[14px]">
                The emiGo container combines built in <br />
                heating and smart sensors for precise <br />
                temperature control every time
              </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-0">
              <img
                ref={bottleRef}
                src="/images/bottle.png"
                alt="emiGo container"
                style={{ width: bottleWidth }}
                className="h-auto drop-shadow-2xl"
              />
            </div>

            {features.map((feature, i) => (
              <FeatureAnnotation
                key={feature.id}
                ref={(el) => { featureRefs.current[i] = el }}
                feature={feature}
                width={width}
                lineWidth={lineWidth}
                titleSize={titleSize}
                descSize={descSize}
              />
            ))}
          </>
        )}
      </div>

      {/* SECOND SECTION */}
      <div className="emigo-technology-details  hidden md:flex min-h-screen w-full px-12">

{/* LEFT SIDE — FEATURES LIST */}
<div className="w-1/2 flex items-center px-20">
  <div className="w-full max-w-xl">

    {features.map((feature, i) => (
      <div key={feature.id}>

        <div className="py-8">
          <p className="text-lg font-semibold mb-2">
            {feature.title}
          </p>

          <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
            {feature.description}
          </p>
        </div>

        {/* Divider (except last item) */}
        {i !== features.length - 1 && (
          <div className="h-px w-full bg-gray-200" />
        )}

      </div>
    ))}

  </div>
</div>

{/* RIGHT SIDE — EMPTY (Bottle moves here) */}
<div className="w-1/2 relative flex items-center justify-center" />

</div>
    </section>
  )
}

export default DetailsSection