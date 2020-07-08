import { Component, OnInit } from '@angular/core';
import {ScienceService} from '../science.service';
import {SignalRScienceService} from '../signalR/signalR-science-service';
import {environment} from '../../../../../environments/environment';
import {PostModel} from '../interfaces/post.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-history-BC-science-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  private scienceService: ScienceService;
  private signalRScienceService: SignalRScienceService;
  private microservicePath: string = environment.historyBCSciencePost;

  public token: string;
  public posts: Array<PostModel>;
  public lastPost: PostModel;

  constructor(scienceService: ScienceService, signalRService: SignalRScienceService) {
    this.scienceService = scienceService;
    this.signalRScienceService = signalRService;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getToken() {
    this.token = localStorage.getItem('token');
  }

  getPosts() {
    this.scienceService.getPosts()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  public postCreated = (event) => {
    alert('Inside postCreated()');
    this.getToken();
    this.signalRScienceService.subscribe();
    console.log(event);
    debugger;
    this.lastPost = event;
  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  }
}
