import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private userService : UserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.userService.loggedInUser;
    if(currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization : `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
