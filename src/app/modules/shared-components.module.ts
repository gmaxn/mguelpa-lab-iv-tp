import { NgModule } from '@angular/core';
import { PromptComponent } from '../components/shared/prompt/prompt.component';



@NgModule({
  declarations: [
    PromptComponent
  ],
  exports: [
    PromptComponent
  ]
})
export class SharedComponentsModule { }
