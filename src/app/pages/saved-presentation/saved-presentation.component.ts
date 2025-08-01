import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-presentations',
  templateUrl: './saved-presentation.component.html',
  styleUrls: ['./saved-presentation.component.css']
})
export class SavedPresentationsComponent implements OnInit {
  savedPresentations: any[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('savedPresentations');
    this.savedPresentations = stored ? JSON.parse(stored) : [];
  }

  loadPresentation(presentation: any) {
    // Redirection ou affichage selon ton app
    localStorage.setItem('currentPresentation', JSON.stringify(presentation));
    // Exemple : redirection vers l'éditeur avec une route
    window.location.href = '/editor'; // Ou utilise Router si configuré
  }

  deletePresentation(index: number) {
    this.savedPresentations.splice(index, 1);
    localStorage.setItem('savedPresentations', JSON.stringify(this.savedPresentations));
  }
}
