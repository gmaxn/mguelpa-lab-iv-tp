import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from '../routes/about-me/about-me.component';
import { AboutProjectComponent } from '../routes/about-project/about-project.component';
import { AnagramaComponent } from '../routes/anagrama/anagrama.component';
import { DeniedComponent } from '../routes/denied/denied.component';
import { HomeComponent } from '../routes/home/home.component';
import { NotFoundComponent } from '../routes/not-found/not-found.component';
import { SigninComponent } from '../routes/signin/signin.component';
import { AdminGuardService } from '../services/user/admin-guard.service';
import { UserGuardService } from '../services/user/user-guard.service';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'denied', component: DeniedComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'about-the-project', component: AboutProjectComponent, canActivate: [AdminGuardService] },
    { path: 'anagrama', component: AnagramaComponent, canActivate: [UserGuardService] },

    { path: '', component: HomeComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
