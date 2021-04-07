import { Component, OnInit } from '@angular/core';
import { HTTPResponse } from 'src/app/interfaces/response';
import { PublishData } from '../../interfaces/forms';
import { StateService } from '../../services/state.service';
import { PostService } from '../../services/post.service';
import { ImageService } from '../../services/image.service';
import { IMAGE } from '../../interfaces/image';
import { GTconfig } from '../../interfaces/interfaces';

declare let ml5: any;

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['../page.scss', './publish.component.scss']
})
export class PublishComponent implements OnInit {
  public formData: PublishData;
  public image?: IMAGE;
  public imageIDs?: number[];
  public categories: string[];
  public loading: boolean = false;

  constructor(
    private imageService: ImageService,
    private postService: PostService,
    private stateService: StateService) {
      this.formData = this.formDataInitial();
      this.categories = this.postService.categories;
  }

  ngOnInit(): void {
    this.getImageIDs();
  }

  public generateText(config: GTconfig): void {
    const rnn = ml5.charRNN('/assets/models/woolf');

    rnn.generate(config, (err: Error, results: any) => {
      switch(config.updateField) {
        case 't': return this.formData.title = results.sample.substring(2, results.sample.length);
        case 'b': return this.formData.body = results.sample.substring(2, results.sample.length);
        default: return;
      }
    });
  }

  private formDataInitial(): PublishData {
    return {
      title: '',
      category: 'Articles',
      thumbnail: 1,
      body: ''
    };
  }

  private emitAlert(err: boolean, msg: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: err,
      text: msg
    });
  }

  private getImageIDs(): void {
    this.imageService.imageIDs()
    .subscribe((response: HTTPResponse) => response.success 
    ? (() => {
      this.imageIDs = response.data
      this.updateImage(response.data[0]);

    })() : this.emitAlert(true, response.message));
  }

  public publish(): void {
    console.log('Sending:', this.formData);

    this.postService.publish(this.formData)
    .subscribe((response: HTTPResponse) => response.success 
    ? ((): void => {
        this.emitAlert(false, 'Post Has Been Published')
        this.formData = this.formDataInitial();
        this.loading = false;
    })() : this.emitAlert(true, response.message));
  }

  public updateImage(id: number): void {
    this.formData.thumbnail = parseInt(id.toString());
    console.log(this.formData);
    
    this.imageService.imgWithID(id)
    .subscribe((response: HTTPResponse) => response.success
    ? this.image = response.data 
    : console.log('Not Available'));
  }

  public autoFillForm(): void {    
    this.generateText({ 
      seed: 'A woman must have money and a room of her own if she is to write fiction.', 
      length: 60, 
      temperature: 0.5,
      updateField: 't' 
    });

    this.generateText({ 
      seed: 'Writing is like sex. First you do it for love, then you do it for your friends, and then you do it for money.', 
      length: 800, 
      temperature: 0.5, 
      updateField: 'b' 
    });
  }
}
