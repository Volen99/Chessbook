import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public transform: number = 0;
  @Input() public hasText = false;
  @Input() public hasMedia = false;

  constructor() { }

  ngOnInit(): void {
  }


}
