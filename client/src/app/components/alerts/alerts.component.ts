import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { iAlert } from '../../interfaces/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class ErrorComponent implements OnInit {
  private alertStore: iAlert[] = [];

  public alert: iAlert = {
    show: false,
    error: false,
    text: 'Some not very important information',
    date: new Date()
  };

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.getErrorSubject()
    .subscribe(newState => {
      this.alertStore.push(this.alert);
      newState.date = new Date();
      this.alert = newState;
    });
  }
}
