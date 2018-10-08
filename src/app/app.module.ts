
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

import { InitAuthGuard } from './guards/init-auth.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { RequireAnonGuard } from './guards/require-anon.guard';




const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [InitAuthGuard] },
  { path: 'create',  component: CreatePageComponent, canActivate: [ RequireUserGuard] },
  { path: 'list', component: ListPageComponent, canActivate: [ InitAuthGuard] },
  { path: 'detail/:id', component: DetailPageComponent, canActivate: [ InitAuthGuard] },
  { path: 'login',  component: LoginPageComponent, canActivate: [ RequireAnonGuard] },
  { path: 'signup',  component: SignupPageComponent, canActivate: [ RequireAnonGuard] },
  { path: '**', component: NotFoundPageComponent, canActivate: [ InitAuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreatePageComponent,
    ListPageComponent,
    DetailPageComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
