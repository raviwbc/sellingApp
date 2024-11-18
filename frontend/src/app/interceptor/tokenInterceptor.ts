import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add an authorization header
    const authToken = localStorage.getItem('BidingAppToken')
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass the cloned request instead of the original request to the next handler
    return next.handle(authReq).pipe(
      catchError((error) =>{
        let errorMessage = 'An unknown error occurred!'
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          switch(error.status){
            case 401 : 
            errorMessage = 'Unauthorized access - please log in again.';
            this.router.navigate(['/login']);
            break;
            case 403:
              errorMessage = 'Forbidden - you do not have permission.';
              break;
            case 404:
              errorMessage = 'Resource not found.';
              break;
            case 500:
              errorMessage = 'Server error - please try again later.';
              break;
            default:
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
