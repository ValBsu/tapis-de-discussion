import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { GrosBouton } from '../../../commun/composants/GrosBouton'
import { EnteteApplication } from '../../../commun/composants/EnteteApplication'
import { imageArasaac, rechercherPictogrammes, type PictoArasaac } from '../../../commun/pictos/arasaac'
import { lireImageLocale } from '../../../commun/pictos/image-locale'
import type { Image } from '../../../commun/pictos/types'
import type { Proposition, Tapis } from '../types'
import './creation.css'

interface Props {
  onRetour: () => void
  onLancer: (tapis: Tapis) => void
}

/** Préparation d'un tapis avec une question et des pictogrammes ARASAAC. */
export function Creation({ onRetour, onLancer }: Props) {
  const compteurPropositions = useRef(0)
  const [question, setQuestion] = useState('')
  const [imageQuestion, setImageQuestion] = useState<Image | undefined>()
  const [photoJeune, setPhotoJeune] = useState<string>()
  const [texteProposition, setTexteProposition] = useState('')
  const [terme, setTerme] = useState('')
  const [resultats, setResultats] = useState<PictoArasaac[]>([])
  const [propositions, setPropositions] = useState<Proposition[]>([])
  const [rechercheEnCours, setRechercheEnCours] = useState(false)
  const [rechercheEffectuee, setRechercheEffectuee] = useState(false)
  const [erreurRecherche, setErreurRecherche] = useState('')
  const [erreurImage, setErreurImage] = useState('')
  const [importImageEnCours, setImportImageEnCours] = useState(false)
  const [erreurPhoto, setErreurPhoto] = useState('')
  const [importPhotoEnCours, setImportPhotoEnCours] = useState(false)

  async function lancerRecherche(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault()
    if (!terme.trim()) return

    setRechercheEnCours(true)
    setRechercheEffectuee(false)
    setErreurRecherche('')
    setResultats([])
    try {
      setResultats(await rechercherPictogrammes(terme))
      setRechercheEffectuee(true)
    } catch (erreur: unknown) {
      setErreurRecherche(
        erreur instanceof Error
          ? erreur.message
          : 'La recherche ARASAAC est indisponible. Vérifiez votre connexion et réessayez.',
      )
      setResultats([])
    } finally {
      setRechercheEnCours(false)
    }
  }

  function ajouterProposition(libelle: string, image?: Image) {
    const id = `proposition-${compteurPropositions.current++}`
    setPropositions((actuelles) => [
      ...actuelles,
      {
        id,
        libelle,
        ...(image ? { image } : {}),
      },
    ])
  }

  function ajouterPicto(picto: PictoArasaac) {
    ajouterProposition(picto.libelle, imageArasaac(picto.id))
  }

  function ajouterTexte(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault()
    const libelle = texteProposition.trim()
    if (!libelle) return

    ajouterProposition(libelle)
    setTexteProposition('')
  }

  async function importerImage(evenement: ChangeEvent<HTMLInputElement>) {
    const fichier = evenement.currentTarget.files?.[0]
    evenement.currentTarget.value = ''
    if (!fichier) return

    setErreurImage('')
    setImportImageEnCours(true)
    try {
      const source = await lireImageLocale(fichier)
      const libelle = fichier.name.replace(/\.[^.]+$/, '').trim() || 'Image'
      ajouterProposition(libelle, { src: source, source: 'externe' })
    } catch (erreur: unknown) {
      setErreurImage(erreur instanceof Error ? erreur.message : 'Impossible de lire cette image.')
    } finally {
      setImportImageEnCours(false)
    }
  }

  async function importerPhoto(evenement: ChangeEvent<HTMLInputElement>) {
    const fichier = evenement.currentTarget.files?.[0]
    evenement.currentTarget.value = ''
    if (!fichier) return

    setErreurPhoto('')
    setImportPhotoEnCours(true)
    try {
      setPhotoJeune(await lireImageLocale(fichier))
    } catch (erreur: unknown) {
      setErreurPhoto(erreur instanceof Error ? erreur.message : 'Impossible de lire cette photo.')
    } finally {
      setImportPhotoEnCours(false)
    }
  }

  function modifierLibelle(id: string, libelle: string) {
    setPropositions((actuelles) =>
      actuelles.map((proposition) => (proposition.id === id ? { ...proposition, libelle } : proposition)),
    )
  }

  function lancerTapis() {
    const texte = question.trim()
    if (!texte || propositions.length === 0) return

    onLancer({
      question: { texte, ...(imageQuestion ? { image: imageQuestion } : {}) },
      ...(photoJeune ? { photoJeune } : {}),
      propositions,
    })
  }

  const imagesAjoutees = new Set(
    propositions.flatMap((proposition) => (proposition.image ? [proposition.image.src] : [])),
  )

  return (
    <main className="page creation">
      <EnteteApplication onRetour={onRetour} />
      <header className="creation__entete">
        <h1>Préparer un tapis</h1>
        <p>Choisissez la question, une photo facultative, puis les propositions à ranger.</p>
      </header>

      <section className="creation__section" aria-labelledby="titre-question">
        <h2 id="titre-question">1. La question affichée en bas du tapis</h2>
        <label className="creation__champ">
          Question de départ
          <input
            value={question}
            onChange={(evenement) => setQuestion(evenement.target.value)}
            placeholder="Ex. : Qu’est-ce que tu as aimé aujourd’hui ?"
            maxLength={180}
          />
        </label>
        <div className="creation__photo">
          <label className="creation__import">
            <span>Photo du jeune (facultative)</span>
            <input
              type="file"
              accept="image/*"
              onChange={importerPhoto}
              disabled={importPhotoEnCours}
            />
          </label>
          <p className="creation__aide-image">
            La photo reste sur cet appareil et apparaît en haut du tapis.
          </p>
          {importPhotoEnCours && <p className="creation__message">Import de la photo…</p>}
          {erreurPhoto && (
            <p className="creation__message creation__message--erreur" role="alert">
              {erreurPhoto}
            </p>
          )}
          {photoJeune && (
            <div className="creation__apercu-photo">
              <img src={photoJeune} alt="Aperçu de la photo du jeune" />
              <button type="button" onClick={() => setPhotoJeune(undefined)}>
                Retirer la photo
              </button>
            </div>
          )}
        </div>
        {imageQuestion && (
          <div className="creation__image-question">
            <img src={imageQuestion.src} alt="Picto de la question" />
            <span>Picto de la question</span>
            <button type="button" onClick={() => setImageQuestion(undefined)}>
              Retirer
            </button>
          </div>
        )}
      </section>

      <section className="creation__ajout" aria-labelledby="titre-ajout">
        <h2 id="titre-ajout">2. Ajouter des propositions</h2>
        <div className="creation__options">
          <article className="creation__option" aria-labelledby="titre-arasaac">
            <header className="creation__option-entete">
              <span>1</span>
              <div>
                <h3 id="titre-arasaac">Picto ARASAAC</h3>
                <p>Choisissez un pictogramme dans la bibliothèque.</p>
              </div>
            </header>
            <form className="creation__recherche" onSubmit={lancerRecherche}>
              <label className="creation__champ">
                Rechercher dans ARASAAC
                <input
                  value={terme}
                  onChange={(evenement) => setTerme(evenement.target.value)}
                  placeholder="Ex. : jouer au ballon"
                  maxLength={80}
                />
              </label>
              <GrosBouton type="submit" disabled={!terme.trim() || rechercheEnCours}>
                {rechercheEnCours ? 'Recherche…' : 'Rechercher'}
              </GrosBouton>
            </form>

            {erreurRecherche && (
              <p className="creation__message creation__message--erreur" role="alert">
                {erreurRecherche}
              </p>
            )}
            {resultats.length > 0 && (
              <>
                <h4>Résultats — touchez pour ajouter</h4>
                <ul className="creation__resultats">
                  {resultats.slice(0, 24).map((picto, index) => {
                    const image = imageArasaac(picto.id)
                    const dejaAjoute = imagesAjoutees.has(image.src)
                    return (
                      <li className="creation__resultat" key={`${picto.id}-${index}`}>
                        <img src={image.src} alt="" loading="lazy" />
                        <span>{picto.libelle}</span>
                        <div className="creation__actions-picto">
                          <button
                            type="button"
                            disabled={dejaAjoute}
                            onClick={() => ajouterPicto(picto)}
                            aria-label={`Ajouter ${picto.libelle} au tapis`}
                          >
                            {dejaAjoute ? 'Ajouté' : 'Ajouter'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageQuestion(image)}
                            aria-label={`Utiliser ${picto.libelle} pour illustrer la question`}
                          >
                            Question
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}
            {rechercheEffectuee && resultats.length === 0 && (
              <p className="creation__message">Aucun pictogramme trouvé. Essayez un autre mot.</p>
            )}
          </article>

          <article className="creation__option" aria-labelledby="titre-texte">
            <header className="creation__option-entete">
              <span>2</span>
              <div>
                <h3 id="titre-texte">Texte seul</h3>
                <p>Ajoutez une proposition qui s’affichera sans image.</p>
              </div>
            </header>
            <form className="creation__texte" onSubmit={ajouterTexte}>
              <label className="creation__champ">
                Votre proposition
                <input
                  value={texteProposition}
                  onChange={(evenement) => setTexteProposition(evenement.target.value)}
                  placeholder="Ex. : Faire une pause"
                  maxLength={80}
                />
              </label>
              <GrosBouton type="submit" disabled={!texteProposition.trim()}>
                Ajouter le texte
              </GrosBouton>
            </form>
          </article>

          <article className="creation__option" aria-labelledby="titre-image">
            <header className="creation__option-entete">
              <span>3</span>
              <div>
                <h3 id="titre-image">Image</h3>
                <p>Importez une image enregistrée sur cet appareil.</p>
              </div>
            </header>
            <label className="creation__import">
              <span>{importImageEnCours ? 'Import en cours…' : 'Choisir une image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={importerImage}
                disabled={importImageEnCours}
              />
            </label>
            <p className="creation__aide-image">
              Téléchargez une image sur Internet puis choisissez-la ici. 5 Mo maximum ; utilisez une
              image que vous avez le droit de réutiliser.
            </p>
            {erreurImage && (
              <p className="creation__message creation__message--erreur" role="alert">
                {erreurImage}
              </p>
            )}
          </article>
        </div>
      </section>

      <section className="creation__section" aria-labelledby="titre-selection">
        <h2 id="titre-selection">3. Propositions du tapis ({propositions.length})</h2>
        {propositions.length === 0 ? (
          <p className="creation__message">Aucune proposition ajoutée pour le moment.</p>
        ) : (
          <ul className="creation__selection">
            {propositions.map((proposition) => (
              <li className="creation__selection-item" key={proposition.id}>
                {proposition.image ? (
                  <img src={proposition.image.src} alt="" />
                ) : (
                  <span className="creation__sans-image" aria-label="Proposition texte seul">
                    Texte
                  </span>
                )}
                <label>
                  <span>Texte sous le picto</span>
                  <input
                    value={proposition.libelle}
                    onChange={(evenement) => modifierLibelle(proposition.id, evenement.target.value)}
                    maxLength={80}
                  />
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setPropositions((actuelles) =>
                      actuelles.filter((element) => element.id !== proposition.id),
                    )
                  }
                  aria-label={`Supprimer ${proposition.libelle}`}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="creation__pied">
        <GrosBouton onClick={lancerTapis} disabled={!question.trim() || propositions.length === 0}>
          Créer et utiliser le tapis
        </GrosBouton>
      </footer>
    </main>
  )
}
