import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoRoutingModule } from './memo-routing.module';
import { MemoGameComponent } from './memo-game/memo-game.component';
import { MemotestBoardComponent } from 'src/app/components/memotest/memotest-board/memotest-board.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { MemotestRecordsComponent } from './memotest-records/memotest-records.component';


@NgModule({
  declarations: [
    MemoGameComponent,
    MemotestBoardComponent,
    MemotestRecordsComponent
  ],
  imports: [
    CommonModule,
    MemoRoutingModule,
    SharedComponentsModule
  ]
})
export class MemoModule { }
