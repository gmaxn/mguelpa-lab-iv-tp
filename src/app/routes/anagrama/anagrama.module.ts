import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnagramaRoutingModule } from './anagrama-routing.module';
import { AnagramaBoardComponent } from 'src/app/components/anagrama/anagrama-board/anagrama-board.component';
import { AnagramaTimerComponent } from 'src/app/components/anagrama/anagrama-board/anagrama-timer.component';
import { AnagramaHelpComponent } from 'src/app/components/anagrama/anagrama-board/anagrama-help.component';
import { AnagramaRecordsComponent } from './anagrama-records/anagrama-records.component';
import { FormsModule } from '@angular/forms';
import { AnagramaGameComponent } from './anagrama-game/anagrama-game.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';


@NgModule({
  declarations: [
    AnagramaBoardComponent,
    AnagramaTimerComponent,
    AnagramaHelpComponent,
    AnagramaRecordsComponent,
    AnagramaGameComponent
  ],
  imports: [
    CommonModule,
    AnagramaRoutingModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class AnagramaModule { }
