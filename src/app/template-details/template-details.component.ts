import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template, TemplateService } from '../_services/template.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {
  template?: Template;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TemplateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(+id).subscribe((data) => (this.template = data));
    }
  }

  goBack(): void {
    this.router.navigate(['/templates']);
  }
}
