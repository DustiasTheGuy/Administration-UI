import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTPResponse } from '../interfaces/response';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private config: Config;

  constructor(private httpClient: HttpClient) {
    this.config = new Config('/users');
  }


  public getProcesses(): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/get-processes`, this.config.getHeaders());
  }

  public stopProcess(pid: number): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/stop/${pid}`, this.config.getHeaders());
  }

  public startProcess(service: string): Observable<HTTPResponse> {
    return this.httpClient.get<HTTPResponse>(`${this.config.serverAddr()}/start/${service}`, this.config.getHeaders());
  }
}