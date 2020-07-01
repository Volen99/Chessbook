import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetFromGithubComponent } from './study/get-from-github/get-from-github.component';
import { ImageUploadComponent } from './study/image-upload/image-upload/image-upload.component';

// NgModuleS help organize an application into cohesive blocks of functionality.
// The @NgModule tells Angular how to compile and launch the app
@NgModule({
  declarations: [ // Only declarables – (components, directives and pipes)
    AppComponent,
    GetFromGithubComponent,
    ImageUploadComponent,
  ],
  imports: [     // Only @NgModule classes – integrated (HttpClientModule, BrowserModule) or custom made
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthenticationModule,
    FormsModule,
  ],
  providers: [], // Register service providers and inject them into components
  bootstrap: [AppComponent]
})
export class AppModule { }
