import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { HTTPResponse } from './interfaces/response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    public authService: AuthService) {}

  ngOnInit() {
    this.profile();
  }
  
  private profile(): void {
    this.userService.one()
    .subscribe((response: HTTPResponse) => response.success 
    ? console.log('Session valid')
    : this.authService.signOut('your session has expired, pelase sign back in'))
  }
}
