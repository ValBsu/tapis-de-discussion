import { describe, expect, it } from 'vitest'
import type { Tapis } from '../types'
import { estTermine, estUneZone, placer, propositionEnCours, propositionsDansZone } from './tapis'

const image = { src: 'x.png', source: 'arasaac' as const }
const tapis: Tapis = {
  question: { texte: 'Sur la cour, est-ce que j’ai le droit ?' },
  propositions: [
    { id: 'foot', libelle: 'Jouer au foot', image },
    { id: 'courir', libelle: 'Courir', image },
    { id: 'taper', libelle: 'Taper les autres', image },
  ],
}

describe('propositionEnCours', () => {
  it('propose d’abord la première proposition', () => {
    expect(propositionEnCours(tapis, {})?.id).toBe('foot')
  })

  it('passe à la suivante quand la première est posée', () => {
    expect(propositionEnCours(tapis, { foot: 'aime' })?.id).toBe('courir')
  })

  it('ne propose plus rien quand tout est posé', () => {
    expect(propositionEnCours(tapis, { foot: 'aime', courir: 'aime', taper: 'aimePas' })).toBeUndefined()
  })
})

describe('placer', () => {
  it('pose une proposition sans modifier les anciens placements', () => {
    const avant = {}
    const apres = placer(avant, 'foot', 'aime')
    expect(apres).toEqual({ foot: 'aime' })
    expect(avant).toEqual({}) // l'ancien objet n'a pas bougé
  })

  it('permet de changer d’avis (reprise d’un picto)', () => {
    expect(placer({ foot: 'aime' }, 'foot', 'aimePas')).toEqual({ foot: 'aimePas' })
  })
})

describe('propositionsDansZone et estTermine', () => {
  it('range chaque proposition dans la bonne zone', () => {
    const placements = { foot: 'aime', taper: 'aimePas' } as const
    expect(propositionsDansZone(tapis, placements, 'aime').map((p) => p.id)).toEqual(['foot'])
    expect(propositionsDansZone(tapis, placements, 'aimePas').map((p) => p.id)).toEqual(['taper'])
    expect(estTermine(tapis, placements)).toBe(false)
  })

  it('considère un tapis vide comme terminé (pas de blocage)', () => {
    expect(estTermine({ ...tapis, propositions: [] }, {})).toBe(true)
  })
})

describe('estUneZone', () => {
  it('refuse tout ce qui n’est pas une zone', () => {
    expect(estUneZone('aime')).toBe(true)
    expect(estUneZone('milieu')).toBe(false)
    expect(estUneZone(undefined)).toBe(false)
  })
})
