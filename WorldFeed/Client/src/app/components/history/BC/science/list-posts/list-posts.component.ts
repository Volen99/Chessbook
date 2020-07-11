import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {SignalRScienceService} from '../../../../../core/history/BC/science/services/signalR-science-service';
import {environment} from '../../../../../../environments/environment';
import {PostModel} from '../../../../../core/history/BC/science/interfaces/post.model.';
import {AppState} from '../../../../../store/app.state';
import {Observable} from 'rxjs';
import {ScienceService} from '../../../../../core/history/BC/science/services/science.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-history-BC-science-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css'],
})
export class ListPostsComponent implements OnInit {
  private store: Store<AppState>;

  private scienceService: ScienceService;
  private signalRScienceService: SignalRScienceService;
  private microservicePath: string = environment.historyBCSciencePost;

  constructor(store: Store<AppState>, scienceService: ScienceService, signalRService: SignalRScienceService) {
    this.store = store;
    this.scienceService = scienceService;
    this.signalRScienceService = signalRService;
  }

  public token: string;
  public posts: Observable<PostModel[]>;
  public console: Console;

  ngOnInit(): void {
    this.scienceService.getAllPosts().subscribe(() => {
      this.posts = this.store.pipe(select(state => state.posts.all));
    });
  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  }
}
