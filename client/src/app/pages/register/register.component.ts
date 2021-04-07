import { Component } from '@angular/core';
import { RegisterData } from '../../interfaces/forms';
import { HTTPService } from '../../services/http.service';
import { StateService } from '../../services/state.service';
import { HTTPResponse } from '../../interfaces/response';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../page.scss', './register.component.scss']
})
export class RegisterComponent {
  public formData: RegisterData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpService: HTTPService, 
    private stateService: StateService) {}
  
  private emitAlert(msg: string, show: boolean, err: boolean): void {
    this.stateService.setErrorSubject({
      show: show,
      error: err,
      text: msg
    });
  }

  private trimData(): RegisterData {
    return {
      email: this.formData.email.trim(),
      password: this.formData.password.trim(),
      confirmPassword: this.formData.confirmPassword.trim()
    };
  }

  private login(): void {
    this.httpService.login({ 
      email: this.formData.email, 
      password: this.formData.password 
    }).subscribe((response: HTTPResponse) => 
      response.success ? (() => {
        this.emitAlert('You have been signed in!', true, false);
        this.authService.setToken(response.data);
        this.router.navigate(["/"]);
      })() : this.emitAlert(response.message, true, true));
  }

  register(): void {
    if(this.formData.password.trim() != this.formData.confirmPassword.trim()) 
      return this.emitAlert('password to do not match', true, true);
    else if(!this.stateService.validateEmail(this.formData.email)) 
      return this.emitAlert('invalid email', true, true);
    else if(this.formData.password.length <= 10) 
      return this.emitAlert('password must be at least 10 characters', true, true);
    else
      this.emitAlert('', false, false);
      this.httpService.register(this.trimData())
      .subscribe((response: HTTPResponse) => 
      response.success ? this.login() : this.emitAlert(response.message, true, true));
  }
}
