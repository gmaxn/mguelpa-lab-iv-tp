import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './routes/about-me/about-me.component';
import { DeniedComponent } from './routes/denied/denied.component';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { SigninComponent } from './routes/signin/signin.component';
import { UserGuardService } from './services/user/user-guard.service';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'denied', component: DeniedComponent },
    { path: 'about-me', component: AboutMeComponent, canActivate: [UserGuardService] },
    { path: '', component: HomeComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
