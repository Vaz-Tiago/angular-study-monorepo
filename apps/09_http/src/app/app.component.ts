import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = true;
  error = null;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService
      .createAndStorePost(postData.title, postData.content)
      .subscribe(() => this.onFetchPosts());
  }

  onFetchPosts() {
    this.postService.fetchPosts().subscribe({
      next: (posts) => (this.loadedPosts = posts),
      error: (error) => (this.error = error.message),
    });
    this.isFetching = false;
  }

  onClearPosts() {
    this.isFetching = true;
    this.postService.deleteAllPosts().subscribe(() => {
      this.loadedPosts = [];
      this.isFetching = false;
    });
  }
}
