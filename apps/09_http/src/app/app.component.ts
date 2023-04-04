import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = true;
  error = null;
  private errorSub: Subscription;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.errorSub = this.postService.error.subscribe(
      (errorMessage) => (this.error = errorMessage)
    );

    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
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

  onErrorHandler() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
