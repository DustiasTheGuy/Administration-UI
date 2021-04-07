import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { iAlert } from '../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private errorSubject = new Subject<iAlert>();  
  constructor() { }

  public setErrorSubject(newState: iAlert) {
    this.errorSubject.next(newState)
  }

  public getErrorSubject(): Observable<iAlert> {
    return this.errorSubject.asObservable();
  }

  public validateEmail(email: string): boolean {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }
}
