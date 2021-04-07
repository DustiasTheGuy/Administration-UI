import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { HTTPResponse } from '../../interfaces/response';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-server-management',
  templateUrl: './server-management.component.html',
  styleUrls: ['../page.scss', './server-management.component.scss']
})
export class ServerManagementComponent implements OnInit {
  public processes: any[] = [];

  constructor(
    private stateService: StateService,
    private serverService: ServerService) {}

  ngOnInit(): void {
    this.getProcesses();
  }

  emitAlert(show: boolean, msg: string, err: boolean): void {
    this.stateService.setErrorSubject({
      show: show,
      error: err,
      text: msg
    });
  }

  start(process: string): void {
    this.serverService.startProcess(process)
    .subscribe((response: HTTPResponse) => 
    response.success ? (() => {
      this.emitAlert(true, response.message, false);
      this.getProcesses();
    })() : this.emitAlert(true, response.message, true));
  }

  getProcesses(): void {
    this.serverService.getProcesses()
    .subscribe((response: HTTPResponse) => response.success 
    ? this.processes = response.data 
    : this.emitAlert(true, response.message, true));
  }

  kill(pid: number): void {
    this.serverService.stopProcess(pid)
    .subscribe((response: HTTPResponse) => 
    response.success ? (() => {
      this.getProcesses();
      this.emitAlert(true, response.message, false);
    })() : this.emitAlert(true, response.message, true));
  }
}
