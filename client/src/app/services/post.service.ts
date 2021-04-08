import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config'
import { HTTPResponse } from '../interfaces/response';
import { PublishData, UpdatePostData } from '../interfaces/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private config: Config;
  public categories: string[] = [
    'Articles', 
    'News', 
    'Product Reviews', 
    'Guides', 
    'Uncategorized'
  ];
  

  constructor(private httpClient: HttpClient) {
    this.config = new Config('/api/post');
  }

  public publish(data: PublishData): Observable<HTTPResponse> {
    return this.httpClient.post<HTTPResponse>(`${this.config.serverAddr()}/publish`, data, 
    this.config.getHeaders());
  }

  public getAllPosts(): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/get-posts`,
    this.config.getHeaders());
  }

  public deleteOnePost(id: number): Observable<HTTPResponse> {
    return this.httpClient.delete<HTTPResponse>(`${this.config.serverAddr()}/delete-post/${id}`,
    this.config.getHeaders());
  }

  public updateOnePost(data: UpdatePostData): Observable<HTTPResponse> {
    return this.httpClient.put<HTTPResponse>(`${this.config.serverAddr()}/update-post`, data,
    this.config.getHeaders());
  }

  public getOnePost(id: number): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/get-post/${id}`,
    this.config.getHeaders());
  }
}
