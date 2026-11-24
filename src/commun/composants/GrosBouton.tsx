import type { ButtonHTMLAttributes } from 'react'
import './GrosBouton.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'principal' | 'secondaire'
}

/** Bouton pensé pour le tactile : grand, contrasté, facile à viser. */
export function GrosBouton({ variante = 'principal', className = '', ...reste }: Props) {
  return <button type="button" className={`gros-bouton gros-bouton--${variante} ${className}`} {...reste} />
}
