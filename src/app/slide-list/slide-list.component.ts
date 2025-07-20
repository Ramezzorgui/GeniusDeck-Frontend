import { Component, OnInit } from '@angular/core';
import { SlideService, Slide } from 'src/app/_services/slide.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
})
export class SlideListComponent implements OnInit {
  slides: Slide[] = [];

  constructor(private slideService: SlideService, private router: Router) {}

  ngOnInit(): void {
    this.loadSlides();
  }

  loadSlides() {
    this.slideService.getAll().subscribe(data => this.slides = data);
  }

  deleteSlide(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce slide ?')) {
      this.slideService.delete(id).subscribe(() => this.loadSlides());
    }
  }

  viewDetails(id: number) {
    this.router.navigate(['/slides/details', id]);
  }

  editSlide(id: number) {
    this.router.navigate(['/slides/edit', id]);
  }
}
