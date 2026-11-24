import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { GrosBouton } from '../../../commun/composants/GrosBouton'
import { ATTRIBUTION_ARASAAC } from '../../../commun/pictos/arasaac'
import { CartePicto, PictoGlissable } from '../composants/Picto'
import { EncartQuestion } from '../composants/EncartQuestion'
import { ZoneChoix } from '../composants/ZoneChoix'
import { estTermine, estUneZone, placer, propositionEnCours, propositionsDansZone } from '../logique/tapis'
import type { Placements, Tapis, Zone } from '../types'
import '../tapis.css'

interface Props {
  tapis: Tapis
  onTerminer: () => void
}

/** L'écran utilisé AVEC le jeune. */
export function Utilisation({ tapis, onTerminer }: Props) {
  // L'état (state) : où chaque picto est posé, et lequel est en main.
  const [placements, setPlacements] = useState<Placements>({})
  const [idEnMain, setIdEnMain] = useState<string | null>(null)

  // Le glisser ne démarre qu'après 8 px de mouvement : un simple effleurement ne déplace rien.
  const capteurs = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const enCours = propositionEnCours(tapis, placements)
  const termine = estTermine(tapis, placements)
  const pictoEnMain = tapis.propositions.find((p) => p.id === idEnMain)

  function auDebutDuGlisser(evenement: DragStartEvent) {
    setIdEnMain(String(evenement.active.id))
  }

  function aLaFinDuGlisser(evenement: DragEndEvent) {
    setIdEnMain(null)
    const cible = evenement.over?.id
    // Lâché hors d'une zone (ou au milieu) : le picto revient simplement à sa place.
    if (!estUneZone(cible)) return
    setPlacements((actuels) => placer(actuels, String(evenement.active.id), cible))
  }

  function contenuZone(zone: Zone) {
    return propositionsDansZone(tapis, placements, zone).map((p) => (
      <PictoGlissable key={p.id} proposition={p} enMain={p.id === idEnMain} className="picto--pose" />
    ))
  }

  return (
    <DndContext
      sensors={capteurs}
      collisionDetection={pointerWithin} // la zone visée = celle sous le doigt
      onDragStart={auDebutDuGlisser}
      onDragEnd={aLaFinDuGlisser}
      onDragCancel={() => setIdEnMain(null)}
    >
      <main className="tapis">
        <header className="tapis__haut">
          {tapis.photoJeune ? (
            <img className="tapis__photo" src={tapis.photoJeune} alt="Photo du jeune" />
          ) : (
            <div className="tapis__photo tapis__photo--vide">Photo du jeune</div>
          )}
        </header>

        <div className="tapis__milieu">
          <ZoneChoix zone="aime" flou={!termine}>
            {contenuZone('aime')}
          </ZoneChoix>

          {/* Couloir central neutre : le picto proposé n'est dans aucune zone tant qu'on ne l'a pas glissé. */}
          <div className="tapis__centre">
            {enCours && (
              <div key={enCours.id} className="apparition">
                <PictoGlissable proposition={enCours} taille="grande" enMain={enCours.id === idEnMain} />
              </div>
            )}
            {termine && (
              <div className="tapis__fin apparition">
                <GrosBouton disabled title="Arrive à l'étape 5">
                  Export PDF
                </GrosBouton>
                <GrosBouton variante="secondaire" onClick={onTerminer}>
                  Terminer
                </GrosBouton>
              </div>
            )}
          </div>

          <ZoneChoix zone="aimePas" flou={!termine}>
            {contenuZone('aimePas')}
          </ZoneChoix>
        </div>

        <footer className="tapis__bas">
          <EncartQuestion question={tapis.question} />
          <p className="tapis__attribution">{ATTRIBUTION_ARASAAC}</p>
        </footer>
      </main>

      {/* La copie du picto qui suit le doigt, au-dessus de tout. */}
      <DragOverlay dropAnimation={null}>
        {pictoEnMain && <CartePicto proposition={pictoEnMain} taille="grande" className="picto--en-main" />}
      </DragOverlay>
    </DndContext>
  )
}
