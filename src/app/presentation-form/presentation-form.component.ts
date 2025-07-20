import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PresentationService, Presentation, PresentationGenerateRequest } from '../_services/presentation.service';

@Component({
  selector: 'app-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css']
})
export class PresentationFormComponent implements OnInit {
  presentationForm: FormGroup;
  isEdit = false;
  isLoading = false;
  errorMessage = '';
  presentationId?: number;

  constructor(
    private fb: FormBuilder,
    private presentationService: PresentationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.presentationForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.presentationId = +params['id'];
        this.loadPresentation(this.presentationId);
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      content: ['', [Validators.required, Validators.minLength(10)]],
      settings: ['']
    });
  }

  private loadPresentation(id: number): void {
    this.isLoading = true;
    this.presentationService.get(id).subscribe({
      next: (presentation: Presentation) => {
        this.presentationForm.patchValue({
          title: presentation.title,
          description: presentation.description || '',
          content: presentation.content || '',
          settings: presentation.settings || ''
        });
        this.isLoading = false;
      },
      error: (error: string) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.presentationForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formValue = this.presentationForm.value;

      if (this.isEdit && this.presentationId) {
        this.updatePresentation(formValue);
      } else {
        this.generateNewPresentation(formValue);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

private generateNewPresentation(formValue: any): void {
  const request: PresentationGenerateRequest = {
    title: formValue.title,
    content: formValue.content,
    description: formValue.description || undefined,
    settings: formValue.settings || undefined
  };

  this.presentationService.generatePresentation(request).subscribe({
    next: (presentation: Presentation) => {
      console.log('Présentation générée avec succès:', presentation);
      
      // Solution temporaire : rediriger vers la liste des présentations
      this.router.navigate(['/presentations'], { 
        queryParams: { 
          success: `Présentation "${presentation.title}" générée avec succès! (ID: ${presentation.id})` 
        } 
      });
      
      // Plus tard, quand vous aurez créé l'interface d'édition :
      // this.router.navigate(['/presentations', presentation.id, 'edit']);
    },
    error: (error: string) => {
      this.errorMessage = error;
      this.isLoading = false;
    }
  });
}

  private updatePresentation(formValue: any): void {
    if (this.presentationId) {
      const presentation: Presentation = {
        title: formValue.title,
        description: formValue.description,
        content: formValue.content,
        settings: formValue.settings
      };

      this.presentationService.update(this.presentationId, presentation).subscribe({
        next: (updatedPresentation: Presentation) => {
          console.log('Présentation mise à jour:', updatedPresentation);
          this.router.navigate(['/presentations']);
        },
        error: (error: string) => {
          this.errorMessage = error;
          this.isLoading = false;
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.presentationForm.controls).forEach(key => {
      const control = this.presentationForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.presentationForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.presentationForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `Le ${fieldName} est requis.`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Le ${fieldName} doit contenir au moins ${requiredLength} caractères.`;
      }
    }
    return '';
  }
}
