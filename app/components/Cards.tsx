'use client'

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { cardData } from "./cards/data"
import CardItem from "./cards/CardItem"
import { useWindowSize } from "../hooks/useWindowSize"

const Cards = () => {
  const { width } = useWindowSize()
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)

  const cardScale = width > 0 ? Math.min(1, Math.max(0.5, width / 768)) : 1
  const fanOut = Math.round(125 * cardScale)

  useEffect(() => {
    if (width === 0) return

    const ctx = gsap.context(() => {
      const [left, center, right] = cardRefs.current

      gsap.set(titleRef.current, { opacity: 0, y: -40 })
      gsap.set(center, { opacity: 0, scale: cardScale * 0.85 })
      gsap.set([left, right], { opacity: 0, rotation: 0, x: 0, y: 0, scale: cardScale })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(center, { opacity: 1, scale: cardScale, duration: 0.6 }, "-=0.2")
        .set([left, right], { opacity: 1 })
        .to(left, { rotation: -10, x: -fanOut, y: 10, duration: 0.7 })
        .to(right, { rotation: 10, x: fanOut, y: 10, duration: 0.7 }, "<0.1")
    })

    return () => ctx.revert()
  }, [width, cardScale, fanOut])

  return (
    <section className="emigo-container relative h-screen flex flex-col items-center md:items-start justify-center md:justify-start">
      <div className="background absolute w-full h-full opacity-5">
        <img src="/images/background.jpg" alt="background" />
      </div>

      <h1
        ref={titleRef}
        className="title h-fit font-ibrand uppercase font-normal w-full text-center leading-[100%]"
        style={{ fontSize: "clamp(36px, 8vw, 84px)" }}
      >
        shop <br /> emigo <br /> container
      </h1>

      <div className="cards flex h-[40vh] md:h-auto md:flex-1 w-full">
        <div className="relative flex items-center justify-center w-full h-full">
          {cardData.map((card, i) => (
            <CardItem
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el }}
              card={card}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cards
