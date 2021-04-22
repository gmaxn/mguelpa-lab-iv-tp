import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  public username = "mguelpa@gmail.com"

  public displayChat = false;

  public message = '';

  history:Message[];


  constructor(private chat: ChatService) { }
  

  ngOnInit(): void {

    this.username = JSON.parse(localStorage.getItem('userCredentials')!).username;

    this.chat.getChat().subscribe(response => {
      this.history = response.sort((a, b) => +a.date - +b.date);
      console.log(this.history);
    })

    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }
  
  onDisplayChat() {
    this.displayChat = !this.displayChat;
  }

  onSendMessage() {
    if(this.message !== null && this.message !== ''){
      this.chat.addRecord(this.username, this.message);
      this.message = '';
    }
  }

}
