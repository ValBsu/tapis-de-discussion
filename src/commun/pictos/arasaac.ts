// Tout ce qui concerne ARASAAC, partagé entre les outils.

import type { Image } from './types'

export interface PictoArasaac {
  id: number
  libelle: string
}

/** Adresse de l'image d'un picto ARASAAC à partir de son numéro. */
export function imageArasaac(id: number): Image {
  return { src: `https://static.arasaac.org/pictograms/${id}/${id}_500.png`, source: 'arasaac' }
}

/** Recherche des pictogrammes dans la base ARASAAC en français. */
export async function rechercherPictogrammes(terme: string): Promise<PictoArasaac[]> {
  let reponse: Response
  try {
    reponse = await fetch(
      `https://api.arasaac.org/api/pictograms/fr/search/${encodeURIComponent(terme.trim())}`,
    )
  } catch {
    throw new Error('Impossible de joindre ARASAAC. Vérifiez votre connexion internet et réessayez.')
  }

  if (!reponse.ok) {
    throw new Error(`La recherche ARASAAC a échoué (${reponse.status}).`)
  }

  const donnees: unknown = await reponse.json()
  if (!Array.isArray(donnees)) {
    throw new Error('La réponse de la base ARASAAC est invalide.')
  }

  return donnees.flatMap((element: unknown) => {
    if (typeof element !== 'object' || element === null || !('_id' in element) || !('keywords' in element)) {
      return []
    }

    const id = element._id
    const mots = element.keywords
    if (typeof id !== 'number' || !Array.isArray(mots)) return []

    const mot = mots.find(
      (candidat: unknown) =>
        typeof candidat === 'object' &&
        candidat !== null &&
        'keyword' in candidat &&
        typeof candidat.keyword === 'string' &&
        candidat.keyword.trim().length > 0,
    )
    if (!mot || typeof mot !== 'object' || !('keyword' in mot) || typeof mot.keyword !== 'string') {
      return []
    }

    return [{ id, libelle: mot.keyword }]
  })
}

/**
 * Mention obligatoire des conditions d'utilisation ARASAAC (licence CC BY-NC-SA).
 * À afficher dans l'app ET dans chaque PDF qui contient des pictos ARASAAC.
 */
export const ATTRIBUTION_ARASAAC =
  'Pictogrammes : Sergio Palao. Origine : ARASAAC (https://arasaac.org). ' +
  'Licence : CC (BY-NC-SA). Propriété : Gouvernement d’Aragon (Espagne).'
