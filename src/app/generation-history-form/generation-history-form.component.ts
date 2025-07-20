import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerationHistoryService, GenerationHistory } from '../_services/generation-history.service';

@Component({
  selector: 'app-generation-history-form',
  templateUrl: './generation-history-form.component.html',
})
export class GenerationHistoryFormComponent implements OnInit {
  history: GenerationHistory = {
    prompt: '',
    response: '', 
    tokensUsed: 0,
    presentation: { id: 0 }
  };

  editMode = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GenerationHistoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.service.get(+id).subscribe(data => this.history = data);
    }
  }

  submitForm(): void {
    if (this.editMode) {
      this.service.update(this.history.id!, this.history).subscribe(() => this.router.navigate(['/generation-history']));
    } else {
      this.service.add(this.history).subscribe(() => this.router.navigate(['/generation-history']));
    }
  }
}
