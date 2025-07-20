import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlideService, Slide } from 'src/app/_services/slide.service';

@Component({
  selector: 'app-slide-form',
  templateUrl: './slide-form.component.html',
})
export class SlideFormComponent implements OnInit {
  slide: Slide = {
    title: '',
    content: '',
    layout: '',
    position: 0,
    presentation: { id: 0 }
  };
  isEditMode = false;

  constructor(
    private slideService: SlideService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.isEditMode = true;
    this.slideService.get(+id).subscribe(data => {
      this.slide = {
        ...data,
        presentation: data.presentation ?? { id: 0 } // sécurise l'accès
      };
    });
  }
}

  submitForm(): void {
    if (this.isEditMode) {
      this.slideService.update(this.slide.id!, this.slide).subscribe(() => {
        this.router.navigate(['/slides']);
      });
    } else {
      this.slideService.add(this.slide).subscribe(() => {
        this.router.navigate(['/slides']);
      });
    }
  }
}
