import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent {
  @Output() onSuccess = new EventEmitter<string>();
  @Input() user: User = {
    id: 0,
    email: '',
    created: new Date(),
    admin: 0
  };

  public editPassword: boolean = false;
  public newPassword: string = '';
  public confirmNewPassword: string = '';

  constructor(
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

  public update(): void {
    if(confirm('Confirm Update')) {
      this.user.admin = parseInt(this.user.admin.toString());

      this.userService.update({
        user: this.user,
        password: this.newPassword,
        confirmPassword: this.confirmNewPassword,
        updatePassword: this.editPassword
      }).subscribe((response: HTTPResponse) => response.success
      ? (() => {
        this.emitAlert(false, response.message);
        this.onSuccess.emit('Your account has been updated, please sign back in.')
      })()
      : this.emitAlert(true, response.message));
    }
  } 
}
