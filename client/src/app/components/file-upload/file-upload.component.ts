import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { HTTPResponse } from '../../interfaces/response';
import { StateService } from '../../services/state.service';
import { IMAGE } from '../../interfaces/image';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() post_id?: string;
  @Input() alone?: string;

  constructor(
    private stateService: StateService,
    private imageService: ImageService) {}

  ngOnInit(): void {
  }

  private emitAlert(err: boolean, msg: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: err,
      text: msg
    });
  }

  public newFiles(files: any): void {
    /*  
      Add files to a FormData object so they can be parsed by the server
    */ this.imageService.uploadImage(this.imageService.appendFiles(files, this.post_id, this.alone)) 
    .subscribe((response: HTTPResponse) => response.success 
    ? (() => {
      response.data.forEach((img: IMAGE) => this.imageService.setImageUploadSubject(img)); 
      // inform the state that new images have been uploaded
      // rather than performing another GET request
      this.emitAlert(false, response.message);
    })() : this.emitAlert(true, response.message));
  }
}
