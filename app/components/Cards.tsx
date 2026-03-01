'use client'

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { cardData } from "./cards/data"
import CardItem from "./cards/CardItem"

const Cards = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const [left, center, right] = cardRefs.current

      gsap.set(titleRef.current, { opacity: 0, y: -40 })
      gsap.set(center, { opacity: 0, scale: 0.85 })
      gsap.set([left, right], { opacity: 0, rotation: 0, x: 0, y: 0 })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(center, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.2")
        .set([left, right], { opacity: 1 })
        .to(left,  { rotation: -10, x: -125, y: 10, duration: 0.7 })
        .to(right, { rotation: 10,  x: 125,  y: 10, duration: 0.7 }, "<0.1")
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="emigo-container h-screen flex flex-col">
      <h1 ref={titleRef} className="title h-fit font-ibrand uppercase font-normal text-[84px] w-full text-center leading-[100%]">
        shop <br /> emigo <br /> container
      </h1>
      <div className="cards flex flex-1 w-full">
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
