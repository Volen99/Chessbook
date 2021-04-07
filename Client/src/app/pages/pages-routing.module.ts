// import {RouterModule, Routes} from '@angular/router';
// import {NgModule} from '@angular/core';
//
// import {PagesComponent} from './pages.component';
// import {UiFeaturesComponent} from "./ui-features/ui-features.component";
// import {EmptyComponent} from "../empty.component";
// // import { DashboardComponent } from './dashboard/dashboard.component';
// // import { ECommerceComponent } from './e-commerce/e-commerce.component';
// // import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
//
// const routes: Routes = [{
//   path: '',
//   component: PagesComponent,
//   children: [
//     {
//       path: 'dashboard',
//       component: UiFeaturesComponent,
//     },
//     {
//       path: 'iot-dashboard',
//       component: UiFeaturesComponent,
//     },
//     {
//       path: 'home',
//       // canActivate: [AuthGuard],
//       loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
//     },
//     // {
//     //   path: 'users',
//     //   loadChildren: () => import('./users/users.module')
//     //     .then(m => m.UsersModule),
//     // },
//     // {
//     //   path: 'layout',
//     //   loadChildren: () => import('./layout/layout.module')
//     //     .then(m => m.LayoutModule),
//     // },
//     // {
//     //   path: 'forms',
//     //   loadChildren: () => import('./forms/forms.module')
//     //     .then(m => m.FormsModule),
//     // },
//     {
//       path: 'ui-features',
//       loadChildren: () => import('./ui-features/ui-features.module')
//         .then(m => m.UiFeaturesModule),
//     },
//     // {
//     //   path: 'modal-overlays',
//     //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
//     //     .then(m => m.ModalOverlaysModule),
//     // },
//     // {
//     //   path: 'extra-components',
//     //   loadChildren: () => import('./extra-components/extra-components.module')
//     //     .then(m => m.ExtraComponentsModule),
//     // },
//     // {
//     //   path: 'maps',
//     //   loadChildren: () => import('./maps/maps.module')
//     //     .then(m => m.MapsModule),
//     // },
//     // {
//     //   path: 'charts',
//     //   loadChildren: () => import('./charts/charts.module')
//     //     .then(m => m.ChartsModule),
//     // },
//     // {
//     //   path: 'editors',
//     //   loadChildren: () => import('./editors/editors.module')
//     //     .then(m => m.EditorsModule),
//     // },
//     // {
//     //   path: 'tables',
//     //   loadChildren: () => import('./tables/tables.module')
//     //     .then(m => m.TablesModule),
//     // },
//     // {
//     //   path: 'miscellaneous',
//     //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
//     //     .then(m => m.MiscellaneousModule),
//     // },
//     // {
//     //   path: '',
//     //   redirectTo: 'dashboard',
//     //   pathMatch: 'full',
//     // },
//     // {
//     //   path: '**',
//     //   component: EmptyComponent, // NotFoundComponent,
//     // },
//   ],
// }];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class PagesRoutingModule {
// }
