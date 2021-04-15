import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagramaGameComponent } from './anagrama-game/anagrama-game.component';
import { AnagramaRecordsComponent } from './anagrama-records/anagrama-records.component';

const routes: Routes = [
  { path: '', component: AnagramaGameComponent },
  { path: 'play', component: AnagramaGameComponent },
  { path: 'records', component: AnagramaRecordsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnagramaRoutingModule { }
