import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onReprendre: () => void
}

interface Etat {
  erreur: boolean
}

/**
 * Filet de sécurité ("Error Boundary") : si un bug survient dans un écran,
 * on affiche un message calme au lieu d'une page blanche devant le jeune.
 * React impose une classe pour ce cas précis : c'est le seul endroit du projet.
 */
export class FiletDeSecurite extends Component<Props, Etat> {
  state: Etat = { erreur: false }

  static getDerivedStateFromError(): Etat {
    return { erreur: true }
  }

  componentDidCatch(erreur: Error, info: ErrorInfo) {
    console.error('Erreur attrapée par le filet de sécurité', erreur, info.componentStack)
  }

  render() {
    if (!this.state.erreur) return this.props.children
    return (
      <main className="page page--centre">
        <h1>Petite pause</h1>
        <p>Un souci technique est survenu.</p>
        <button
          type="button"
          className="gros-bouton gros-bouton--principal"
          onClick={() => {
            this.setState({ erreur: false })
            this.props.onReprendre()
          }}
        >
          Revenir à l’accueil
        </button>
      </main>
    )
  }
}
