import { Component, OnInit } from '@angular/core';
import { PresentationDataService } from 'src/app/_services/presentation-data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TemplateService, Template } from 'src/app/_services/template.service';

@Component({
  selector: 'app-editor-presentation',
  templateUrl: './editor-presentation.component.html',
  styleUrls: ['./editor-presentation.component.css'],
})
export class EditorPresentationComponent implements OnInit {
  slides: { title: string; content: string[] }[] = [];
  currentSlide = 0;
  isExporting = false;
  templateStyles: { [key: string]: string } = {}; 
  history: any[] = [];
  

  showHistory = false;  // <-- propriété pour gérer l'affichage du modal
 selectedFontFamily: string = "Arial";
  titleFontSize: number = 24;
  contentFontSize: number = 16;
  constructor(
    private presentationDataService: PresentationDataService,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    this.slides = this.presentationDataService.getSlides();

    if (this.slides.length === 0) {
      console.warn('⚠️ Aucune slide disponible.');
    }

    const templateId = localStorage.getItem('selectedTemplateId');
    if (templateId) {
      this.templateService.get(+templateId).subscribe({
        next: (template: Template) => {
          if (template.styles) {
            if (typeof template.styles === 'string') {
              try {
                this.templateStyles = JSON.parse(template.styles);
              } catch (e) {
                console.error('❌ Erreur lors du parsing JSON de styles:', e);
                this.templateStyles = {};
              }
            } else if (typeof template.styles === 'object') {
              this.templateStyles = template.styles;
            } else {
              this.templateStyles = {};
            }
          } else {
            this.templateStyles = {};
          }
          console.log('✔️ Template CSS appliquée dynamiquement :', this.templateStyles);
        },
        error: (err) => {
          console.error('❌ Erreur récupération template :', err);
          this.templateStyles = {};
        },
      });
    }
    // Charger l'historique sauvegardé
    const savedPresentations = localStorage.getItem('savedPresentations');
    this.history = savedPresentations ? JSON.parse(savedPresentations) : [];
  }

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  selectSlide(index: number) {
    this.currentSlide = index;
  }

  addPoint() {
    if (this.slides[this.currentSlide]) {
      this.slides[this.currentSlide].content.push('');
    }
  }

  removePoint(index: number) {
    if (this.slides[this.currentSlide]) {
      this.slides[this.currentSlide].content.splice(index, 1);
    }
  }

  exportAsPDF() {
    const data = document.getElementById('presentationToExport');

    if (data) {
      this.isExporting = true;

      html2canvas(data).then((canvas) => {
        const imgWidth = 297;
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('presentation.pdf');
        this.isExporting = false;
      });
    } else {
      console.error("L'élément #presentationToExport n'a pas été trouvé !");
    }
  }

  savePresentation() {
    const savedPresentations = localStorage.getItem('savedPresentations');
    let history = savedPresentations ? JSON.parse(savedPresentations) : [];

    // Créer un objet présentation à sauvegarder
    const presentationToSave = {
      id: new Date().getTime(), // timestamp comme id unique
      slides: this.slides,
      templateStyles: this.templateStyles,
      savedAt: new Date().toISOString(),
    };

    history.push(presentationToSave);

    localStorage.setItem('savedPresentations', JSON.stringify(history));
    alert('Présentation sauvegardée avec succès !');
  }

  loadPresentation(id: number) {
    const savedPresentations = localStorage.getItem('savedPresentations');
    if (!savedPresentations) return;

    const history = JSON.parse(savedPresentations);
    const pres = history.find((p: any) => p.id === id);
    if (pres) {
      this.slides = pres.slides;
      this.templateStyles = pres.templateStyles;
      this.currentSlide = 0;
      alert('Présentation chargée !');
      this.toggleHistory();  // fermer popup après chargement
    }
  }
}
