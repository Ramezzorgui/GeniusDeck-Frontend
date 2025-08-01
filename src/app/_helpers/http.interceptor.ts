import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('cloudinary.com')) {
    return next.handle(req);
  }
    const token = this.storageService.getToken();

    let authReq = req;
    
    // ✅ Ajouter le token si disponible
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // ✅ Gérer les erreurs 401 sauf sur /auth/signin
        if (
          error.status === 401 &&
          !req.url.includes('/auth/signin')
        ) {
          this.eventBusService.emit(new EventData('logout', null));
        }

        return throwError(() => error);
      })
    );
  }
}

// ✅ Fournisseur à inclure dans AppModule
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
