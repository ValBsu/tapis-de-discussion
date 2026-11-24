/** Une image affichée : un picto ARASAAC, une photo de la photothèque, etc. */
export interface Image {
  /** Adresse de l'image (URL ARASAAC, ou image stockée sur l'appareil plus tard). */
  src: string
  /** D'où vient l'image : sert à afficher la bonne attribution. */
  source: 'arasaac' | 'externe'
}
