const TAILLE_MAX_IMAGE = 5 * 1024 * 1024

/** Lit une image de l'appareil sans l'envoyer à un serveur. */
export function lireImageLocale(fichier: File): Promise<string> {
  if (!fichier.type.startsWith('image/')) {
    return Promise.reject(new Error('Choisissez un fichier image.'))
  }
  if (fichier.size > TAILLE_MAX_IMAGE) {
    return Promise.reject(new Error('Cette image dépasse 5 Mo. Choisissez un fichier plus léger.'))
  }

  return new Promise((resolve, reject) => {
    const lecteur = new FileReader()
    lecteur.onerror = () => reject(new Error('Impossible de lire ce fichier image. Essayez un autre fichier.'))
    lecteur.onabort = () => reject(new Error('La lecture du fichier image a été interrompue.'))
    lecteur.onload = () => {
      if (typeof lecteur.result === 'string') {
        resolve(lecteur.result)
      } else {
        reject(new Error('Impossible de lire ce fichier image. Essayez un autre fichier.'))
      }
    }
    lecteur.readAsDataURL(fichier)
  })
}
