import React, { forwardRef } from "react"
import Image from "next/image"
import { CardData } from "./data"

type Props = { card: CardData }

const CardItem = forwardRef<HTMLDivElement, Props>(({ card }, ref) => (
  <div
    ref={ref}
    className={`absolute ${card.zIndex} ${card.size} ${card.shadow} rounded-[22px] backdrop-blur-md bg-white/10`}
    style={{
      padding: "10.66px 8.63px",
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
))

CardItem.displayName = "CardItem"

export default CardItem
