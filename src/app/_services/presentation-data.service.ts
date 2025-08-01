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
  private slides: EditorSlide[] = [];

  /**
   * Méthode principale pour définir les slides.
   * Elle prend la réponse de l'API et la transforme pour l'éditeur.
   * @param apiResponse 
   */
  setSlides(apiResponse: ApiSlide[]): void {
    console.log('Données brutes reçues de l\'API :', apiResponse);

    this.slides = apiResponse.map(apiSlide => {


      let points: string[];

      if (apiSlide.content.includes('\n')) {
        points = apiSlide.content.split('\n').map(p => p.trim()).filter(p => p.length > 0);
      } else {
        points = apiSlide.content.split('.').map(p => p.trim()).filter(p => p.length > 0);
      }

      if (points.length === 0) {
        points = [apiSlide.content];
      }

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
