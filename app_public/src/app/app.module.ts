import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import {ApiInterceptor} from './shared/interceptors/api.interceptor';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    UsersService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
