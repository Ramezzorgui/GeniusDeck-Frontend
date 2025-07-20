import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PresentationService, Slide } from 'src/app/_services/presentation.service';
import { PresentationDataService } from 'src/app/_services/presentation-data.service';

@Component({
  selector: 'app-create-presentation',
  templateUrl: './create-presentation.component.html',
  styleUrls: ['./create-presentation.component.css']
})
export class CreatePresentationComponent {
  // 🧩 Formulaire lié à ces propriétés
  presentation = {
    subject: '',
    duration: '',
    audience: '',
    goal: '',
    keyPoints: ''
  };

  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  generatedStructure: Slide[] = [];
  // Index slide courant pour diaporama
  currentSlide: number = 0;

  constructor(
    private presentationService: PresentationService,
    private presentationDataService: PresentationDataService,
    private http: HttpClient,
    private router: Router
  ) {}

  // 📂 Gestion de sélection de fichier image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🚀 Envoi du formulaire
onSubmit() {
    const formData = { /* ... */ };

    this.presentationService.generateStructure(formData).subscribe({
      // Le type de 'structure' est maintenant explicitement ApiSlide[]
      next: (structure: Slide[]) => {
        // Cette assignation est maintenant correcte et cohérente
        this.generatedStructure = structure;
        this.currentSlide = 0;

        // L'appel au service est maintenant valide car 'structure' a le bon type
        this.presentationDataService.setSlides(structure);
        console.log('✅ Structure générée et passée au service :', structure);

        // Le reste de votre logique...
        if (this.selectedFile) {
          this.saveImageAndRedirect();
        } else {
          this.router.navigate(['/edit-presentation']);
        }
      },
      error: (err) => console.error('❌ Erreur génération :', err)
    });
  }
  // Upload puis redirection
  saveImageAndRedirect() {
    const data = new FormData();
    data.append('image', this.selectedFile!);

    this.http
      .post<{ filename: string }>(
        'http://localhost:8080/api/presentations/upload-image',
        data
      )
      .subscribe({
        next: (res) => {
          this.uploadedImageUrl = `http://localhost:8080/uploads/${res.filename}`;
          console.log('Image enregistrée :', this.uploadedImageUrl);
          this.router.navigate(['/edit-presentation']); // rediriger une fois l'image uploadée
        },
        error: (err) => console.error('Erreur image :', err)
      });
  }

  // Gestion du diaporama
  nextSlide() {
    if (this.currentSlide < this.generatedStructure.length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}
