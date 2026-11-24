import { useState } from 'react'
import { Creation, TAPIS_DEMO, Utilisation } from '../outils/tapis-discussion'
import type { Tapis } from '../outils/tapis-discussion'
import { Accueil } from './Accueil'
import { FiletDeSecurite } from './FiletDeSecurite'
import './app.css'

// Quel écran est affiché. Pas besoin d'une bibliothèque de navigation pour quelques écrans.
type Ecran = 'accueil' | 'tapis-creation' | 'tapis-demo' | 'tapis-personnalise'

export function App() {
  const [ecran, setEcran] = useState<Ecran>('accueil')
  const [tapisCree, setTapisCree] = useState<Tapis | null>(null)
  const allerAccueil = () => setEcran('accueil')

  return (
    <FiletDeSecurite onReprendre={allerAccueil}>
      {ecran === 'accueil' && (
        <Accueil onNouveauTapis={() => setEcran('tapis-creation')} onDemo={() => setEcran('tapis-demo')} />
      )}
      {ecran === 'tapis-creation' && (
        <Creation
          onRetour={allerAccueil}
          onLancer={(tapis) => {
            setTapisCree(tapis)
            setEcran('tapis-personnalise')
          }}
        />
      )}
      {ecran === 'tapis-demo' && <Utilisation tapis={TAPIS_DEMO} onTerminer={allerAccueil} />}
      {ecran === 'tapis-personnalise' && tapisCree && (
        <Utilisation tapis={tapisCree} onTerminer={allerAccueil} />
      )}
    </FiletDeSecurite>
  )
}
