import {Component, Input, OnInit} from '@angular/core';
import {StreamersService} from "./streamers.service";
import {IStreams, IStreamsData} from "./models/streams-model";

@Component({
  selector: 'app-streamers',
  templateUrl: './streamers.component.html',
  styleUrls: ['./streamers.component.scss']
})
export class StreamersComponent implements OnInit {

  constructor() {

  }


  ngOnInit(): void {

  }

}
