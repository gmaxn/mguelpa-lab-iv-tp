import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username:string

  messages:Message[];

  text:string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    let credentials = JSON.parse(localStorage.getItem('userCredentials')!);

    this.username = credentials.username;

    console.log(this.username);

    this.chat.getChat().subscribe(response => {
      this.messages = response.sort((a, b) => +a.date - +b.date);
      console.log(this.messages);
    })
  }

  onSubmit() {

    if(this.text !== null && this.text !== ''){
      this.chat.addRecord(this.username, this.text);
    }

  }

}
