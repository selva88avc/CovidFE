import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { MenuComponent } from './menu/menu.component';
import { CovidComponent } from './covid/covid.component';
import { authenticationGuard } from './authentication.guard';
import { BookmarkComponent } from './bookmark/bookmark.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  {
    path: 'menu', component: MenuComponent,canActivate:[authenticationGuard],
    children: [
       { path: 'covid', component: CovidComponent,canActivate:[authenticationGuard]},
       { path: 'home', component: HomeComponent,canActivate:[authenticationGuard]},
       { path: 'bookmark',component:BookmarkComponent,canActivate:[authenticationGuard]}
    ]
  },
  { path: '**', redirectTo: 'menu/covid' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
