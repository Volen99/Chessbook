import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserToCreate} from '../../../../_interfaces/userToCreate.model';
import {HttpClient} from '@angular/common/http';
import {ScienceService} from '../science.service';
import {environment} from '../../../../../environments/environment';
import {SignalRScienceService} from '../signalR/signalR-science-service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-history-BC-science-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private http: HttpClient;
  private scienceService: ScienceService;
  private signalRScienceService: SignalRScienceService;
  private microservicePath: string = environment.historyBCSciencePost;

  public isCreate: boolean;
  public name: string;
  public user: UserToCreate;
  public response: {
    data: [{
      text: string;
      length: number;
      dbPaths: string,
    }],
  };
  constructor(http: HttpClient, scienceService: ScienceService, signalRScienceService: SignalRScienceService) {
    this.http = http;
    this.scienceService = scienceService;
    this.signalRScienceService = signalRScienceService;
  }

  ngOnInit(): void {
    // this.isCreate = true;
  }

  public onCreate = (text: string) => {
    this.user = {
      post: {
        text,
        medias: [],
      }
    };

    if (this.response) {
      for (const media of this.response.data) {
        this.user.post.medias.push(media);
      }
    }

    this.isCreate = false;
    this.scienceService.createText(text, this.user.post.medias[0]?.postId || null)
      .subscribe();
    // I am so fucking dumb!!!!!! 08.07.2020, Wednesday
    this.user.post.medias[0]?.postId = undefined;
  }

  // public returnToCreate = () => {
  //   this.isCreate = true;
  // }

  public uploadFinished = (event) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  }
}
