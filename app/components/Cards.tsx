import React from "react";
import Image from "next/image";

const cardData = [
  {
    id: 1,
    image: "/images/card-left.png",
    alt: "emiGo container left",
    rotate: "-rotate-[14deg]",
    translate: "-translate-x-[145px] translate-y-[30px]",
    zIndex: "z-10",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
    border: "border border-white/10",
  },
  {
    id: 2,
    image: "/images/card-center.png",
    alt: "emiGo container center",
    rotate: "rotate-0",
    translate: "-translate-y-[14px]",
    zIndex: "z-20",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_30px_90px_rgba(0,0,0,0.65)]",
    border: "border border-white/20",
  },
  {
    id: 3,
    image: "/images/card-right.png",
    alt: "emiGo container right",
    rotate: "rotate-[14deg]",
    translate: "translate-x-[145px] translate-y-[30px]",
    zIndex: "z-10",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
    border: "border border-white/10",
  },
];

const Cards = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
     
      {cardData.map((card) => (
        <div
          key={card.id}
          className={`
            absolute
            ${card.zIndex}
            ${card.size}
            ${card.rotate}
            ${card.translate}
            ${card.shadow}
            ${card.border}
            rounded-[22px]
            overflow-hidden
            bg-[#181818]
          `}
        >
          <Image
            src={card.image}
            alt={card.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 260px"
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
