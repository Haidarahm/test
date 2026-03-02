'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWindowSize } from '../hooks/useWindowSize'
import { features } from './details/types'
import FeatureAnnotation from './details/FeatureAnnotation'

gsap.registerPlugin(ScrollTrigger)

const DetailsSection = () => {
  const { width } = useWindowSize()

  const bottleWidth = Math.round(Math.min(Math.max(width * 0.22, 160), 320))
  const lineWidth = Math.round(Math.min(Math.max(width * 0.055, 40), 80))
  const titleSize = Math.round(Math.min(Math.max(width * 0.012, 12), 16))
  const descSize = Math.round(Math.min(Math.max(width * 0.009, 10), 13))

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLImageElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (width === 0) return

    const ctx = gsap.context(() => {
      const els = featureRefs.current
      gsap.set(titleRef.current, { opacity: 0, x: 40 })
      gsap.set(bottleRef.current, { opacity: 0, scale: 0.85 })
      els.forEach((el, i) => el && gsap.set(el, { opacity: 0, x: features[i].side === 'left' ? -30 : 30 }))

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })

      tl.to(titleRef.current, { opacity: 1, x: 0, duration: 0.7 })
        .to(bottleRef.current, { opacity: 1, scale: 1, duration: 0.7 }, '-=0.3')

      els.forEach((el) => {
        if (el) tl.to(el, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [width])

  const isMobile = width > 0 && width < 768

  return (
    <section ref={sectionRef} className=" min-h-screen relative overflow-hidden">
      <div className="emigo-techmology relative top-0 min-h-screen w-full">

        <div className="background absolute w-full h-full opacity-5 right-1/2">
          <img src="/images/background.jpg" alt="" />
        </div>

        {isMobile ? (
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 pt-10 pb-16">
            <div ref={titleRef} className="text-center flex flex-col items-center gap-3">
              <h1
                className="title uppercase font-semibold leading-[100%]"
                style={{ fontSize: 'clamp(26px, 8vw, 34px)' }}
              >
                emigo <br /> advanced <br /> technology
              </h1>
              <p className="font-light uppercase leading-snug text-[13px] text-gray-500">
                The emiGo container combines built‑in <br />
                heating and smart sensors for precise <br />
                temperature control every time
              </p>
            </div>

            <img
              ref={bottleRef}
              src="/images/bottle.png"
              alt="emiGo container"
              style={{ width: Math.min(width * 0.55, 240) }}
              className="h-auto rotate-15 drop-shadow-2xl"
            />

            <div className="w-full flex flex-col gap-5">
              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  ref={(el) => { featureRefs.current[i] = el }}
                  className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm"
                >
                  <div className="dots relative w-5 h-5 mt-0.5 flex-shrink-0 flex justify-center items-center rounded-full bg-[#11111133]">
                    <div className="absolute w-4 h-4 rounded-full bg-[#11111199]" />
                    <div className="absolute w-2 h-2 rounded-full bg-[#111111]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] leading-tight mb-0.5">{feature.title}</p>
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
            <div ref={titleRef} className="title-description absolute top-6 right-6 z-10 text-right flex flex-col justify-end gap-4">
              <h1
                className="title uppercase font-semibold leading-[100%]"
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
                className="h-auto rotate-15 drop-shadow-2xl"
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
      <div className="emigo-techmology-details min-h-screen w-full">
      </div>
    </section>
  )
}

export default DetailsSection
