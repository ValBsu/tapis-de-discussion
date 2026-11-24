// La "forme" des données du tapis (types TypeScript).
// Aucune logique ici : seulement la description de ce qu'est un tapis.

import type { Image } from '../../commun/pictos/types'

/** Les deux côtés du tapis. */
export type Zone = 'aime' | 'aimePas'

/** Une proposition que le jeune va ranger (ex. « jouer au foot »). */
export interface Proposition {
  id: string
  libelle: string
  image: Image
}

/** Tout ce que le professionnel prépare avant la séance. */
export interface Tapis {
  question: {
    texte: string
    image?: Image
  }
  /** Photo du jeune (facultative dans la maquette). */
  photoJeune?: string
  /** Dans l'ordre où elles seront proposées. */
  propositions: Proposition[]
}

/** Où chaque proposition a été posée : identifiant → zone. Absent = pas encore posée. */
export type Placements = Readonly<Record<string, Zone>>
