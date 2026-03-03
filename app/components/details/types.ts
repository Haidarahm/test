export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 ,'3xl': 1920} as const
export type Breakpoint = keyof typeof BREAKPOINTS
export type ScreenPos = { top: string; left?: string; right?: string }

export type Feature = {
  id: number
  title: string
  description: string
  side: 'left' | 'right'
  positions: { default: ScreenPos; sm?: ScreenPos; md?: ScreenPos; lg?: ScreenPos; xl?: ScreenPos; '2xl'?: ScreenPos; '3xl'?: ScreenPos }
}

export const features: Feature[] = [
  {
    id: 1,
    title: 'Memory Retention',
    description: "Remembers your last preferred\ntemperature, so it's ready when you are.",
    side: 'left',
    positions: {
      default: { top: '18%', left: '2%' },
      sm:      { top: '20%', left: '3%' },
      md:      { top: '22%', left: '4%' },
      lg:      { top: '22%', left: '23%' },
      xl:      { top: '22%', left: '25%' },
      '2xl':   { top: '29%', left: '26%' },
      '3xl':   { top: '34%', left: '26%' },
    },
  },
  {
    id: 2,
    title: 'Automatic Sleep Mode',
    description: 'It "wakes up" intelligently when hot\nliquid is poured in and "sleeps" when empty or unused.',
    side: 'left',
    positions: {
      default: { top: '54%', left: '2%' },
      sm:      { top: '56%', left: '3%' },
      md:      { top: '58%', left: '4%' },
      lg:      { top: '58%', left: '17%' },
      xl:      { top: '60%', left: '20%' },
      '2xl':   { top: '60%', left: '22%' },
      '3xl':   { top: '60%', left: '22%' },
    },
  },
  {
    id: 3,
    title: 'Latest Intelligence',
    description: 'Firmware and software updates\nmake your cup smarter than ever.',
    side: 'right',
    positions: {
      default: { top: '34%', right: '2%' },
      sm:      { top: '36%', right: '3%' },
      md:      { top: '38%', right: '4%' },
      lg:      { top: '38%', right: '20%' },
      xl:      { top: '40%', right: '20%' },
      '2xl':   { top: '40%', right: '22%' },
      '3xl':   { top: '40%', right: '22%' },
    },
  },
]

export function resolvePosition(positions: Feature['positions'], width: number): ScreenPos {
  const order: (Breakpoint | 'default')[] = ['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'default']
  for (const bp of order) {
    if (bp === 'default') return positions.default
    if (width >= BREAKPOINTS[bp] && positions[bp]) return positions[bp]!
  }
  return positions.default
}
