import React, { forwardRef } from 'react'
import { Feature, resolvePosition } from './types'

type Props = {
  feature: Feature
  width: number
  lineWidth: number
  titleSize: number
  descSize: number
}

const FeatureAnnotation = forwardRef<HTMLDivElement, Props>(
  ({ feature, width, lineWidth, titleSize, descSize }, ref) => {
    const pos = resolvePosition(feature.positions, width)
    const isRight = feature.side === 'right'

    return (
      <div
        ref={ref}
        className="absolute z-10"
        style={{ top: pos.top, left: pos.left, right: pos.right }}
      >
        <div className={`flex items-start gap-2 ${isRight ? 'flex-row-reverse' : ''}`}>
          <div
            className={isRight ? 'text-left' : 'text-right'}
            style={{ maxWidth: `${Math.round(Math.min(width * 0.18, 220))}px` }}
          >
            <p className="font-semibold leading-tight mb-1" style={{ fontSize: titleSize }}>
              {feature.title}
            </p>
            <p className="font-light leading-snug whitespace-pre-line text-gray-500" style={{ fontSize: descSize }}>
              {feature.description}
            </p>
          </div>

          <div className={`flex items-center gap-1 mt-1 ${isRight ? 'flex-row-reverse' : ''}`}>
            <svg height="1" style={{ width: lineWidth }} className="overflow-visible">
              <line x1="0" y1="0" x2="100%" y2="0" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,10" />
            </svg>
            <div className="dots relative w-5 h-5 flex justify-center items-center rounded-full bg-[#11111133]">
              <div className="absolute w-4 h-4 rounded-full bg-[#11111199] shrink-0" />
              <div className="absolute w-2 h-2 rounded-full bg-[#111111] shrink-0" />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

FeatureAnnotation.displayName = 'FeatureAnnotation'

export default FeatureAnnotation
