import { useState } from 'react'
import { Creation, TAPIS_DEMO, Utilisation } from '../outils/tapis-discussion'
import { Accueil } from './Accueil'
import { FiletDeSecurite } from './FiletDeSecurite'
import './app.css'

// Quel écran est affiché. Pas besoin d'une bibliothèque de navigation ("router") pour 3 écrans.
type Ecran = 'accueil' | 'tapis-creation' | 'tapis-demo'

export function App() {
  const [ecran, setEcran] = useState<Ecran>('accueil')
  const allerAccueil = () => setEcran('accueil')

  return (
    <FiletDeSecurite onReprendre={allerAccueil}>
      {ecran === 'accueil' && (
        <Accueil onNouveauTapis={() => setEcran('tapis-creation')} onDemo={() => setEcran('tapis-demo')} />
      )}
      {ecran === 'tapis-creation' && <Creation onRetour={allerAccueil} />}
      {ecran === 'tapis-demo' && <Utilisation tapis={TAPIS_DEMO} onTerminer={allerAccueil} />}
    </FiletDeSecurite>
  )
}
