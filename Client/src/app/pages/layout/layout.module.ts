import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { InfiniteListComponent } from './infinite-list/infinite-list.component';
import { NewsPostComponent } from './infinite-list/news-post/news-post.component';
import { NewsPostPlaceholderComponent } from './infinite-list/news-post-placeholder/news-post-placeholder.component';
import { NewsService } from './news.service';
import {NbTabsetModule} from "../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbRouteTabsetModule} from "../../sharebook-nebular/theme/components/route-tabset/route-tabset.module";
import {NbStepperModule} from "../../sharebook-nebular/theme/components/stepper/stepper.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";
import {NbAccordionModule} from "../../sharebook-nebular/theme/components/accordion/accordion.module";
import {NbUserModule} from "../../sharebook-nebular/theme/components/user/user.module";
import {ThemeModule} from "../../theme/theme.module";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    LayoutRoutingModule,
  ],
  declarations: [
    LayoutComponent,
    NewsPostPlaceholderComponent,
    InfiniteListComponent,
    NewsPostComponent,
  ],
  providers: [
    NewsService,
  ],
})
export class LayoutModule { }
