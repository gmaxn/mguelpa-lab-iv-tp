import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RockPaperScissorRoutingModule } from './rock-paper-scissor-routing.module';
import { RockPaperScissorGameComponent } from './rock-paper-scissor-game/rock-paper-scissor-game.component';
import { PptTimerComponent } from './rock-paper-scissor-game/ppt-timer.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';


@NgModule({
  declarations: [ 
    RockPaperScissorGameComponent,
    PptTimerComponent
  ],
  imports: [
    CommonModule,
    RockPaperScissorRoutingModule,
    SharedComponentsModule
  ]
})
export class RockPaperScissorModule { }
