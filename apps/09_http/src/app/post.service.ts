import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, map, catchError, throwError, tap } from 'rxjs';

@Injectable()
export class PostService {
  private apiUrl = 'https://angular-study-request-default-rtdb.firebaseio.com';
  public error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const payload: Post = { title, content };
    this.http
      .post<{ name: string }>(`${this.apiUrl}/posts.json`, payload, {
        observe: 'response',
      })
      .subscribe({
        next: (responseData) => console.log('responseData: ', responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  deleteAllPosts() {
    return this.http
      .delete(`${this.apiUrl}/posts.json`, { observe: 'events' })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            console.log('HttpEventType.Sent', 'Sent, wait response');
          }
          if (event.type === HttpEventType.Response) {
            console.log('HttpEventType.Response', event.body);
          }
        })
      );
  }

  fetchPosts() {
    const headers = new HttpHeaders({ 'Custom-Header': 'Hello' });
    const params = new HttpParams()
      .set('print', 'pretty')
      .set('another', 'pretty');

    return this.http
      .get<{ [key: string]: Post }>(`${this.apiUrl}/posts.json`, {
        headers,
        params,
      })
      .pipe(map(this.pipeFormatPostData), catchError(this.pipeErrorHandler));
  }

  private pipeFormatPostData(responseData: { [key: string]: Post }): Post[] {
    const postArray: Post[] = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        postArray.push({ ...responseData[key], id: key });
      }
    }
    return postArray;
  }

  private pipeErrorHandler(error: any) {
    console.log('ErrorHandler: ', error);
    return throwError(() => new Error(error.message));
  }
}
