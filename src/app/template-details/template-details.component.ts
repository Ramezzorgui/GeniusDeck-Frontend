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
  parsedStructure: any = null;
  parsedStyles: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TemplateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(+id).subscribe((data) => {
        this.template = data;
        this.parseTemplate(data);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/templates']);
  }

  private parseTemplate(template: Template): void {
  try {
    const structureObj = JSON.parse(template.structure || '{}');
    if (Array.isArray(structureObj.sections)) {
      this.parsedStructure = structureObj;
    } else {
      this.parsedStructure = null;
    }
  } catch {
    this.parsedStructure = null;
  }

  try {
    const styleObj = JSON.parse(template.styles || '{}');
    this.parsedStyles = {
      color: styleObj.color || 'black',
      fontSize: styleObj.fontSize || '16px',
      backgroundColor: styleObj.backgroundColor || '#ffffff',
      fontFamily: styleObj.fontFamily || 'Poppins, sans-serif',
      padding: '30px',
      borderRadius: '8px'
    };
  } catch {
    this.parsedStyles = {};
  }
}

}
