import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, RegisterData } from '../interfaces/forms';
import { HTTPResponse } from '../interfaces/response';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {
  private config: Config;

  constructor(private httpClient: HttpClient) {
    this.config = new Config();
  }


  public login(data: LoginData): Observable<HTTPResponse> {
    return this.httpClient.post<HTTPResponse>(`${this.config.serverAddr()}/login`, data);
  }

  public register(data: RegisterData): Observable<HTTPResponse> {
    return this.httpClient.post<HTTPResponse>(`${this.config.serverAddr()}/register`, data);
  }
}
