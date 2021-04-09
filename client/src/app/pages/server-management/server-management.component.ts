import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { HTTPResponse } from 'src/app/interfaces/response';
import { StateService } from 'src/app/services/state.service';
import { iServer } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-server-management',
  templateUrl: './server-management.component.html',
  styleUrls: ['../page.scss', './server-management.component.scss']
})
export class ServerManagementComponent implements OnInit {
  public processes: any[] = [];
  public servers: iServer[] = [
    { 
      serviceName: 'isak_tech', 
      serviceNameShort: 'IT', 
      position: {
        x: 100, 
        y: 200
      } 
    },
    {
       serviceName: 'portal', 
       serviceNameShort: 'PR', 
       position: {
        x: 200, 
        y: 400 
       }
    },
    { 
      serviceName: 'paste', 
      serviceNameShort: 'PS', 
      position: {
        x: 160,
        y: 342
      }
    }
  ];

  constructor(
    private stateService: StateService,
    private serverService: ServerService) {}

  ngOnInit(): void {
    this.getProcesses();
    this.parseOld();
  }

  private parseOld(): void {
    let data = localStorage.getItem('s_l');

    if(data != null) {
      this.servers = JSON.parse(data);
    }
  }

  private emitAlert(show: boolean, msg: string, err: boolean): void {
    this.stateService.setErrorSubject({
      show: show,
      error: err,
      text: msg
    });
  }

  public onDrop(data: any, index: number): void {
    this.servers[index].position.x += data.distance.x;
    this.servers[index].position.y += data.distance.y;
    localStorage.setItem('s_l', JSON.stringify(this.servers));
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
