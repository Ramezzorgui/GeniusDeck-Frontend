import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Presentation, PresentationService } from '../_services/presentation.service'; // Vérifiez le chemin

@Component({
  selector: 'app-presentation-create',
  templateUrl: './presentation-create.component.html',
  styleUrls: ['./presentation-create.component.css']
})
export class PresentationCreateComponent implements OnInit {
  presentationForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  isEdit = false; // ✅ Ajoutez cette variable pour gérer le mode édition/création

  constructor(
    private fb: FormBuilder,
    private presentationService: PresentationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.presentationForm = this.fb.group({
      title: ['', Validators.required],
      description: [''], // ✅ Ajout de la description
      content: ['', Validators.required],
      settings: ['']    // ✅ Ajout des paramètres
    });

    // Logique pour le mode édition (si vous implémentez l'édition plus tard)
    // if (this.router.url.includes('/edit')) {
    //   this.isEdit = true;
    //   // Récupérer l'ID de l'URL et charger la présentation existante
    // }
  }

  // Getter pratique pour un accès facile aux contrôles du formulaire dans le template
  // Note: Avec formControlName, vous n'avez plus besoin d'accéder via form.controlName.value
  // mais directement via presentationForm.get('controlName')?.value
  get form() {
    return this.presentationForm.controls;
  }

  onSubmit(): void {
    if (this.presentationForm.invalid) {
      // Marque tous les champs comme 'touched' pour afficher les messages d'erreur
      this.presentationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const presentationData: Presentation = {
      title: this.presentationForm.get('title')?.value || '',
      description: this.presentationForm.get('description')?.value || '',
      content: this.presentationForm.get('content')?.value || '',
      settings: this.presentationForm.get('settings')?.value || ''
    };

    this.presentationService.create(presentationData).subscribe({
      next: (newPresentation) => {
        this.isLoading = false;
        alert('Présentation créée avec succès !');
        // Redirige vers le dashboard après la création/génération
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Une erreur est survenue lors de la création.';
        console.error(err);
      }
    });
  }
}
