import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoGameComponent } from './memo-game/memo-game.component';
import { MemotestRecordsComponent } from './memotest-records/memotest-records.component';

const routes: Routes = [
  { path: '', component: MemoGameComponent },
  { path: 'play', component: MemoGameComponent },
  { path: 'records', component: MemotestRecordsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemoRoutingModule { }
