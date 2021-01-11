import {Component, OnInit} from '@angular/core';
import {ServerService} from "../../core/server";
import {ServerStats} from "../models/server/server-stats.model";

@Component({
  selector: 'my-instance-statistics',
  templateUrl: './instance-statistics.component.html',
  styleUrls: ['./instance-statistics.component.scss']
})
export class InstanceStatisticsComponent implements OnInit {
  serverStats: ServerStats = null;

  constructor(
    private serverService: ServerService
  ) {
  }

  ngOnInit() {
    this.serverService.getServerStats()
      .subscribe(res => this.serverStats = res);
  }
}
