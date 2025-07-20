import { Component, OnInit } from '@angular/core';
import { GenerationHistoryService, GenerationHistory } from '../_services/generation-history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generation-history-list',
  templateUrl: './generation-history-list.component.html',
})
export class GenerationHistoryListComponent implements OnInit {
  histories: GenerationHistory[] = [];

  constructor(private service: GenerationHistoryService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.histories = data);
  }

  view(id: number): void {
    this.router.navigate(['/generation-history', id]);
  }

  edit(id: number): void {
    this.router.navigate(['/generation-history/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.service.delete(id).subscribe(() => this.ngOnInit());
    }
  }
}
