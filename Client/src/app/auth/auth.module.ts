import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthPipe } from './auth.pipe';
import { RoleProvider } from './role.provider';

import {
  NgxLoginComponent,
  NgxAuthComponent,
  NgxAuthBlockComponent,
  NgxLogoutComponent,
  NgxRegisterComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
} from './components';


import { AuthRoutingModule } from './auth-routing.module';
import { authOptions } from './auth.settings';
import { authSettings } from './access.settings';
import {NbIconModule} from "../sharebook-nebular/theme/components/icon/icon.module";
import {NbLayoutModule} from "../sharebook-nebular/theme/components/layout/layout.module";
import {NbCardModule} from "../sharebook-nebular/theme/components/card/card.module";
import {NbAlertModule} from "../sharebook-nebular/theme/components/alert/alert.module";
import {NbCheckboxModule} from "../sharebook-nebular/theme/components/checkbox/checkbox.module";
import {NbInputModule} from "../sharebook-nebular/theme/components/input/input.module";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {ComponentsModule} from "../components/components.module";
import {NbSecurityModule} from "../sharebook-nebular/security/security.module";
import {NbRoleProvider} from "../sharebook-nebular/security/services/role.provider";
import {NbAuthModule} from "../sharebook-nebular/auth/auth.module";
import {NbTokenLocalStorage} from "../sharebook-nebular/auth/services/token/token-storage";
import {NB_AUTH_TOKEN_INTERCEPTOR_FILTER} from "../sharebook-nebular/auth/auth.options";
import {NbAuthJWTInterceptor} from "../sharebook-nebular/auth/services/interceptors/jwt-interceptor";
import {ModeratorGuard} from "./moderator.guard";

const GUARDS = [AuthGuard, AdminGuard, ModeratorGuard];
const PIPES = [AuthPipe];
const COMPONENTS = [
  NgxLoginComponent,
  NgxAuthComponent,
  NgxLogoutComponent,
  NgxRegisterComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
  NgxAuthBlockComponent,
];

const NB_MODULES = [
  NbIconModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/auth/login', '/auth/sign-up', '/auth/request-pass', '/auth/refresh-token']
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [...PIPES, ...COMPONENTS],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    ...NB_MODULES,
    NbAuthModule.forRoot(authOptions),
  ],
  exports: [...PIPES, NgxResetPasswordComponent],
  providers: [
    NbSecurityModule.forRoot({
      accessControl: authSettings,
    }).providers,
    {
      provide: NbRoleProvider, useClass: RoleProvider,
    },
    {
      provide: NbTokenLocalStorage, useClass: NbTokenLocalStorage,
    },
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...GUARDS],
    };
  }
}
