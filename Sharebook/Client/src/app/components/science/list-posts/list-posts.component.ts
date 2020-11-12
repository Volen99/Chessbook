import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {AppState} from '../../../store/app.state';
import {Observable} from 'rxjs';
import {ScienceService} from '../science.service';
import {PostModel} from "../../models/post.model";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-science-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css'],
})
export class ListPostsComponent implements OnInit {
  private store: Store<AppState>;

  private scienceService: ScienceService;
  private microservicePath: string = environment.identityApiUrl;

  constructor(store: Store<AppState>, scienceService: ScienceService) {
    this.store = store;
    this.scienceService = scienceService;
  }

  public token: string;
  public posts: Observable<PostModel[]>;

  ngOnInit(): void {
    // this.scienceService.getAllPosts().subscribe(() => {
    //   this.posts = this.store.pipe(select(state => state.posts.all));
    // });
  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  }
}
