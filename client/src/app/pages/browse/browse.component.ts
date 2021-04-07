import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { PostService } from 'src/app/services/post.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { POST } from 'src/app/interfaces/post';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss', '../page.scss']
})
export class BrowseComponent implements OnInit {
  public posts?: POST[];
  public loading: boolean = true;

  constructor(
    private stateService: StateService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private emitAlert(alert: string, err: boolean): void {
    this.stateService.setErrorSubject({
      show: true,
      text: alert,
      error: err
    });
  }

  private getAllPosts(): void {
    this.postService.getAllPosts()
    .subscribe((response: HTTPResponse) => response.success 
    ? (() => {
      this.posts = response.data;
      this.loading = false;
      console.log(response);
    })() : this.emitAlert(response.message, true));
  }
}
