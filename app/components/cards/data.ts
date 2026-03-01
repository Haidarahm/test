export type CardData = {
  id: number
  image: string
  alt: string
  finalRotation: number
  translateX: number
  translateY: number
  zIndex: string
  size: string
  shadow: string
}

export const cardData: CardData[] = [
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
]
