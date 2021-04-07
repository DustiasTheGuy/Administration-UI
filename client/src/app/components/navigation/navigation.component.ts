import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public asideOpen: boolean = false;
  
  constructor(
    private router: Router,
    public stateService: StateService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.stateService.setErrorSubject({
      show: true,
      error: false,
      text: 'See you soon!'
    });
    this.authService.clearToken();
    this.asideOpen = false;
    this.router.navigate(["/sign-in"]);
  }
}
