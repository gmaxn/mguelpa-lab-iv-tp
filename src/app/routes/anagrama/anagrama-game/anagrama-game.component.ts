import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { messageSlideAnimation, promptSlideAnimation } from 'src/app/modules/app-animations.module';

@Component({
  selector: 'app-anagrama-game',
  animations: [
    promptSlideAnimation,
    messageSlideAnimation
  ],
  templateUrl: './anagrama-game.component.html',
  styleUrls: ['./anagrama-game.component.css']
})
export class AnagramaGameComponent  implements OnInit, AfterViewInit {
  public prompt:any;
  public message:string = '';
  
  constructor(private cd: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit() { }

  onMessage(message:string) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 500);
  }

  onPrompt(e:Event) {
    console.log(e);
    this.prompt = e;
  }
}
