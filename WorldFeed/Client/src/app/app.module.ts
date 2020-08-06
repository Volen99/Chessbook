import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './core/shared-core/shared.module';
import {HistoryModule} from './components/history/history.module';
import {CreateCourseComponent} from './components/courses/create-course/create-course.component';
import {ListCoursesComponent} from './components/courses/list-courses/list-courses.component';
import {AuthenticationModule} from './components/authentication/authentication.module';
import {KidsModule} from './components/kids/kids.module';
import {ScienceModule} from './components/science/science.module';

// NgModuleS help organize an application into cohesive blocks of functionality.
// The @NgModule tells Angular how to compile and launch the app
@NgModule({
  declarations: [ // Only declarables – (components, directives and pipes)
    AppComponent,
    CreateCourseComponent,
    ListCoursesComponent, // :D
  ],
  imports: [     // Only @NgModule classes – integrated (HttpClientModule, BrowserModule) or custom made
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthenticationModule,
    HistoryModule,
    ScienceModule,
    KidsModule,
  ],
  providers: [], // Register service providers and inject them into components
  bootstrap: [AppComponent]
})
export class AppModule {
}
