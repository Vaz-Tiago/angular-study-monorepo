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

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.isFetching = true;
    this.postService
      .createAndStorePost(postData.title, postData.content)
      .subscribe(() => this.onFetchPosts());
  }

  onFetchPosts() {
    this.postService
      .fetchPosts()
      .subscribe((posts) => (this.loadedPosts = posts));
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
