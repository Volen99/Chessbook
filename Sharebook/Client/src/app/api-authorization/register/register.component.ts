import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {RegisterPayload} from "./models/register-payload";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/css/site.css', './register.component.css']
})
export class RegisterComponent implements OnInit {
  private fb: FormBuilder;

  constructor(fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit(): void {
  }

  public registerPayload: RegisterPayload;

}
