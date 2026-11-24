// Tout ce qui concerne ARASAAC, partagé entre les outils.
// La recherche (adaptée de TLA Flash) et la mise en cache hors ligne arriveront à l'étape 4.

import type { Image } from './types'

/** Adresse de l'image d'un picto ARASAAC à partir de son numéro. */
export function imageArasaac(id: number): Image {
  return { src: `https://static.arasaac.org/pictograms/${id}/${id}_500.png`, source: 'arasaac' }
}

/**
 * Mention obligatoire des conditions d'utilisation ARASAAC (licence CC BY-NC-SA).
 * À afficher dans l'app ET dans chaque PDF qui contient des pictos ARASAAC.
 */
export const ATTRIBUTION_ARASAAC =
  'Pictogrammes : Sergio Palao. Origine : ARASAAC (https://arasaac.org). ' +
  'Licence : CC (BY-NC-SA). Propriété : Gouvernement d’Aragon (Espagne).'
