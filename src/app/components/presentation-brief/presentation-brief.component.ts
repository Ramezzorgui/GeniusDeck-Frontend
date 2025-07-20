import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation-brief',
  templateUrl: './presentation-brief.component.html',
  styleUrls: ['./presentation-brief.component.css']
})
export class PresentationBriefComponent implements OnInit {
  briefForm!: FormGroup;

  durations = ['5min', '10min', '15min', '30min', 'Autre'];
  audiences = ['Étudiants', 'Collègues', 'Clients', 'Autre'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.briefForm = this.fb.group({
      title: [''],
      duration: [''],
      audience: [''],
      objective: [''],
      keyPoints: ['']
    });
  }

  onSubmit(): void {
    const briefData = this.briefForm.value;
    console.log('Brief envoyé :', briefData);

    // Ici tu appelleras le service Angular pour envoyer au backend
    // this.presentationService.createPresentation(briefData).subscribe(...)
  }
}
