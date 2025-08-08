import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// URL de ton API utilisateurs
const USERS_API_URL = 'https://geniusdeck-backend-production.up.railway.app/users';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  blocked: boolean;
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
    return this.http.get('https://geniusdeck-backend-production.up.railway.app/api/test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get('https://geniusdeck-backend-production.up.railway.app/api/test/user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get('https://geniusdeck-backend-production.up.railway.app/api/test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get('https://geniusdeck-backend-production.up.railway.app/api/test/admin', { responseType: 'text' });
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
  return this.http.put<User>(`https://geniusdeck-backend-production.up.railway.app/users/${id}`, user);
  }
  getUsersCount(): Observable<{ count: number }> {
      return this.http.get<{ count: number }>(`https://geniusdeck-backend-production.up.railway.app/users/count`);
    }
  getUserRolesCount(): Observable<{ [role: string]: number }> {
  return this.http.get<{ [role: string]: number }>('https://geniusdeck-backend-production.up.railway.app/users/roles-count');
}

getActiveUsersMonthly(): Observable<{labels: string[], data: number[]}> {
  return this.http.get<{labels: string[], data: number[]}>('https://geniusdeck-backend-production.up.railway.app/users/active-monthly');
}

updateImageUrl(userId: number, imageUrl: string) {
  return this.http.put(`https://geniusdeck-backend-production.up.railway.app/users/${userId}/image`, { imageUrl });
}
blockUser(id: number): Observable<any> {
  return this.http.put(`https://geniusdeck-backend-production.up.railway.app/api/admin/users/${id}/block`, {});
}

unblockUser(id: number): Observable<any> {
  return this.http.put(`https://geniusdeck-backend-production.up.railway.app/api/admin/users/${id}/unblock`, {});
}


}
