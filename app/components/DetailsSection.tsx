import React from 'react'

const features = [
  {
    id: 1,
    title: 'Memory Retention',
    description: "Remembers your last preferred\ntemperature, so it's ready when you are.",
    side: 'left',
    topPercent: '22%',
    dotTopPercent: '30%',
  },
  {
    id: 2,
    title: 'Automatic Sleep Mode',
    description: 'It "wakes up" intelligently when hot\nliquid is poured in and "sleeps" when\nempty or unused.',
    side: 'left',
    topPercent: '58%',
    dotTopPercent: '65%',
  },
  {
    id: 3,
    title: 'Latest Intelligence',
    description: 'Firmware and software updates\nmake your cup smarter than ever.',
    side: 'right',
    topPercent: '38%',
    dotTopPercent: '44%',
  },
]

const DetailsSection = () => {
  return (
    <section className="emigo-technology h-screen relative overflow-hidden bg-white">

      {/* Title top-right */}
      <div className="title-description absolute top-6 right-6 z-10 text-right">
        <h1 className="title uppercase text-[31.7px] font-semibold leading-tight">
          emigo <br /> advanced <br /> technology
        </h1>
        <p className="font-light uppercase text-sm mt-2 leading-snug">
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
          className="w-[280px] h-auto rotate-15 drop-shadow-2xl"
        />
      </div>

      {/* Feature annotations */}
      {features.map((feature) => (
        <div
          key={feature.id}
          className="absolute z-10"
          style={{
            top: feature.topPercent,
            ...(feature.side === 'left' ? { left: '4%' } : { right: '4%' }),
          }}
        >
          <div className={`flex items-start gap-3 ${feature.side === 'right' ? 'flex-row-reverse' : ''}`}>
            {/* Text block */}
            <div className={`max-w-[220px] ${feature.side === 'right' ? 'text-left' : 'text-right'}`}>
              <p className="  text-[15px] leading-tight mb-1">{feature.title}</p>
              <p className=" text-text-secondary text-[12px] font-light leading-snug whitespace-pre-line text-gray-600">
                {feature.description}
              </p>
            </div>

            {/* Line + dot */}
            <div className={`flex items-center gap-1 mt-1 ${feature.side === 'right' ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-px bg-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default DetailsSection