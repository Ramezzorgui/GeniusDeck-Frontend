import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  clean(): void {
    window.sessionStorage.clear();
    this.currentUserSubject.next(null);
  }

  public saveUser(user: any): void {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    return this.getUser() != null;
  }

  public saveToken(token: string): void {
    window.sessionStorage.setItem('auth-token', token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('auth-token');
  }
}
