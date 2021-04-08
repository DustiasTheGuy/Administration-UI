import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../page.scss']
})
export class UsersComponent implements OnInit {
  public users?: User[];

  constructor(
    private router: Router,
    private userService: UserService) {}

  ngOnInit(): void {
    this.all();
  }

  private all(): void {
    this.userService.all()
    .subscribe((response: HTTPResponse) => this.users = response.data);
  }

  public navigate(user: User): void {
    localStorage.setItem('u_d', JSON.stringify(user));
    this.router.navigate(["/users/edit"]);
  }
}
