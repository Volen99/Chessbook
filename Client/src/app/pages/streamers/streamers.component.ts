import {Component, OnInit} from '@angular/core';
import {flyInOut} from "../../router.animations";

@Component({
  selector: 'app-streamers',
  templateUrl: './streamers.component.html',
  styleUrls: ['./streamers.component.scss'],
  animations: [flyInOut()],
})
export class StreamersComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
