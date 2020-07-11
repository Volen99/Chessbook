import {Component, OnInit, Output, EventEmitter, resolveForwardRef} from '@angular/core';
import {Validators} from '@angular/forms';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {LoginFormModel} from '../../../core/authentication/login/login.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterExtService} from 'src/app/core/shared/services/rouer-ext.service';
import {AuthenticationService} from '../../../core/services/authentication/authentication.service';
import {CurrentUserService} from '../../../core/shared/services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private currentUserService: CurrentUserService;

  loginForm: FormGroup<LoginFormModel>;
  returnUrl: string;
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private routerService: RouterExtService, currentUserService: CurrentUserService) {
    this.currentUserService = currentUserService;
    if (localStorage.getItem('token')) {
      this.router.navigate(['home']); // home was written by me.
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.loginForm = this.fb.group<LoginFormModel>({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authenticationService.login(this.loginForm.value).subscribe(res => {
      this.authenticationService.setToken(res['token']);

      this.currentUserService.user = res; // TODO: Fix it in the near future kk
    });

    this.router.navigate(['/']);
  }
}
