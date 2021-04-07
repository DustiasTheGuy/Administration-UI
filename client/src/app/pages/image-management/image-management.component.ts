import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { StateService } from 'src/app/services/state.service';
import { IMAGE } from 'src/app/interfaces/image';

@Component({
  selector: 'app-image-management',
  templateUrl: './image-management.component.html',
  styleUrls: ['../page.scss', './image-management.component.scss']
})
export class ImageManagementComponent implements OnInit {
  public images: IMAGE[] = [];
  public dialogData?: IMAGE;

  constructor(
    private stateService: StateService,
    private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
    this.imageService.getImageUploadSubject()
    .subscribe((newUpload: IMAGE) => this.images.push(newUpload));
  }

  private emitAlert(err: boolean, msg: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: err,
      text: msg
    });
  }

  private getImages(): void {
    this.imageService.images()
    .subscribe((response: HTTPResponse) => response.success 
    ? this.images = response.data 
    : this.emitAlert(true, response.message));
  }

  public deleteImage(id: number): void {
    if(confirm('Confirm Delete')) {
      this.imageService.deleteOne(id)
      .subscribe(response => response.success ?
      (() => {
        this.emitAlert(false, response.message);
        this.images.splice(this.images.findIndex((img: IMAGE) => img.id === id), 1)
      })() : this.emitAlert(true, response.message));
    }
  }
}
