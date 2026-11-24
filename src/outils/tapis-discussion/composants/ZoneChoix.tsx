import type { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'
import type { Zone } from '../types'

interface Props {
  zone: Zone
  /** Fond légèrement flouté pendant qu'un picto est proposé. */
  flou: boolean
  children: ReactNode
}

const TEXTES: Record<Zone, string> = { aime: 'J’aime', aimePas: 'J’aime pas' }

/** Une grande zone où l'on dépose les pictos (zone de dépôt, "drop zone"). */
export function ZoneChoix({ zone, flou, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: zone })
  // Quand le doigt survole la zone, elle redevient nette : le jeune voit où il va poser.
  const classes = ['zone', `zone--${zone}`, flou && !isOver ? 'zone--floue' : '', isOver ? 'zone--survol' : '']
  return (
    <section ref={setNodeRef} className={classes.join(' ')} aria-label={TEXTES[zone]}>
      <FondZone zone={zone} />
      <div className="zone__pictos">{children}</div>
    </section>
  )
}

export function FondZone({ zone }: { zone: Zone }) {
  return (
    <div className="zone__fond" aria-hidden="true">
      <Pouce vers={zone === 'aime' ? 'haut' : 'bas'} />
      <span className="zone__titre">{TEXTES[zone]}</span>
    </div>
  )
}

/** Pouce dessiné en SVG : même rendu sur tous les appareils, contrairement aux émojis. */
function Pouce({ vers }: { vers: 'haut' | 'bas' }) {
  return (
    <svg className="zone__pouce" viewBox="0 0 24 24" style={vers === 'bas' ? { transform: 'rotate(180deg)' } : undefined}>
      <path
        fill="currentColor"
        d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 6.59 7.59C6.22 7.95 6 8.45 6 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
      />
    </svg>
  )
}
