'use client'

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const cardData = [
  {
    id: 1,
    image: "/images/card-left.png",
    alt: "emiGo container left",
    finalRotation: -10,
    translateX: -125,
    translateY: 10,
    zIndex: "z-10",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
  },
  {
    id: 2,
    image: "/images/card-center.png",
    alt: "emiGo container center",
    finalRotation: 0,
    translateX: 0,
    translateY: 14,
    zIndex: "z-20",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_30px_90px_rgba(0,0,0,0.65)]",
  },
  {
    id: 3,
    image: "/images/card-right.png",
    alt: "emiGo container right",
    finalRotation: 10,
    translateX: 125,
    translateY: 10,
    zIndex: "z-10",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
  },
];

const Cards = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const [left, center, right] = cardRefs.current

      gsap.set(titleRef.current, { opacity: 0, y: -40 })
      gsap.set(center, { opacity: 0, scale: 0.85 })
      gsap.set([left, right], { opacity: 0, rotation: 0, x: 0, y: 0 })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // 1. Title slides down and fades in
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 })

      // 2. Center card fades + scales in
      tl.to(center, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.2")

      // 3. Left & right snap visible then animate to final positions
      tl.set([left, right], { opacity: 1 })
      tl.to(left,  { rotation: -10, x: -125, y: 10, duration: 0.7 })
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
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className={`
                absolute
                ${card.zIndex}
                ${card.size}
                ${card.shadow}
                rounded-[22px]
                backdrop-blur-md
                bg-white/10
              `}
              style={{
                padding: "10.66px 8.63px",
                // center card keeps its translateY via CSS; left/right are driven by GSAP
                transform: card.id === 2 ? `translateY(${card.translateY}px)` : undefined,
              }}
            >
              <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-[#181818]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 260px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
