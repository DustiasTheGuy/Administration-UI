import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config'
import { HTTPResponse } from '../interfaces/response';
import { Observable, Subject } from 'rxjs';
import { IMAGE } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageUploadedSubject = new Subject<IMAGE>()
  private config: Config;

  constructor(private httpClient: HttpClient) {
    this.config = new Config();
  }

  public imgWithID(id: number): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/image/${id}`);
  }

  public images(): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/images`);
  }

  public uploadImage(files: FormData): Observable<HTTPResponse> {
    return this.httpClient.post<HTTPResponse>(`${this.config.serverAddr()}/users/upload`, files, 
    this.config.getHeaders())
  }

  public deleteOne(id: number): Observable<HTTPResponse> {
    return this.httpClient.delete<HTTPResponse>(`${this.config.serverAddr()}/users/delete-image/${id}`, 
    this.config.getHeaders())
  }

  public imageIDs(): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/users/image-ids`, 
    this.config.getHeaders())
  }

  public appendFiles(fileList: any, post_id?: string, alone?: string): FormData {
    let formData = new FormData();

    [...fileList].forEach((file: any) => 
    formData.append('file', file));
    formData.append('post_id', post_id || '0');
    formData.append('alone', alone || 'true');
    return formData;
  }  

  public getImageUploadSubject(): Observable<IMAGE> {
    return this.imageUploadedSubject.asObservable();
  }

  public setImageUploadSubject(image: IMAGE): void {
    this.imageUploadedSubject.next(image);
  }
}
