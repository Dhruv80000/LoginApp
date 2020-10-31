import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserregComponent } from './userreg/userreg.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserdataComponent } from './userdata/userdata.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ActiveGuard } from './active.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'register', component: UserregComponent },
  { path: 'login', component: UserloginComponent },
  { path: 'userdata', component: UserdataComponent, canActivate: [ActiveGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [ActiveGuard] },
  { path: 'edit/:id', component: EdituserComponent, canActivate: [ActiveGuard]},
  { path: 'Notfound', component: PageNotFoundComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'Notfound', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
