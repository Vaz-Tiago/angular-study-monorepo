import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs';

@Injectable()
export class PostService {
  private apiUrl = 'https://angular-study-request-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const payload: Post = { title, content };
    this.http
      .post<{ name: string }>(`${this.apiUrl}/posts.json`, payload)
      .subscribe((response) => console.log(response));
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(`${this.apiUrl}/posts.json`)
      .pipe(map(this.formatPostData));
  }

  private formatPostData(responseData: { [key: string]: Post }): Post[] {
    const postArray: Post[] = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        postArray.push({ ...responseData[key], id: key });
      }
    }
    return postArray;
  }
}
