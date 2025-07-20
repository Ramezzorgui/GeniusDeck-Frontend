import { Component, OnInit } from '@angular/core';
import { Template, TemplateService } from '../_services/template.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  form: Template = {
    name: '',
    category: '',
    structure: '',
    styles: '',
    isPublic: false
  };

  isEdit = false;

  constructor(
    private service: TemplateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.get(+id).subscribe((data) => (this.form = data));
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.form.id) {
      this.service.update(this.form.id, this.form).subscribe(() => {
        this.router.navigate(['/templates']);
      });
    } else {
      this.service.create(this.form).subscribe(() => {
        this.router.navigate(['/templates']);
      });
    }
  }
}
