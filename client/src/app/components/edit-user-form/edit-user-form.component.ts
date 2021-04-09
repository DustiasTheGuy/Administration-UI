import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { StateService } from 'src/app/services/state.service';
import { UserInitial, NewDataInitial, ConfigInitial } from './utils';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {
  @Output() onSuccess = new EventEmitter<string>(); // will be sent when the update method was successful
  @Input() user: User = UserInitial(); // the user that is being modified
  public newData: any = NewDataInitial(); // new data 
  public config: any = ConfigInitial(); // any config 
  public privileges: string = '0'; // data binding prop
  private oldData?: User; // the initial value when the component is loaded

  constructor(private stateService: StateService, private userService: UserService) {}

  ngOnInit(): void {
    this.oldData = this.user;
    this.newData.email = this.user.email;

     /* 
        set as string because the <select> converts
        the number to a string and then it can't be passed as an argument
        to the parseInt() function because the interface
        is of type number 
     */ this.privileges = this.oldData.admin.toString();
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
      this.userService.update({
        oldData: this.oldData,
        newData: this.newData,
        config: this.config
      }).subscribe((response: HTTPResponse) => response.success
      ? (() => {
        this.emitAlert(false, response.message);
        this.onSuccess.emit('Your account has been updated, please sign back in.')
      })() : this.emitAlert(true, response.message));
    }
  } 

  public updatePrivileges(): void {
    if(confirm('Confirm Privileges Update')) {
      this.userService.setAdmin({
        admin: parseInt(this.privileges),
        email: this.oldData?.email
      }).subscribe((response: HTTPResponse) => 
      response.success 
      ? this.emitAlert(false, response.message)
      : this.emitAlert(true, response.message));
    }
  }
}
