import { Component, OnInit } from '@angular/core';
import { TemplateService, Template } from '../_services/template.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
})
export class TemplateListComponent implements OnInit {
  templates: Template[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private service: TemplateService, private router: Router) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.isLoading = true;
    this.service.getAll().subscribe({
      next: (data: Template[]) => {
        this.templates = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des templates.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  deleteTemplate(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce template ?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.templates = this.templates.filter(t => t.id !== id);
        },
        error: (err) => {
          alert("Échec de la suppression.");
          console.error(err);
        }
      });
    }
  }

  viewTemplate(id: number): void {
    this.router.navigate(['/templates', id]);
  }

  editTemplate(id: number): void {
    this.router.navigate(['/templates/edit', id]);
  }
}
