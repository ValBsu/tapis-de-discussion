// Un tapis d'exemple pour la maquette, en attendant l'écran de création (étape 4).
// Les numéros sont de vrais pictos ARASAAC (vérifiés sur l'API le 24/11/2026).

import { imageArasaac } from '../../commun/pictos/arasaac'
import type { Tapis } from './types'

export const TAPIS_DEMO: Tapis = {
  question: { texte: 'Sur la cour, est-ce que j’ai le droit ?', image: imageArasaac(33064) },
  propositions: [
    { id: 'foot', libelle: 'Jouer au foot', image: imageArasaac(16743) },
    { id: 'courir', libelle: 'Courir', image: imageArasaac(6465) },
    { id: 'taper', libelle: 'Taper les autres', image: imageArasaac(4687) },
    { id: 'toboggan', libelle: 'Faire du toboggan', image: imageArasaac(4759) },
    { id: 'crier', libelle: 'Crier', image: imageArasaac(6552) },
    { id: 'partager', libelle: 'Partager', image: imageArasaac(38900) },
  ],
}
