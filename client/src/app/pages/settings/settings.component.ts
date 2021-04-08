import { Component, OnInit } from '@angular/core';
import { HTTPResponse } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../page.scss']
})
export class SettingsComponent implements OnInit {
  public user: User = {
    id: 0,
    email: '',
    created: new Date(),
    admin: 0
  };
  
  public loading: boolean = true;
  constructor(
    private stateService: StateService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.profile();
  }

  private emitAlert(err: boolean, msg: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: err,
      text: msg
    });
  }

  private profile(): void {
    this.userService.one()
    .subscribe((response: HTTPResponse) => response.success 
    ? this.user = response.data
    : this.emitAlert(true, response.message), (err) => 
    this.emitAlert(true, err), () => 
    this.loading = false);
  }
}