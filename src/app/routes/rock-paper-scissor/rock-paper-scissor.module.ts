import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RockPaperScissorRoutingModule } from './rock-paper-scissor-routing.module';
import { RockPaperScissorGameComponent } from './rock-paper-scissor-game/rock-paper-scissor-game.component';
import { PptTimerComponent } from './rock-paper-scissor-game/ppt-timer.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { RockPaperScissorRecordsComponent } from './rock-paper-scissor-records/rock-paper-scissor-records.component';


@NgModule({
  declarations: [ 
    RockPaperScissorGameComponent,
    PptTimerComponent,
    RockPaperScissorRecordsComponent
  ],
  imports: [
    CommonModule,
    RockPaperScissorRoutingModule,
    SharedComponentsModule
  ]
})
export class RockPaperScissorModule { }
