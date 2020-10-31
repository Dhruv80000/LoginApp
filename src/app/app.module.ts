import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserregComponent } from './userreg/userreg.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth-token.service';
import { AuthIntercepterService } from './auth-intercepter.service';
import { UserdataComponent } from './userdata/userdata.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EdituserComponent } from './edituser/edituser.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
 
@NgModule({
  declarations: [
    AppComponent,
    UserregComponent,
    UserloginComponent,
    UserdataComponent,
    UserProfileComponent,
    EdituserComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, AuthService, AuthTokenService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepterService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
