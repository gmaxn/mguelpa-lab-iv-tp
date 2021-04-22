import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptComponent } from '../components/shared/prompt/prompt.component';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ PromptComponent ],
  exports:      [ PromptComponent ]
 })
export class SharedComponentsModule { }
