import { Injectable } from '@angular/core';
import { Config } from './config';
import { HttpClient } from '@angular/common/http';
import { HTTPResponse } from 'src/app/interfaces/response';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private config: Config;

  constructor(private httpClient: HttpClient) {
    this.config = new Config('/api/users');
  }

  public one(): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/profile`,
    this.config.getHeaders())
  }

  public all(): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/get-users`,
    this.config.getHeaders())
  }

  public update(data: any): Observable<HTTPResponse> {
    return this.httpClient.put<HTTPResponse>(`${this.config.serverAddr()}/update-user`, data,
    this.config.getHeaders())
  }

  public delete(id: number): Observable<HTTPResponse> {
    return this.httpClient.delete<HTTPResponse>(`${this.config.serverAddr()}/delete-user/${id}`,
    this.config.getHeaders())
  }

  public oneWithEmail(email: string) {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/with/${email}`,
    this.config.getHeaders())
  }
} 
