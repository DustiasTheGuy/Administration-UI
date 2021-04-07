import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../interfaces/forms';
import { HTTPResponse } from '../../interfaces/response';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../page.scss', './login.component.scss']
})

export class LoginComponent implements OnInit {
  public formData: LoginData = { 
    email: '', 
    password: '' 
  };

  constructor(
    private router: Router,
    private stateService: StateService,
    private httpService: HTTPService, 
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  onSuccess(token: string): void {
    this.authService.setToken(token);
    this.stateService.setErrorSubject({
      show: true,
      error: false,
      text: 'You have been logged in'
    });
  }

  login() {
    this.httpService.login(this.formData)
    .subscribe((response: HTTPResponse) => {
      if(response.success) {
        this.onSuccess(response.data);
        this.router.navigate(["/"]);
      } else {
        console.log(response);
      }
    });
  }
}
