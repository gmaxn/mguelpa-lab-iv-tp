import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RockPaperScissorRoutingModule } from './rock-paper-scissor-routing.module';
import { RockPaperScissorGameComponent } from './rock-paper-scissor-game/rock-paper-scissor-game.component';
import { PptTimerComponent } from './rock-paper-scissor-game/ppt-timer.component';
import { PromptRpsComponent } from 'src/app/components/prompt-rps/prompt-rps.component';


@NgModule({
  declarations: [ 
    RockPaperScissorGameComponent,
    PptTimerComponent,
    PromptRpsComponent
  ],
  imports: [
    CommonModule,
    RockPaperScissorRoutingModule,
  ]
})
export class RockPaperScissorModule { }
