import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedPosts = [];
  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
  }
  onFetchPosts() {}
  onClearPosts() {}
}
