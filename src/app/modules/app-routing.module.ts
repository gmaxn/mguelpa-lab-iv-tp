import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from '../routes/about-me/about-me.component';
import { AboutProjectComponent } from '../routes/about-project/about-project.component';
import { ChatComponent } from '../components/shared/chat/chat.component';
import { DeniedComponent } from '../routes/denied/denied.component';
import { HomeComponent } from '../routes/home/home.component';
import { NotFoundComponent } from '../routes/not-found/not-found.component';
import { SigninComponent } from '../routes/signin/signin.component';
import { AdminGuardService } from '../services/user/admin-guard.service';
import { UserGuardService } from '../services/user/user-guard.service';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'chat', component: ChatComponent, canActivate: [UserGuardService] },
    { path: 'denied', component: DeniedComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'about-the-project', component: AboutProjectComponent, canActivate: [AdminGuardService] },
    { path: '', component: HomeComponent },
    { 
      path: 'anagrama', 
      canLoad: [UserGuardService],
      loadChildren: () => import('../routes/anagrama/anagrama.module').then(m => m.AnagramaModule) 
    },
    { 
      path: 'rps', 
      canLoad: [UserGuardService], 
      loadChildren: () => import('../routes/rock-paper-scissor/rock-paper-scissor.module').then(m => m.RockPaperScissorModule) 
    },
    { 
      path: 'memo', 
      loadChildren: () => import('../routes/memo/memo.module').then(m => m.MemoModule) 
    },
    { 
      path: 'tic-tac-toe', 
      loadChildren: () => import('../routes/tic-tac-toe/tic-tac-toe.module').then(m => m.TicTacToeModule) 
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
