import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class LoggerInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Outgoing Request');
    console.log('URL: ', req.urlWithParams);

    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Income Response');
          console.log('STATUS: ', event.status);
        }
      })
    );
  }
}
