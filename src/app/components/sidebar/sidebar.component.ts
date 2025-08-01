import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements OnInit {
  
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    public router: Router
  ) {}
  isHomePage(): boolean {
    return this.router.url === '/home';
  }
  isLoginPage(): boolean {
  return this.router.url === '/login';
}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log('Utilisateur connecté depuis storage :', user);

      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.username = user.name || user.username || user.email;
    }

    // Écoute les événements logout (ex : token expiré)
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

   logout(): void {
  this.storageService.clean();
  window.location.reload();
}
}
