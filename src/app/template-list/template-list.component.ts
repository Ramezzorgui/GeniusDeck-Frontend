import { Component, OnInit } from '@angular/core';
import { Template, TemplateService } from '../_services/template.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
})
export class TemplateListComponent implements OnInit {
  templates: Template[] = [];

  constructor(private service: TemplateService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.templates = data;
    });
  }

  deleteTemplate(id: number) {
    this.service.delete(id).subscribe(() => {
      this.templates = this.templates.filter(t => t.id !== id);
    });
  }

  viewTemplate(id: number) {
    this.router.navigate(['/templates', id]);
  }

  editTemplate(id: number) {
    this.router.navigate(['/templates/edit', id]);
  }
}
