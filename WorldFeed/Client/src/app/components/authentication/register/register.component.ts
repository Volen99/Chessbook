import { Component, OnInit } from '@angular/core';
import { RegisterModelForm } from '../../../core/authentication/register/register.model';
import { FormGroup, FormBuilder } from 'ngx-strongly-typed-forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Month} from '../../../core/shared-core/enums/month';
import {Gender} from '../../../core/authentication/enums/gender';
import {AuthenticationService} from '../../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup<RegisterModelForm>;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {

  }

  public gender = Object.keys(Gender).filter(type => {
    return isNaN(type as any) && type !== 'values';
  });

  public month = Object.keys(Month).filter(type => {
      return isNaN(type as any) && type !== 'values';
    }
  );

  public days = [];

  public years = [];

  ngOnInit(): void {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }

    for (let i = 1905; i <= 2020 ; i++) {
      this.years.push(i);
    }

    this.loginForm = this.fb.group<RegisterModelForm>({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthdayMonth: ['', Validators.required],
      birthdayDay: ['', Validators.required],
      birthdayYear: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  login() {
    const form = this.loginForm.value;
    const { firstName, lastName, email, password, birthdayMonth, birthdayDay, birthdayYear, gender } = form;
    const userData = { firstName, lastName, email, password, birthdayMonth, birthdayDay, birthdayYear, gender };

    // const { name, phoneNumber } = form;
    // const dealerData = { name, phoneNumber };

    this.authenticationService.register(userData).subscribe(res => {
      this.authenticationService.setToken(res['token']);
    })
  }
}
