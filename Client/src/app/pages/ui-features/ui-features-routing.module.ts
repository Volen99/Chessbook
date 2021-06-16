import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UiFeaturesComponent} from './ui-features.component';
import {TypographyComponent} from './typography/typography.component';

const routes: Routes = [{
  path: '',
  component: UiFeaturesComponent,
  children: [
    {
      path: 'typography',
      component: TypographyComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiFeaturesRoutingModule {
}
