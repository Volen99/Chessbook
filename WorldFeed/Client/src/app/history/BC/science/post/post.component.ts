import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScienceService} from '../science.service';
import {environment} from '../../../../../environments/environment';
import {SignalRScienceService} from '../signalR/signalR-science-service';
import {Post} from '../interfaces/post';
import {AppState} from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import {AddPost} from '../../../../store/posts/actions/posts.actions';
import {MediaModel} from '../interfaces/media.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-history-BC-science-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Output() public OnPostCreated = new EventEmitter<Array<Post>>();

  private store: Store<AppState>;

  private http: HttpClient;
  private scienceService: ScienceService;
  private signalRScienceService: SignalRScienceService;
  private microservicePath: string = environment.historyBCSciencePost;

  public isCreate: boolean;
  public name: string;
  public response: {
    data: [{
      text: string;
      length: number;
      paths: string,
    }],
  };

  constructor(store: Store<AppState>, http: HttpClient, scienceService: ScienceService, signalRScienceService: SignalRScienceService) {
    this.store = store;
    this.http = http;
    this.scienceService = scienceService;
    this.signalRScienceService = signalRScienceService;
  }

  public post: Post;

  ngOnInit(): void {
  }

  addPost(text: string) {
    this.post = {
      text,
      media: [],
    };

    if (this.response) {
      for (const media of this.response.data) {
        this.post.media.push(media);
      }
    }


    this.isCreate = false;

    this.scienceService.createText(text, this.post.media[0]?.postId || null).subscribe(); // TODO: image.postId bug

    this.store.dispatch(new AddPost(this.post));

    this.scienceService.getAllPosts().subscribe(); // TODO: this is just for test!!

    //debugger;
    // this.user.post.medias[0]?.postId = undefined;
  }


  // public returnToCreate = () => {
  //   this.isCreate = true;
  // }

  public uploadFinished = (event) => {
    this.response = event;
  };

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  };
}

// I am so fucking dumb!!!!!! 08.07.2020, Wednesday
