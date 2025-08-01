import { Component, OnInit } from '@angular/core';
import { GenerationHistory, GenerationHistoryService } from 'src/app/_services/generation-history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  histories: GenerationHistory[] = [];

  constructor(private historyService: GenerationHistoryService) {}

  ngOnInit(): void {
    this.loadHistories();
  }

  loadHistories(): void {
    this.historyService.getAll().subscribe({
      next: (data) => this.histories = data,
      error: (err) => console.error('Erreur chargement historique:', err),
    });
  }

  deleteHistory(id: number): void {
    if (confirm('Supprimer cette entrée ?')) {
      this.historyService.delete(id).subscribe(() => {
        this.histories = this.histories.filter(h => h.id !== id);
      });
    }
  }
  loadPresentation(presentationId: number | undefined): void {
  if (!presentationId) return;

  // Redirige vers une page existante qui affiche cette présentation
  // Exemple : /presentation/123
  // Crée cette route si elle n'existe pas encore
  window.location.href = `/presentation/${presentationId}`;
}



}
