import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private apiUrl = 'https://angular-study-request-default-rtdb.firebaseio.com';
  loadedPosts = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ name: string }>(`${this.apiUrl}/posts.json`, postData)
      .subscribe((responseData) => console.log(responseData));
  }

  onFetchPosts() {
    this.fetchPosts();
  }
  onClearPosts() {}

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>(`${this.apiUrl}/posts.json`)
      .pipe(map(this.formatPostData))
      .subscribe((posts) => console.log(posts));
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
