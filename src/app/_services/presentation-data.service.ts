import { Injectable } from '@angular/core';

// --- Interfaces basées sur vos modèles ---

// Ce que l'API retourne (correspond à votre modèle SlideContent)
export interface ApiSlide {
  title: string;
  content: string;
}

// Ce dont l'éditeur a besoin pour fonctionner
export interface EditorSlide {
  title: string;
  content: string[]; // Le contenu est une liste de points (un tableau)
}


@Injectable({
  providedIn: 'root'
})
export class PresentationDataService {
  // Le service stocke les données dans le format requis par l'éditeur
  private slides: EditorSlide[] = [];

  /**
   * Méthode principale pour définir les slides.
   * Elle prend la réponse de l'API et la transforme pour l'éditeur.
   * @param apiResponse - Le tableau d'objets {title: string, content: string} reçu de votre backend.
   */
  setSlides(apiResponse: ApiSlide[]): void {
    console.log('Données brutes reçues de l\'API :', apiResponse);

    this.slides = apiResponse.map(apiSlide => {
      // --- C'est la transformation la plus importante ---
      // On transforme la chaîne de caractères 'content' en un tableau de points.
      // Stratégie : on divise le texte par les sauts de ligne ou les points.
      // S'il n'y a pas de séparateur, le contenu entier devient le premier point.

      let points: string[];

      if (apiSlide.content.includes('\n')) {
        // S'il y a des sauts de ligne, on les utilise pour séparer les points
        points = apiSlide.content.split('\n').map(p => p.trim()).filter(p => p.length > 0);
      } else {
        // Sinon, on essaie de séparer par les phrases (points)
        points = apiSlide.content.split('.').map(p => p.trim()).filter(p => p.length > 0);
      }

      // Si après la division, le tableau est vide, on met le contenu original comme seul point
      if (points.length === 0) {
        points = [apiSlide.content];
      }

      // On retourne l'objet dans le format attendu par l'éditeur
      return {
        title: apiSlide.title,
        content: points
      };
    });

    console.log('✅ Données transformées pour l\'éditeur :', this.slides);
  }

  /**
   * Retourne les slides formatées pour l'éditeur.
   */
  getSlides(): EditorSlide[] {
    return this.slides;
  }

  /**
   * Réinitialise les données.
   */
  reset(): void {
    this.slides = [];
  }
}
