import type { Tapis } from '../types'

/** L'encart du bas : la question posée au jeune, avec son picto (esprit TLA). */
export function EncartQuestion({ question }: { question: Tapis['question'] }) {
  return (
    <div className="question">
      {question.image && <img className="question__image" src={question.image.src} alt="" draggable={false} />}
      <p className="question__texte">{question.texte}</p>
    </div>
  )
}
