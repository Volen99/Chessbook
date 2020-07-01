import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input('queryString') queryString;
  constructor() { }

  ngOnInit(): void {
  }

  // changePage() {
  //   // this.carService.search(this.queryString).subscribe(res => {
  //   //   this.emitter.emit(res);
  //   }
  // }

}
