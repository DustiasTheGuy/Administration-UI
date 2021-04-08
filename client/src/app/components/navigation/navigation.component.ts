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

  public signOut(): void {
    this.authService.signOut('Good Bye!');
    this.asideOpen = false;
  }
}
