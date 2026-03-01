import React from "react";
import Image from "next/image";

const cardData = [
  {
    id: 1,
    image: "/images/card-left.png",
    alt: "emiGo container left",
    rotate: "-rotate-[10deg]",
    translate: "-translate-x-[125px] translate-y-[10px]",
    zIndex: "z-10",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
  },
  {
    id: 2,
    image: "/images/card-center.png",
    alt: "emiGo container center",
    rotate: "rotate-0",
    translate: "translate-y-[14px]",
    zIndex: "z-20",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_30px_90px_rgba(0,0,0,0.65)]",
  },
  {
    id: 3,
    image: "/images/card-right.png",
    alt: "emiGo container right",
    rotate: "rotate-[10deg]",
    translate: "translate-x-[125px] translate-y-[10px]",
    zIndex: "z-10",
    size: "w-[266px] h-[347px]",
    shadow: "shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
  },
];

const Cards = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
     
      {cardData.map((card) => (
        /* Glass border wrapper — padding = border thickness */
        <div
          key={card.id}
          className={`
            absolute
            ${card.zIndex}
            ${card.size}
            ${card.rotate}
            ${card.translate}
            ${card.shadow}
            rounded-[22px]
            backdrop-blur-md
            bg-white/10
          `}
          style={{
            padding: "10.66px 8.63px",
          }}
        >
          {/* Inner card that clips the image */}
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
  );
};

export default Cards;
