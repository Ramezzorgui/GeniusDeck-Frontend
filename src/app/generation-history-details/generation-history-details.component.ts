import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenerationHistoryService, GenerationHistory } from '../_services/generation-history.service';

@Component({
  selector: 'app-generation-history-details',
  templateUrl: './generation-history-details.component.html',
})
export class GenerationHistoryDetailsComponent implements OnInit {
  history?: GenerationHistory;

  constructor(private route: ActivatedRoute, private service: GenerationHistoryService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(id).subscribe(data => this.history = data);
  }
}
