import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMenuComponent } from '../../components/shared/navbar/login-menu/login-menu.component';
import { LoginComponent } from '../../components/authentication/login/login.component';
import { LogoutComponent } from '../../components/authentication/logout/logout.component';
import { RouterModule } from '@angular/router';
import { ApplicationPaths } from './api-authorization.constants';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(
      [
        { path: ApplicationPaths.Register, component: LoginComponent },
        { path: ApplicationPaths.Profile, component: LoginComponent },
        { path: ApplicationPaths.Login, component: LoginComponent },
        { path: ApplicationPaths.LoginFailed, component: LoginComponent },
        { path: ApplicationPaths.LoginCallback, component: LoginComponent },
        { path: ApplicationPaths.LogOut, component: LogoutComponent },
        { path: ApplicationPaths.LoggedOut, component: LogoutComponent },
        { path: ApplicationPaths.LogOutCallback, component: LogoutComponent }
      ]
    )
  ],
  declarations: [],
  exports: []
})
export class ApiAuthorizationModule { }
