import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { POST } from 'src/app/interfaces/post';
import { HTTPResponse } from 'src/app/interfaces/response';
import { PostService } from 'src/app/services/post.service';
import { StateService } from 'src/app/services/state.service';
import { ImageService } from 'src/app/services/image.service';
import { IMAGE } from 'src/app/interfaces/image';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../../page.scss']
})
export class EditComponent implements OnInit {
  public post?: POST
  public categories: string[];
  public image?: IMAGE;
  public imageIDs?: number[];

  constructor(
    private router: Router,
    private imageService: ImageService,
    private stateService: StateService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute) {
      this.categories = this.postService.categories;
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => 
    this.getPost(params.id))

    this.imageService.getImageUploadSubject()
    .subscribe((newUpload: IMAGE) => this.post?.images.push(newUpload));

    this.getImageIDs();
  }

  private getPost(id: number): void {
    this.postService.getOnePost(id)
    .subscribe((response: HTTPResponse) => response.success 
    ? (() => {
      this.post = response.data;
      this.updateImage(this.post?.thumbnail || 1);
    })() 
    : this.stateService.setErrorSubject({ 
      show: true,
      error: true,
      text: response.message
    }));
  }

  public deleteImage(id: number, thumbnail: number): void {
    if(confirm('Confirm Delete')) {
      if(thumbnail > 0) {
        this.stateService.setErrorSubject({ 
          show: true,
          error: true,
          text: 'You cannot delete a thumbnail'
        });

        return;
      }

      this.imageService.deleteOne(id)
      .subscribe((response: HTTPResponse) => {
        this.post?.images.splice(this.post.images.findIndex(img => img.id === id), 1);
      })
    }
  }


  public updateImage(id: number): void {
    if(this.post != undefined) {
      this.post.thumbnail = parseInt(id.toString());
    } 
    
    this.imageService.imgWithID(id)
    .subscribe((response: HTTPResponse) => response.success
    ? this.image = response.data 
    : console.log('Not Available'));
  }


  private getImageIDs(): void {
    this.imageService.imageIDs()
    .subscribe((response: HTTPResponse) => response.success 
    ? (() => {
      this.imageIDs = response.data
      this.updateImage(response.data[0]);

    })() : this.emitAlert(true, response.message));
  }


  private emitAlert(err: boolean, msg: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: err,
      text: msg
    });
  }

  public update(): void {
    if(this.post != undefined) {
      this.post.archived = this.post?.archived ? 1 : 0;

      this.postService.updateOnePost({
        id: this.post.id,
        title: this.post.title,
        body: this.post.body,
        category: this.post.category,
        archived: this.post.archived,
        thumbnail: this.post.thumbnail
      }).subscribe((response: HTTPResponse) => response.success
      ? (() => {
        this.emitAlert(!response.success, response.message);
        setTimeout(() => this.router.navigate(["/browse"]), 5000);
      })()
      : this.emitAlert(!response.success, response.message));
    }
  }
}

/*

    id: number;
    title: string;
    body: string;
    category: string;
    archived: number;
    thumbnail: number;

*/