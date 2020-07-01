import { Component, OnInit } from '@angular/core';
import { GetFromGithubService} from './get-from-github.service';

@Component({
  selector: 'app-get-from-github',
  templateUrl: './get-from-github.component.html',
  styleUrls: ['./get-from-github.component.css'],
  providers: [GetFromGithubService],
})
export class GetFromGithubComponent implements OnInit {
  private getFromGithubService: GetFromGithubService;
  public profile: Object;

  constructor(getFromGithubService: GetFromGithubService) {
    this.getFromGithubService = getFromGithubService;
  }

  ngOnInit(): void {

  }

  getFromGithub(profile: string) {
    const result = this.getFromGithubService.getProfileFromGithub(profile)
      .subscribe(data => console.log(this.profile = data));

    console.log(result);
  }

}
