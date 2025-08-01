import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Importez StorageService avec le bon chemin
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isDarkMode = false;

  constructor(
    private router: Router,
    // Injectez StorageService
    private storageService: StorageService
  ) { }

  startCreation(): void {
    // Utilisez la méthode de StorageService pour vérifier la connexion
    if (this.storageService.isLoggedIn()) {
      // Si connecté, redirige vers le dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Si non connecté, redirige vers la page d'inscription
      this.router.navigate(['/login']);
    }
  }

  goToStart(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/create-presentation']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  
}
