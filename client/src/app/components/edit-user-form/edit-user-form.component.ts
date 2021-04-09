import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {
  @Output() onSuccess = new EventEmitter<string>();
  @Input() user: User = {
    id: 0,
    email: '',
    created: new Date(),
    admin: 0
  };

  private oldData?: User;
  public privileges: string = '0';
  public newData: any = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  public config: any = {
    editPassword: false
  };


  constructor(
    private stateService: StateService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.oldData = this.user;
    this.newData.email = this.user.email;
    this.privileges = this.oldData.admin.toString();
  }

  private emitAlert(err: boolean, msg: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: err,
      text: msg
    })
  }

  public update(): void {
    if(confirm('Confirm Account Update')) {

      let data = {
        oldData: this.oldData,
        newData: this.newData,
        config: this.config
      }

      this.userService.update(data)
      .subscribe((response: HTTPResponse) => response.success
      ? (() => {
        this.emitAlert(false, response.message);
        this.onSuccess.emit('Your account has been updated, please sign back in.')
      })()
      : this.emitAlert(true, response.message));
    }
  } 

  public updatePrivileges(): void {
    if(confirm('Confirm Privileges Update')) {
      console.log(parseInt(this.privileges));
    }
  }
}
