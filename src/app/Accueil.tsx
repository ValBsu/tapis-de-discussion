import { GrosBouton } from '../commun/composants/GrosBouton'
import { ATTRIBUTION_ARASAAC } from '../commun/pictos/arasaac'

interface Props {
  onNouveauTapis: () => void
  onDemo: () => void
}

/** Écran d'accueil : la liste des outils de la boîte. */
export function Accueil({ onNouveauTapis, onDemo }: Props) {
  return (
    <main className="page">
      <h1>Boîte à outils</h1>

      <section className="outil">
        <h2>Tapis de discussion</h2>
        <p>Préparer une question et des pictos, puis laisser le jeune ranger « j’aime » / « j’aime pas ».</p>
        <div className="outil__actions">
          <GrosBouton onClick={onNouveauTapis}>Nouveau tapis</GrosBouton>
          <GrosBouton variante="secondaire" onClick={onDemo}>
            Essayer la démo
          </GrosBouton>
        </div>
      </section>

      <section className="outil outil--bientot" aria-disabled="true">
        <h2>Analyseur Séraphin PH</h2>
        <p>Bientôt.</p>
      </section>

      <p className="page__mention">{ATTRIBUTION_ARASAAC}</p>
    </main>
  )
}
