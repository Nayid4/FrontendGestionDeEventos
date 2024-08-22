import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProblemDetails } from '../models/problemDetails.model'; 

export const autenticacionInterceptor: HttpInterceptorFn = (req, next) => {
  const ruta = inject(Router);
  const servicioMensajes = inject(MessageService);

  console.log(req.url);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      
      if (error.error instanceof HttpErrorResponse) {
        errorMessage = `Error: ${error.error.message}`;
        servicioMensajes.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      } else if (error.error) {
        const problemDetails: ProblemDetails = error.error;

        if (problemDetails.title) {
          errorMessage = problemDetails.title;
        }

        if (problemDetails.errors) {
          for (const [key, messages] of Object.entries(problemDetails.errors)) {
            messages.forEach(message => {
              servicioMensajes.add({
                severity: 'error',
                summary: 'Error',
                detail: message
              });
            });
          }
        } else {
          errorMessage = `Codigo de Error: ${error.status}, Mensaje: ${error.message}`;
          servicioMensajes.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        }
      } else {
        errorMessage = `Codigo de Error: ${error.status}, Mensaje: ${error.message}`;
        servicioMensajes.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
