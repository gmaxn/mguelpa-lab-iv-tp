import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './components/shared/top-nav/top-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { DeniedComponent } from './routes/denied/denied.component';
import { SigninComponent } from './routes/signin/signin.component';
import { SigninFormComponent } from './components/signin/signin-form/signin-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { SideNavComponent } from './components/shared/side-nav/side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutMeComponent } from './routes/about-me/about-me.component';
import { AboutProjectComponent } from './routes/about-project/about-project.component';
import { CarousellComponent } from './components/home/carousell/carousell.component';
import { ChatComponent } from './components/shared/chat/chat.component';
import { SharedComponentsModule } from './modules/shared-components.module';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    NotFoundComponent,
    DeniedComponent,
    SigninComponent,
    SigninFormComponent,
    SpinnerComponent,
    SideNavComponent,
    AboutMeComponent,
    AboutProjectComponent,
    CarousellComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
