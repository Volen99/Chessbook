import {Observable} from 'rxjs';
import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MiniatureDisplayOptions} from './video-miniature.component';
import {User} from "../shared-main/user/user.model";
import {ComponentPagination} from "../../core/rest/component-pagination.model";
import {AbstractPostList} from "./abstract-post-list";
import {PostSortField} from '../posts/models/post-sort-field.type';
import {ResultList} from "../models";
import {Post} from "../shared-main/post/post.model";
import {SharebookTemplateDirective} from "../shared-main/angular/directives/sharebook-template.directive";
import {ScreenService} from "../../core/wrappers/screen.service";
import {LocalStorageService} from "../../core/wrappers/storage.service";
import {ServerService} from "../../core/server/server.service";
import {NbToastrService} from 'app/sharebook-nebular/theme/components/toastr/toastr.service';
import {InitUserService} from 'app/theme/services/init-user.service';
import {UserStore} from 'app/core/stores/user.store';
import {UsersService} from 'app/core/backend/common/services/users.service';

export type SelectionType = { [id: number]: boolean };

@Component({
  selector: 'my-videos-selection',
  templateUrl: './videos-selection.component.html',
  styleUrls: ['./videos-selection.component.scss']
})
export class VideosSelectionComponent extends AbstractPostList implements OnInit, OnDestroy, AfterContentInit {
  @Input() user: User;
  @Input() pagination: ComponentPagination;
  @Input() titlePage: string;
  @Input() miniatureDisplayOptions: MiniatureDisplayOptions;
  @Input() noResultMessage = `No results.`;
  @Input() enableSelection = true;
  @Input() loadOnInit = true;

  @Input() getVideosObservableFunction: (page: number, sort?: PostSortField) => Observable<ResultList<Post>>;

  @ContentChildren(SharebookTemplateDirective) templates: QueryList<SharebookTemplateDirective<'rowButtons' | 'globalButtons'>>;

  @Output() selectionChange = new EventEmitter<SelectionType>();
  @Output() videosModelChange = new EventEmitter<Post[]>();

  _selection: SelectionType = {};

  rowButtonsTemplate: TemplateRef<any>;
  globalButtonsTemplate: TemplateRef<any>;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected notifier: NbToastrService,
    protected screenService: ScreenService,
    protected storageService: LocalStorageService,
    protected serverService: ServerService,
    protected cfr: ComponentFactoryResolver,
    protected initCurrentUser: InitUserService,
    protected userStore: UserStore,
    protected usersService: UsersService,
  ) {
    super();
  }

  @Input() get selection() {
    return this._selection;
  }

  set selection(selection: SelectionType) {
    this._selection = selection;
    this.selectionChange.emit(this._selection);
  }

  @Input() get videosModel() {
    return this.posts;
  }

  set videosModel(videos: Post[]) {
    this.posts = videos;
    this.videosModelChange.emit(this.posts);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterContentInit() {
    {
      const t = this.templates.find(t => t.name === 'rowButtons');
      if (t) this.rowButtonsTemplate = t.template;
    }

    {
      const t = this.templates.find(t => t.name === 'globalButtons');
      if (t) this.globalButtonsTemplate = t.template;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  getVideosObservable(page: number) {
    return this.getVideosObservableFunction(page, this.sort);
  }

  abortSelectionMode() {
    this._selection = {};
  }

  isInSelectionMode() {
    return Object.keys(this._selection).some(k => this._selection[k] === true);
  }

  generateSyndicationList() {
    throw new Error('Method not implemented.');
  }

  protected onMoreVideos() {
    this.videosModel = this.posts;
  }

  getPostsObservable(page: number): Observable<{ data: Post[] }> {
    return undefined;
  }
}
