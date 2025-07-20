import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideService, Slide } from 'src/app/_services/slide.service';

@Component({
  selector: 'app-slide-details',
  templateUrl: './slide-details.component.html',
})
export class SlideDetailsComponent implements OnInit {
  slide?: Slide;

  constructor(private route: ActivatedRoute, private slideService: SlideService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.slideService.get(id).subscribe(data => this.slide = data);
  }
}
