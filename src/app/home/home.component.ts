import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }

    ngOnInit(): void {
       this.isLoggedIn = this.storageService.isLoggedIn();

  }



  startCreation(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
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
   selectTemplate(templateId: string): void {
    console.log('Template sélectionné :', templateId);
  }


}
