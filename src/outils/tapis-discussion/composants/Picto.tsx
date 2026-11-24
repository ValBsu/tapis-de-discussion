import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import type { Proposition } from '../types'

interface CarteProps {
  proposition: Proposition
  taille?: 'normale' | 'grande'
  className?: string
}

/** L'apparence d'un picto (image + mot), sans comportement. */
export function CartePicto({ proposition, taille = 'normale', className = '' }: CarteProps) {
  // Si l'image ne charge pas (pas de réseau…), on garde le mot : le tapis reste utilisable.
  const [imageCassee, setImageCassee] = useState(false)
  return (
    <div className={`picto picto--${taille} ${className}`}>
      {imageCassee ? (
        <div className="picto__secours" aria-hidden="true">?</div>
      ) : (
        <img src={proposition.image.src} alt="" draggable={false} onError={() => setImageCassee(true)} />
      )}
      <span className="picto__libelle">{proposition.libelle}</span>
    </div>
  )
}

interface GlissableProps extends CarteProps {
  /** Vrai pendant que CE picto est dans la main du jeune (on affiche alors un fantôme à sa place). */
  enMain: boolean
}

/** Un picto que le jeune peut prendre et glisser (glisser-déposer, "drag and drop"). */
export function PictoGlissable({ proposition, taille, enMain, className = '' }: GlissableProps) {
  const { setNodeRef, listeners, attributes } = useDraggable({ id: proposition.id })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      aria-label={`${proposition.libelle}, à glisser vers j'aime ou j'aime pas`}
      className={`glissable ${enMain ? 'glissable--fantome' : ''}`}
    >
      <CartePicto proposition={proposition} taille={taille} className={className} />
    </div>
  )
}
