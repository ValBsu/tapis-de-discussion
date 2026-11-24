import { GrosBouton } from '../../../commun/composants/GrosBouton'

/** Écran de préparation par le professionnel – construit à l'étape 4. */
export function Creation({ onRetour }: { onRetour: () => void }) {
  return (
    <main className="page">
      <h1>Nouveau tapis</h1>
      <p>Ici, le professionnel saisira la question, ajoutera la photo du jeune et choisira les pictos (étape 4).</p>
      <GrosBouton variante="secondaire" onClick={onRetour}>
        Retour
      </GrosBouton>
    </main>
  )
}
