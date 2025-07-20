import { Component, OnInit } from '@angular/core';
import { PresentationService, Presentation } from '../_services/presentation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  presentations: Presentation[] = [];

  constructor(private service: PresentationService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllPresentationsForCurrentUser().subscribe((data: Presentation[]) => {
      this.presentations = data;
    });
  }

  deletePresentation(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.presentations = this.presentations.filter(p => p.id !== id);
    });
  }

  viewPresentation(id: number): void {
    this.router.navigate(['/presentations', id]);
  }

  editPresentation(id: number): void {
    this.router.navigate(['/presentations/edit', id]);
  }
}
