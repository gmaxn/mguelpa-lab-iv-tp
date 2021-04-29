import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { messageSlideAnimation, promptSlideAnimation } from 'src/app/modules/app-animations.module';

@Component({
  selector: 'app-memo-game',
  animations: [
    promptSlideAnimation,
    messageSlideAnimation
  ],
  templateUrl: './memo-game.component.html',
  styleUrls: ['./memo-game.component.css']
})
export class MemoGameComponent implements OnInit, AfterViewInit {

  public prompt:any;

  constructor(private cd: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit() { }

  onPrompt(e:Event) {
    this.prompt = e;
  }

}
