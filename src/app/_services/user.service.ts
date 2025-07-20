import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// URL de ton API utilisateurs
const USERS_API_URL = 'http://localhost:8080/users';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Méthode pour récupérer la liste des utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_API_URL);
  }

  // Les autres méthodes que tu as déjà
  getPublicContent(): Observable<any> {
    return this.http.get('http://localhost:8080/api/test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get('http://localhost:8080/api/test/user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get('http://localhost:8080/api/test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get('http://localhost:8080/api/test/admin', { responseType: 'text' });
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
  return this.http.put<User>(`http://localhost:8080/users/${id}`, user);
}
}
