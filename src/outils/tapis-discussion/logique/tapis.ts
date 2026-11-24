// Les règles du tapis, sans aucun affichage (fonctions pures).
// Une fonction pure reçoit des données et en renvoie de nouvelles,
// sans rien modifier autour d'elle : on peut donc la tester facilement.

import type { Placements, Proposition, Tapis, Zone } from '../types'

/** Pose (ou repose) une proposition dans une zone. Renvoie de NOUVEAUX placements. */
export function placer(placements: Placements, idProposition: string, zone: Zone): Placements {
  if (placements[idProposition] === zone) return placements // rien ne change
  return { ...placements, [idProposition]: zone }
}

/** La prochaine proposition à montrer au jeune, ou `undefined` s'il n'en reste plus. */
export function propositionEnCours(tapis: Tapis, placements: Placements): Proposition | undefined {
  return tapis.propositions.find((proposition) => placements[proposition.id] === undefined)
}

/** Les propositions déjà posées dans une zone, dans l'ordre du tapis. */
export function propositionsDansZone(tapis: Tapis, placements: Placements, zone: Zone): Proposition[] {
  return tapis.propositions.filter((proposition) => placements[proposition.id] === zone)
}

/** Vrai quand toutes les propositions ont été rangées. */
export function estTermine(tapis: Tapis, placements: Placements): boolean {
  return propositionEnCours(tapis, placements) === undefined
}

/** Vérifie qu'une valeur reçue du glisser-déposer est bien une zone (sécurité). */
export function estUneZone(valeur: unknown): valeur is Zone {
  return valeur === 'aime' || valeur === 'aimePas'
}
