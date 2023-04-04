import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, map, catchError, throwError } from 'rxjs';

@Injectable()
export class PostService {
  private apiUrl = 'https://angular-study-request-default-rtdb.firebaseio.com';
  public error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const payload: Post = { title, content };
    this.http
      .post<{ name: string }>(`${this.apiUrl}/posts.json`, payload)
      .subscribe({
        next: (responseData) => console.log('responseData: ', responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  deleteAllPosts() {
    return this.http.delete(`${this.apiUrl}/posts.json`);
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(`${this.apiUrl}/posts.json`)
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
