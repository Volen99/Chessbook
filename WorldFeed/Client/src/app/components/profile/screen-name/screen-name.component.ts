import {Component, OnInit} from '@angular/core';

import {NewUsernameModel} from "../../../core/profile/models/new-username-model";
import {Validators, FormGroup, FormControl, FormBuilder, Form} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ConfigurationService} from "../../../core/shared-core/services/configuration.service";
import {SecurityService} from "../../../core/shared-core/services/security.service";

@Component({
  selector: 'app-profile-screen-name',
  templateUrl: './screen-name.component.html',
  styleUrls: ['./screen-name.component.css']
})
export class ScreenNameComponent implements OnInit {
  private http: HttpClient;
  // The FormBuilder provides syntactic sugar that shortens creating instances of a FormControl, FormGroup,
  // or FormArray. It reduces the amount of boilerplate needed to build complex forms.
  private fb: FormBuilder;

  constructor(http: HttpClient, fb: FormBuilder) {
    this.http = http;
    this.fb = fb;
  }

  public usernameForm: FormGroup;
  //   public usernameForm = new FormGroup({
  //     username: new FormControl('default value'),
  // });

  ngOnInit() {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const form = this.usernameForm.value;
  }
}
