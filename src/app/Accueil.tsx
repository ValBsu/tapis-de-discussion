import { GrosBouton } from '../commun/composants/GrosBouton'
import { EnteteApplication } from '../commun/composants/EnteteApplication'
import { ATTRIBUTION_ARASAAC } from '../commun/pictos/arasaac'

interface Props {
  onNouveauTapis: () => void
  onDemo: () => void
}

/** Écran d'accueil : la liste des outils de la boîte. */
export function Accueil({ onNouveauTapis, onDemo }: Props) {
  return (
    <main className="page accueil">
      <EnteteApplication />

      <section className="accueil__hero">
        <div className="accueil__texte">
          <p className="accueil__surtitre">Un support visuel pour échanger</p>
          <h1>Le tapis de discussion</h1>
          <p>
            Préparez une question et des pictogrammes, puis aidez le jeune à exprimer ce qu’il aime ou
            n’aime pas.
          </p>
        </div>
        <div className="outil__actions">
          <GrosBouton onClick={onNouveauTapis}>Créer un tapis</GrosBouton>
          <GrosBouton variante="secondaire" onClick={onDemo}>
            Voir la démo
          </GrosBouton>
        </div>
      </section>

      <p className="page__mention">{ATTRIBUTION_ARASAAC}</p>
    </main>
  )
}
