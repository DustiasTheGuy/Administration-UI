import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { iAlert } from 'src/app/interfaces/alert';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public showNotifications: boolean = false;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.onNewNotification();
  }

  public onNewNotification(): void {
    this.stateService.getErrorSubject()
    .subscribe(newState => {
      newState.date = new Date();
      this.setNotification(newState);
    });
  }

  public getNotifications(): iAlert[] {
    let data = localStorage.getItem('n_l');
    if(data != null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  public setNotification(notification: iAlert): void {
    let notifications = this.getNotifications();

    notifications.push(notification);
    localStorage.setItem('n_l', JSON.stringify(notifications));
  }

  public removeNotification(index: number): void {
    console.log('Remove', index);
    let notifications = this.getNotifications();
    notifications.splice(index, 1);
    localStorage.setItem('n_l', JSON.stringify(notifications));
  }
}
