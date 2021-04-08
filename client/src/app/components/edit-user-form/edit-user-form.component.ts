import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { StateService } from 'src/app/services/state.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {
  public editPassword: boolean = false;
  public newPassword: string = '';
  public confirmNewPassword: string = '';

  @Input() user: User = {
    id: 0,
    email: '',
    created: new Date(),
    admin: 0
  };

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private userService: UserService
  ) {}

  private emitAlert(err: boolean, msg: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: err,
      text: msg
    })
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  public update(): void {
    this.user.admin = parseInt(this.user.admin.toString());

    this.userService.update({
      user: this.user,
      password: this.newPassword,
      confirmPassword: this.confirmNewPassword,
      updatePassword: this.editPassword
    })
    .subscribe((response: HTTPResponse) => response.success
    ? (() => {
      this.emitAlert(false, response.message);
      this.authService.signOut('Your account has been updated, please sign back in.');
    })()
    : this.emitAlert(true, response.message));
  }
}
