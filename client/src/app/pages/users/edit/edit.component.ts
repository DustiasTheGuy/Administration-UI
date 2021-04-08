import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../../page.scss']
})
export class EditUserComponent implements OnInit {
  public user?: User;

  constructor(
    private stateService: StateService,
    private router: Router) {}

  ngOnInit(): void {
    let data = localStorage.getItem('u_d');
    if(data != null) {
      this.user = JSON.parse(data);
      localStorage.removeItem('u_d');
    } else {
      this.router.navigate(['/users'])
    }
  }

  public onUpdate(str: string): void {
    this.stateService.setErrorSubject({
      show: true,
      error: false,
      text: `${this.user?.email} has been updated`
    });
    this.router.navigate(["/users"]);
  }
}
