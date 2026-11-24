interface Props {
  onRetour?: () => void
}

export function EnteteApplication({ onRetour }: Props) {
  return (
    <header className="app-entete">
      <div className="app-entete__marque">
        <span className="app-entete__icone" aria-hidden="true">
          T
        </span>
        <div>
          <strong>Tapis de discussion</strong>
          <span>Communication simplifiée</span>
        </div>
      </div>
      {onRetour && (
        <button className="app-entete__retour" type="button" onClick={onRetour}>
          Retour à l’accueil
        </button>
      )}
    </header>
  )
}
