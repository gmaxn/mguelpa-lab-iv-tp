import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemotestRoutingModule } from './memotest-routing.module';
import { MemotestGameComponent } from './memotest-game/memotest-game.component';
import { SharedComponentsModule } from 'src/app/modules/shared-components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MemotestGameComponent,
    
  ],
  imports: [
    CommonModule,
    MemotestRoutingModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class MemotestModule { }
