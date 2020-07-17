import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from '../../../core/shared-core/statistics/statistics.service';
import { Statistics } from '../statistics/statistics.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  statistics: Statistics;

  constructor(private statisticsService: StatisticsService, private router: Router) {

  }

  ngOnInit(): void {

  }
}
