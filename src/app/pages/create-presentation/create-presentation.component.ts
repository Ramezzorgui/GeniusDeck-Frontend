import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PresentationService, Slide } from 'src/app/_services/presentation.service';
import { PresentationDataService } from 'src/app/_services/presentation-data.service';
import { TemplateService, Template } from 'src/app/_services/template.service';


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
    keyPoints: '',
    templateId:''
  };

  availableTemplates: Template[] = [];
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  generatedStructure: Slide[] = [];
  currentSlide: number = 0;

  constructor(
    private presentationService: PresentationService,
    private presentationDataService: PresentationDataService,
    private http: HttpClient,
    private router: Router,
    private templateService: TemplateService,
  ) {}

  // 📂 Gestion de sélection de fichier image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🚀 Envoi du formulaire
// Dans create-presentation.component.ts
onSubmit() {
  if (!this.presentation.templateId) {
    alert("Veuillez choisir un template.");
    return;
  }

  // ✅ AJOUTEZ CETTE LIGNE POUR STOCKER L'ID DE LA TEMPLATE
  localStorage.setItem('selectedTemplateId', this.presentation.templateId);
  console.log('Template ID stocké :', this.presentation.templateId); // Pour déboguer

  const formData = {
    subject: this.presentation.subject,
    duration: this.presentation.duration,
    audience: this.presentation.audience,
    goal: this.presentation.goal,
    keyPoints: this.presentation.keyPoints,
    templateId: this.presentation.templateId
  };

  this.presentationService.generateStructure(formData).subscribe({
    next: (structure: Slide[]) => {
      this.generatedStructure = structure;
      this.currentSlide = 0;
      this.presentationDataService.setSlides(structure);
      this.router.navigate(['/edit-presentation']);
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

  ngOnInit(): void {
  this.templateService.getAll().subscribe({
    next: (data) => (this.availableTemplates = data),
    error: (err) => console.error('❌ Erreur chargement templates :', err)
  });
}

}
