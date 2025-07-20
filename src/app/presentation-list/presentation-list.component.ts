import { Component, OnInit } from '@angular/core';
import { Presentation, PresentationService } from '../_services/presentation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css']
})
export class PresentationListComponent implements OnInit {
  presentations: Presentation[] = [];

  constructor(private service: PresentationService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.presentations = data;
    });
  }

  deletePresentation(id: number) {
    this.service.delete(id).subscribe(() => {
      this.presentations = this.presentations.filter(p => p.id !== id);
    });
  }

  viewPresentation(id: number) {
    this.router.navigate(['/presentations', id]);
  }

  editPresentation(id: number) {
    this.router.navigate(['/presentations/edit', id]);
  }
  navigateToCreate(): void {
    this.router.navigate(['/presentations/new']);
  }
  navigateToEdit(id: number): void {
    // Assurez-vous que votre routage contient une route comme '/presentations/edit/:id'
    this.router.navigate(['/presentations/edit', id]);
  }
}
