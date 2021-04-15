import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-rps',
  templateUrl: './prompt-rps.component.html',
  styleUrls: ['./prompt-rps.component.css']
})
export class PromptRpsComponent implements OnInit {

  @Input() title = "You win!";
  @Input() message = "Congratulations you have earned 5 points";
  @Input() prompt:any;

  public ok = true;
  public cancel = false;

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelection(event:Event) {
    const value = (<HTMLButtonElement>event.target)?.value;
    this.response.emit({
      show:false,
      title:this.prompt.title,
      message:this.prompt.message,
      buttons:this.prompt.buttons,
    });
  }
}
