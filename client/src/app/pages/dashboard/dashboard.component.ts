import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { chartConfig } from './chart-config';
import { UserService } from 'src/app/services/user.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../page.scss']
})
export class DashboardComponent implements OnInit {
  public charts: EChartsOption[] = chartConfig;
  public user?: User;

  constructor(
    public authService: AuthService,
    public userService: UserService) {}

  ngOnInit(): void {
    this.profile();
  }

  private profile(): void {
    this.userService.one()
    .subscribe((response: HTTPResponse) => response.success
    ? this.user = response.data
    : this.authService.signOut('your session has expired'));
  }
}
