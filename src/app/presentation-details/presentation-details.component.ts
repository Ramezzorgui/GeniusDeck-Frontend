import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Presentation, PresentationService } from '../_services/presentation.service';

@Component({
  selector: 'app-presentation-details',
  templateUrl: './presentation-details.component.html',
  styleUrls: ['./presentation-details.component.css']
})
export class PresentationDetailsComponent implements OnInit {
  presentation?: Presentation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PresentationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(+id).subscribe((data) => {
        this.presentation = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/presentations']);
  }
}
