import { Component, OnInit } from '@angular/core';
import { PresentationDataService } from 'src/app/_services/presentation-data.service';

@Component({
  selector: 'app-editor-presentation',
  templateUrl: './editor-presentation.component.html',
  styleUrls: ['./editor-presentation.component.css'],
})
export class EditorPresentationComponent implements OnInit {
  slides: { title: string; content: string[] }[] = [];
  currentSlide = 0;

  constructor(private presentationDataService: PresentationDataService) {}

  ngOnInit(): void {
    // Charger les slides depuis le service partagé
    this.slides = this.presentationDataService.getSlides();

    // (Optionnel) Vérification si vide
    if (this.slides.length === 0) {
      // Rediriger ou afficher un message
      console.warn('⚠️ Aucune slide disponible.');
    }
  }

  selectSlide(index: number) {
    this.currentSlide = index;
  }

  addPoint() {
    this.slides[this.currentSlide].content.push('');
  }

  removePoint(index: number) {
    this.slides[this.currentSlide].content.splice(index, 1);
  }
}
